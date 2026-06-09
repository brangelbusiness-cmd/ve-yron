import type { VercelRequest, VercelResponse } from "@vercel/node";

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const CASHFREE_BASE_URL = "https://api.cashfree.com/pg";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    orderId,
    amount,
    customerName,
    customerEmail,
    customerPhone,
    returnUrl,
  } = req.body;

  if (!orderId || !amount || !customerPhone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: `cust_${customerPhone}`,
          customer_name: customerName,
          customer_email: customerEmail || "customer@veyron.in",
          customer_phone: customerPhone,
        },
        order_meta: {
          return_url: returnUrl,
          notify_url: "https://veyron.in/api/cashfree-webhook",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[Cashfree] Order creation failed:", data);
      return res.status(500).json({ error: data.message || "Payment session creation failed" });
    }

    return res.status(200).json({
      paymentSessionId: data.payment_session_id,
      orderId: data.order_id,
    });
  } catch (err) {
    console.error("[Cashfree] Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
