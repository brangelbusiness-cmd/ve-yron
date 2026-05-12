import Types "../types";
import Text "mo:core/Text";

module {

  // -----------------------------------------------------------------------
  // VE YRON product catalog — Trackpants & Shorts ONLY
  // 5 Trackpants + 4 Shorts = 9 products across 4 collections
  // Prices in INR, luxury tier. Images via Unsplash.
  // -----------------------------------------------------------------------

  func catalog() : [Types.Product] {
    [

      // ============================================================
      // TRACKPANTS (5 products)
      // ============================================================

      {
        id = "gid://shopify/Product/2001";
        handle = "obsidian-trackpant";
        title = "Obsidian Trackpant";
        description = "Engineered from Japanese double-knit performance fabric with a streamlined silhouette and tapered ankle. Features a deep welt pocket, hidden zip pocket at the hip, and a signature VE YRON jacquard waistband. The essential luxury trackpant.";
        collections = ["new-arrivals", "bestsellers", "essentials"];
        tags = ["trackpants", "performance", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=90";
          altText = "VE YRON Obsidian Trackpant in Black"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=90"; altText = "VE YRON Obsidian Trackpant Black — front" },
          { url = "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=90"; altText = "VE YRON Obsidian Trackpant — detail waistband" },
          { url = "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=90"; altText = "VE YRON Obsidian Trackpant Charcoal Grey — front" },
        ];
        variants = [
          { id = "var-2001-xs-blk"; title = "XS / Black";         size = "XS"; color = "Black";         price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-s-blk";  title = "S / Black";          size = "S";  color = "Black";         price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-m-blk";  title = "M / Black";          size = "M";  color = "Black";         price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-l-blk";  title = "L / Black";          size = "L";  color = "Black";         price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-xl-blk"; title = "XL / Black";         size = "XL"; color = "Black";         price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-xs-cgr"; title = "XS / Charcoal Grey"; size = "XS"; color = "Charcoal Grey"; price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-s-cgr";  title = "S / Charcoal Grey";  size = "S";  color = "Charcoal Grey"; price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-m-cgr";  title = "M / Charcoal Grey";  size = "M";  color = "Charcoal Grey"; price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2001-l-cgr";  title = "L / Charcoal Grey";  size = "L";  color = "Charcoal Grey"; price = { amount = "8500.00";  currencyCode = "INR" }; availableForSale = false },
        ];
      },

      {
        id = "gid://shopify/Product/2002";
        handle = "midnight-navy-trackpant";
        title = "Midnight Navy Trackpant";
        description = "Cut from a premium scuba-knit blend with four-way stretch and moisture management. The relaxed-tapered fit and tonal piping deliver effortless off-court luxury. Elastic cuffs with a signature VE YRON rubber badge.";
        collections = ["new-arrivals", "essentials"];
        tags = ["trackpants", "scuba-knit", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90";
          altText = "VE YRON Midnight Navy Trackpant"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90"; altText = "VE YRON Midnight Navy Trackpant — front" },
          { url = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=90"; altText = "VE YRON Midnight Navy Trackpant — side" },
        ];
        variants = [
          { id = "var-2002-xs-mdn"; title = "XS / Midnight Navy"; size = "XS"; color = "Midnight Navy"; price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-s-mdn";  title = "S / Midnight Navy";  size = "S";  color = "Midnight Navy"; price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-m-mdn";  title = "M / Midnight Navy";  size = "M";  color = "Midnight Navy"; price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-l-mdn";  title = "L / Midnight Navy";  size = "L";  color = "Midnight Navy"; price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-xl-mdn"; title = "XL / Midnight Navy"; size = "XL"; color = "Midnight Navy"; price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-xxl-mdn";title = "XXL / Midnight Navy";size = "XXL";color = "Midnight Navy"; price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-s-obs";  title = "S / Obsidian";       size = "S";  color = "Obsidian";      price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-2002-m-obs";  title = "M / Obsidian";       size = "M";  color = "Obsidian";      price = { amount = "9800.00";  currencyCode = "INR" }; availableForSale = false },
        ];
      },

      {
        id = "gid://shopify/Product/2003";
        handle = "aurum-track-pant-limited";
        title = "Aurum Trackpant — Édition Limitée";
        description = "Woven from Italian technical satin with a subtle sheen and VE YRON signature jacquard throughout. The Aurum Trackpant is a collector's piece — only 75 units produced globally. Finished with 18k gold-plated hardware on the drawcord tips and zip pullers.";
        collections = ["limited-edition", "new-arrivals"];
        tags = ["trackpants", "limited", "luxury", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=90";
          altText = "VE YRON Aurum Trackpant — Édition Limitée in Midnight"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=90"; altText = "VE YRON Aurum Trackpant Midnight" },
          { url = "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=90"; altText = "VE YRON Aurum Trackpant Ivory" },
          { url = "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=90"; altText = "VE YRON Aurum Trackpant — hardware detail" },
        ];
        variants = [
          { id = "var-2003-s-mid";  title = "S / Midnight";  size = "S";  color = "Midnight"; price = { amount = "42000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2003-m-mid";  title = "M / Midnight";  size = "M";  color = "Midnight"; price = { amount = "42000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2003-l-mid";  title = "L / Midnight";  size = "L";  color = "Midnight"; price = { amount = "42000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2003-xl-mid"; title = "XL / Midnight"; size = "XL"; color = "Midnight"; price = { amount = "42000.00"; currencyCode = "INR" }; availableForSale = false },
          { id = "var-2003-s-ivo";  title = "S / Ivory";     size = "S";  color = "Ivory";    price = { amount = "42000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2003-m-ivo";  title = "M / Ivory";     size = "M";  color = "Ivory";    price = { amount = "42000.00"; currencyCode = "INR" }; availableForSale = true },
        ];
      },

      {
        id = "gid://shopify/Product/2004";
        handle = "stone-jogger-trackpant";
        title = "Stone Jogger Trackpant";
        description = "Our most relaxed silhouette — a premium French terry jogger with a garment-dyed stone finish. Ribbed cuffs, a double-cord adjustable waist, and cargo side pocket detailing. Understated luxury, perfected.";
        collections = ["bestsellers", "essentials"];
        tags = ["trackpants", "jogger", "french-terry", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1607522370275-f6fd0bbbba7d?w=800&q=90";
          altText = "VE YRON Stone Jogger Trackpant"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1607522370275-f6fd0bbbba7d?w=800&q=90"; altText = "VE YRON Stone Jogger Trackpant — front" },
          { url = "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=90"; altText = "VE YRON Stone Jogger Trackpant Black" },
        ];
        variants = [
          { id = "var-2004-xs-sto"; title = "XS / Stone";         size = "XS"; color = "Stone";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-s-sto";  title = "S / Stone";          size = "S";  color = "Stone";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-m-sto";  title = "M / Stone";          size = "M";  color = "Stone";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-l-sto";  title = "L / Stone";          size = "L";  color = "Stone";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-xl-sto"; title = "XL / Stone";         size = "XL"; color = "Stone";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-s-blk";  title = "S / Black";          size = "S";  color = "Black";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-m-blk";  title = "M / Black";          size = "M";  color = "Black";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2004-l-blk";  title = "L / Black";          size = "L";  color = "Black";         price = { amount = "12500.00"; currencyCode = "INR" }; availableForSale = false },
        ];
      },

      {
        id = "gid://shopify/Product/2005";
        handle = "carbon-tech-trackpant";
        title = "Carbon Tech Trackpant";
        description = "Constructed from a proprietary carbon-infused technical knit — featherlight at 180gsm yet dimensionally stable. Laser-cut ventilation channels along the inner leg and articulated knee panelling for unrestricted movement. Our most technical silhouette.";
        collections = ["new-arrivals", "bestsellers"];
        tags = ["trackpants", "technical", "carbon", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90";
          altText = "VE YRON Carbon Tech Trackpant in Obsidian"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90"; altText = "VE YRON Carbon Tech Trackpant Obsidian" },
          { url = "https://images.unsplash.com/photo-1625134673337-519d4d10b313?w=800&q=90"; altText = "VE YRON Carbon Tech Trackpant Charcoal Grey — side" },
          { url = "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=90"; altText = "VE YRON Carbon Tech Trackpant — ventilation detail" },
        ];
        variants = [
          { id = "var-2005-xs-obs"; title = "XS / Obsidian";      size = "XS"; color = "Obsidian";      price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2005-s-obs";  title = "S / Obsidian";       size = "S";  color = "Obsidian";      price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2005-m-obs";  title = "M / Obsidian";       size = "M";  color = "Obsidian";      price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2005-l-obs";  title = "L / Obsidian";       size = "L";  color = "Obsidian";      price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2005-xl-obs"; title = "XL / Obsidian";      size = "XL"; color = "Obsidian";      price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2005-s-cgr";  title = "S / Charcoal Grey";  size = "S";  color = "Charcoal Grey"; price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-2005-m-cgr";  title = "M / Charcoal Grey";  size = "M";  color = "Charcoal Grey"; price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = false },
          { id = "var-2005-l-cgr";  title = "L / Charcoal Grey";  size = "L";  color = "Charcoal Grey"; price = { amount = "28000.00"; currencyCode = "INR" }; availableForSale = true },
        ];
      },

      // ============================================================
      // SHORTS (4 products)
      // ============================================================

      {
        id = "gid://shopify/Product/3001";
        handle = "apex-training-shorts";
        title = "Apex Training Shorts";
        description = "High-performance 7-inch shorts engineered from a 4-way stretch ripstop fabric. Integrated brief liner, secure zip side pocket, and a reflective VE YRON logo at the hem. Built for the track, refined for the city.";
        collections = ["bestsellers", "essentials"];
        tags = ["shorts", "training", "performance", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=90";
          altText = "VE YRON Apex Training Shorts in Black"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=90"; altText = "VE YRON Apex Training Shorts Black" },
          { url = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90"; altText = "VE YRON Apex Training Shorts Midnight Navy" },
        ];
        variants = [
          { id = "var-3001-xs-blk"; title = "XS / Black";         size = "XS"; color = "Black";         price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-s-blk";  title = "S / Black";          size = "S";  color = "Black";         price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-m-blk";  title = "M / Black";          size = "M";  color = "Black";         price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-l-blk";  title = "L / Black";          size = "L";  color = "Black";         price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-xl-blk"; title = "XL / Black";         size = "XL"; color = "Black";         price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-s-mdn";  title = "S / Midnight Navy";  size = "S";  color = "Midnight Navy"; price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-m-mdn";  title = "M / Midnight Navy";  size = "M";  color = "Midnight Navy"; price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3001-l-mdn";  title = "L / Midnight Navy";  size = "L";  color = "Midnight Navy"; price = { amount = "5500.00";  currencyCode = "INR" }; availableForSale = false },
        ];
      },

      {
        id = "gid://shopify/Product/3002";
        handle = "riviera-leisure-shorts";
        title = "Riviera Leisure Shorts";
        description = "Woven from a premium linen-touch technical fabric, the Riviera shorts redefine leisure wear. Mid-thigh length with a relaxed silhouette, double side pockets, and an exposed VE YRON branded elastic waistband. From terrace to training.";
        collections = ["new-arrivals", "bestsellers"];
        tags = ["shorts", "leisure", "woven", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=90";
          altText = "VE YRON Riviera Leisure Shorts in Stone"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=800&q=90"; altText = "VE YRON Riviera Leisure Shorts Stone" },
          { url = "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90"; altText = "VE YRON Riviera Leisure Shorts Ivory" },
          { url = "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&q=90"; altText = "VE YRON Riviera Leisure Shorts Black" },
        ];
        variants = [
          { id = "var-3002-xs-sto"; title = "XS / Stone"; size = "XS"; color = "Stone"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-s-sto";  title = "S / Stone";  size = "S";  color = "Stone"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-m-sto";  title = "M / Stone";  size = "M";  color = "Stone"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-l-sto";  title = "L / Stone";  size = "L";  color = "Stone"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-s-ivo";  title = "S / Ivory";  size = "S";  color = "Ivory"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-m-ivo";  title = "M / Ivory";  size = "M";  color = "Ivory"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-l-ivo";  title = "L / Ivory";  size = "L";  color = "Ivory"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = false },
          { id = "var-3002-s-blk";  title = "S / Black";  size = "S";  color = "Black"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3002-m-blk";  title = "M / Black";  size = "M";  color = "Black"; price = { amount = "7500.00";  currencyCode = "INR" }; availableForSale = true },
        ];
      },

      {
        id = "gid://shopify/Product/3003";
        handle = "sovereign-5in-shorts-limited";
        title = "Sovereign 5\" Shorts — Édition Limitée";
        description = "A precision-engineered 5-inch short constructed from the same Italian technical satin used in our Aurum collection. Buttery soft with a subtle sheen, split-hem detail at the thigh, and tonal monogram embroidery at the left leg. Only 60 units produced.";
        collections = ["limited-edition", "new-arrivals"];
        tags = ["shorts", "limited", "luxury", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90";
          altText = "VE YRON Sovereign 5\" Shorts in Obsidian — Limited Edition"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90"; altText = "VE YRON Sovereign Shorts Obsidian" },
          { url = "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=90"; altText = "VE YRON Sovereign Shorts Ivory" },
        ];
        variants = [
          { id = "var-3003-xs-obs"; title = "XS / Obsidian"; size = "XS"; color = "Obsidian"; price = { amount = "22000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-3003-s-obs";  title = "S / Obsidian";  size = "S";  color = "Obsidian"; price = { amount = "22000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-3003-m-obs";  title = "M / Obsidian";  size = "M";  color = "Obsidian"; price = { amount = "22000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-3003-l-obs";  title = "L / Obsidian";  size = "L";  color = "Obsidian"; price = { amount = "22000.00"; currencyCode = "INR" }; availableForSale = false },
          { id = "var-3003-s-ivo";  title = "S / Ivory";     size = "S";  color = "Ivory";    price = { amount = "22000.00"; currencyCode = "INR" }; availableForSale = true },
          { id = "var-3003-m-ivo";  title = "M / Ivory";     size = "M";  color = "Ivory";    price = { amount = "22000.00"; currencyCode = "INR" }; availableForSale = true },
        ];
      },

      {
        id = "gid://shopify/Product/3004";
        handle = "altitude-compression-shorts";
        title = "Altitude Compression Shorts";
        description = "Graduated-compression 8-inch shorts for peak athletic performance. The Altitude features a high-rise waistband with power mesh panels, anti-odour treatment, and a rear zip pocket. Worn alone or layered — an activewear essential.";
        collections = ["essentials", "bestsellers"];
        tags = ["shorts", "compression", "performance", "unisex"];
        featuredImage = {
          url = "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=90";
          altText = "VE YRON Altitude Compression Shorts in Black"
        };
        images = [
          { url = "https://images.unsplash.com/photo-1556906781-9a412961a28c?w=800&q=90"; altText = "VE YRON Altitude Compression Shorts Black" },
          { url = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=90"; altText = "VE YRON Altitude Compression Shorts Charcoal Grey" },
        ];
        variants = [
          { id = "var-3004-xs-blk"; title = "XS / Black";         size = "XS"; color = "Black";         price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-s-blk";  title = "S / Black";          size = "S";  color = "Black";         price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-m-blk";  title = "M / Black";          size = "M";  color = "Black";         price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-l-blk";  title = "L / Black";          size = "L";  color = "Black";         price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-xl-blk"; title = "XL / Black";         size = "XL"; color = "Black";         price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-xxl-blk";title = "XXL / Black";        size = "XXL";color = "Black";         price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-s-cgr";  title = "S / Charcoal Grey";  size = "S";  color = "Charcoal Grey"; price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-m-cgr";  title = "M / Charcoal Grey";  size = "M";  color = "Charcoal Grey"; price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = true },
          { id = "var-3004-l-cgr";  title = "L / Charcoal Grey";  size = "L";  color = "Charcoal Grey"; price = { amount = "8900.00";  currencyCode = "INR" }; availableForSale = false },
        ];
      },

    ]
  };

  // -----------------------------------------------------------------------
  // Query helpers
  // -----------------------------------------------------------------------

  public func getProducts() : [Types.Product] {
    catalog()
  };

  public func getProductByHandle(handle : Text) : ?Types.Product {
    catalog().find(func(p : Types.Product) : Bool { p.handle == handle })
  };

  public func getProductsByCollection(collection : Text) : [Types.Product] {
    catalog().filter(func(p : Types.Product) : Bool {
      p.collections.find(func(c : Text) : Bool { c == collection }) != null
    })
  };

  // -----------------------------------------------------------------------
  // Checkout URL builder
  // Produces a Shopify cart permalink:
  //   https://<store>.myshopify.com/cart/<variantId>:<qty>,<variantId>:<qty>
  // The store domain is set here; swap for the real Shopify store domain.
  // -----------------------------------------------------------------------

  let shopifyStoreDomain = "veyron.myshopify.com";

  public func buildCheckoutUrl(cartItems : [Types.CartItem]) : Text {
    if (cartItems.size() == 0) { return "https://" # shopifyStoreDomain # "/cart" };

    // Build line-items segment: <variantId>:<qty>,<variantId>:<qty>,...
    // Shopify cart permalink expects numeric variant IDs; we strip the GID prefix
    // format "gid://shopify/ProductVariant/NNNN" → "NNNN"
    // For hardcoded IDs like "var-2001-xs-blk" we pass them as-is — the real
    // integration will use numeric Shopify variant IDs from the Storefront API.
    let lineItems = cartItems.map(
      func(item : Types.CartItem) : Text {
        item.variantId # ":" # item.quantity.toText()
      }
    );

    let lineItemsSegment = lineItems.values().join(",");
    "https://" # shopifyStoreDomain # "/cart/" # lineItemsSegment
  };
}
