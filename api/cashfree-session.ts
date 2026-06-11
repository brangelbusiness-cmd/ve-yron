import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!;
const SHOPIFY_STORE = "nn713a-zp.myshopify.com";
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;

async function getShopifyToken(): Promise<string> {
  const res = await fetch("https://api.shopify.com/auth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: SHOPIFY_CLIENT_ID,
      client_secret: SHOPIFY_CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function createShopifyOrder(token: string, payload: any) {
  const mutation = `
    mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder { id name status }
        userErrors { field message }
      }
    }
  `;
  const res = await fetch(
    https://${SHOPIFY_STORE}/admin/api/2024-01/graphql.json,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${token},
      },
      body: JSON.stringify({ query: mutation, variables: { input: payload } }),
    }
  );
  return res.json();
}

function verifySignature(req: VercelRequest, rawBody: string): boolean {
  try {
    const timestamp = req.headers["x-webhook-timestamp"] as string;
    const signature = req.headers["x-webhook-signature"] as string;
    if (!timestamp || !signature) return false;
    const signedPayload = ${timestamp}${rawBody};
    const expected = crypto
      .createHmac("sha256", CASHFREE_SECRET_KEY)
      .update(signedPayload)
      .digest("base64");
    return expected === signature;
  } catch { return false; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawBody = JSON.stringify(req.body);
  verifySignature(req, rawBody);

  const { data, type } = req.body;
  if (type !== "PAYMENT_SUCCESS_WEBHOOK") return res.status(200).json({ received: true });

  const order = data?.order;
  const payment = data?.payment;
  const customer = data?.customer_details;
  if (!order || !payment) return res.status(400).json({ error: "Missing data" });

  try {
    // Get Cashfree order tags
    const cfRes = await fetch(https://api.cashfree.com/pg/orders/${order.order_id}, {
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
      },
    });
    const cfOrder = await cfRes.json();
    const tags = cfOrder.order_tags || {};

    let lineItems: any[] = [];
    try {
      if (tags.cart_items) lineItems = JSON.parse(decodeURIComponent(tags.cart_items));
    } catch { lineItems = []; }

    const nameParts = (customer?.customer_name || "Customer").trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    const address = {
      firstName, lastName,
      address1: tags.address || "",
      city: tags.city || "",
      province: tags.state || "",
      zip: tags.pincode || "",
      countryCode: "IN",
      phone: customer?.customer_phone || "",
    };

    const shopifyLineItems = lineItems.length > 0
      ? lineItems.map((item: any) => ({
          quantity: item.quantity,
          variantId: gid://shopify/ProductVariant/${item.variantId},
        }))
      : [{ quantity: 1, title: "VEYRON Product", originalUnitPrice: order.order_amount }];

    const orderPayload = {
      email: customer?.customer_email || "",
      phone: customer?.customer_phone || "",
      note: Cashfree | Order: ${order.order_id} | Txn: ${payment.cf_payment_id},
      tags: ["cashfree", "veyron-web", "paid"],
      lineItems: shopifyLineItems,
      shippingAddress: address,
      billingAddress: address,
      customAttributes: [
        { key: "cashfree_order_id", value: order.order_id },
        { key: "cashfree_payment_id", value: payment.cf_payment_id },
      ],
    };

    const token = await getShopifyToken();
    const result = await createShopifyOrder(token, orderPayload);

    if (result.errors || result.data?.draftOrderCreate?.userErrors?.length > 0) {
      console.error("[Webhook] Error:", JSON.stringify(result));
      return res.status(500).json({ error: "Order creation failed" });
    }

    const draftOrder = result.data?.draftOrderCreate?.draftOrder;
    console.log("[Webhook] Order created:", draftOrder?.name);
    return res.status(200).json({ success: true, order: draftOrder?.name });

  } catch (err) {
    console.error("[Webhook] Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
