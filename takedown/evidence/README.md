# Evidence Pack

## `shopify-publication-dates.csv`

**Kya hai:** Dev Aastha ke saare 75 active products, unki **pehli publication date**
ke saath (Shopify Admin API se, `createdAt` field), oldest se newest.

**Columns:**

| Column | Kya batata hai |
|---|---|
| `first_published_utc` | Product humne kab publish kiya — **ye sabse important column hai** |
| `product_title` | Hamara original title |
| `original_url_devaastha` | Hamara original page |
| `original_image_url` | Hamari original image ka CDN URL |
| `shopify_product_id` | Shopify ka internal ID |

**Source:** Shopify Admin API, `products` query, pulled 2026-09-29.
**Range:** `2025-11-27` se `2026-08-17` tak. Total 75 products.

---

## Ye kis kaam aata hai

Copyright infringement prove karne ke liye do cheezein chahiye:
1. Kaam hamara original hai
2. **Hamne pehle publish kiya** ← ye file wahi karti hai

Har notice mein `[EARLIEST PUBLICATION DATE]` placeholder hai. Wahan
**27 November 2025** likhein — aur ye CSV attach karein.

Agar vashome.shop ka domain iske baad register hua hai (whois se check karein),
to timeline khud hi case bana deti hai: hamara catalog pehle se live tha,
unki site baad mein aayi.

---

## Ab bhi jo chahiye

Ye file sirf **hamari taraf ka** proof hai. Complete case ke liye uska doosra
aadha hissa bhi chahiye — unki site ka proof:

- [ ] Har infringing URL ka screenshot (URL bar + date dikhta hua)
- [ ] `web.archive.org/save/` par archive
- [ ] Side-by-side comparison: hamara vs unka

Jab tak ye nahi hota, notices bheje nahi ja sakte — unme sworn statements hain.

---

## Ek baat jo check karni chahiye

Agar wo **hamari hi image files** serve kar rahe hain (yaani unka `<img src>`
seedha `cdn.shopify.com/s/files/1/0702/1789/2058/...` par point karta hai),
to ye open-and-shut case hai — aur do extra cheezein milti hain:

1. **Server logs** — Shopify CDN par unke site se aane wale requests ka record
2. **Turant asar** — us case mein hum images ko replace ya block kar sakte hain

Check karne ka tareeka: unke site par product image par right-click →
"Copy image address" → dekhen kaunsa domain hai.
