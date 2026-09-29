# vashome.shop — IP Infringement Takedown Playbook

**Infringing site:** `https://vashome.shop`
**Rights holder:** Dev Aastha (`https://www.devaastha.com`)
**Nature of infringement:** Full site clone — design, structure, product images and
copy — plus use of a registered trademark.
**Opened:** 2026-09-29

---

## ⚠️ Pehle ye padhein

In notices mein **sworn statements** hain ("good faith belief", "under penalty of
perjury"). Bhejne se pehle har factual claim khud verify karein. Galat DMCA notice
par ulta legal liability aati hai (US mein 17 U.S.C. §512(f), India mein misuse of
process). Templates draft hain — final sign-off aapka aur aapke lawyer ka.

**Note:** Ye notices maine site dekhe bina banaye hain — is session ki network
policy ne `vashome.shop` block kiya tha. Har `[SQUARE BRACKET]` placeholder aapko
actual evidence se bharna hai. Koi claim tab tak na bhejein jab tak aapne khud
verify na kar liya ho.

---

## Step 0 — Evidence pehle, complaint baad mein

Report karte hi log page edit/delete kar dete hain. `evidence-log.md` bharein,
**phir** notices bhejein. Bina evidence ke bheji complaint reject ho jaati hai
aur dobara file karna mushkil ho jaata hai.

---

## Step 1 — Ye 3 cheezein pata karein (5 minute)

Mujhe ye nahi mil paaya kyunki lookups block the. Aap `whois` ya
`https://who.is/whois/vashome.shop` aur `https://ipinfo.io/31.222.234.210`
par ye nikaal lein:

| Cheez | Kahan se | Kis notice mein chahiye |
|---|---|---|
| **Hosting provider** (IP `31.222.234.210` kiska hai) | ipinfo.io / whois on IP | Notice 1 |
| **Domain registrar** (GoDaddy, Namecheap, Hostinger…) | whois on domain | Notice 2 |
| **Payment gateway** (checkout page par dikhega) | site ke checkout par jaayein | Notice 5 |

Payment gateway wali detail sabse valuable hai — niche Step 2 dekhein.

---

## Step 2 — Priority order (asar ke hisaab se, upar se neeche)

Ek saath sab bhejein. Ye race hai, sequence nahi — Diwali season mein har din ka
nuksaan hai.

| # | Channel | Speed | Asar | File |
|---|---|---|---|---|
| **1** | **Payment gateway** (Razorpay/Cashfree/PayU/Paytm) | 2–7 din | 🔴 **Sabse zyada** | `notices/05-payment-gateway.md` |
| 2 | Hosting provider abuse desk | 3–14 din | 🔴 Site offline ho sakti hai | `notices/01-hosting-dmca.md` |
| 3 | Domain registrar abuse | 5–30 din | 🟠 Domain suspend | `notices/02-registrar.md` |
| 4 | Google Search removal | 3–10 din | 🟠 Search se gayab | `notices/03-google-removal.md` |
| 5 | Meta (agar unke IG/FB ads ya page hain) | 1–5 din | 🟠 Ads band | `notices/04-meta-ip-report.md` |
| 6 | Cease & desist (lawyer ke letterhead par) | turant | 🟡 Aksar kaam karta hai | `notices/06-cease-and-desist.md` |
| 7 | Cybercrime portal `cybercrime.gov.in` | slow | 🟡 Record banta hai | — |

### Payment gateway sabse pehle kyun?

Site band karvane se wo doosre host par shift ho jaayenge — 24 ghante ka kaam hai.
Lekin **payment gateway band ho gaya to business hi ruk jaayega**, aur naya merchant
account lena mushkil hai (KYC, verification, aur ab unka record kharab). Indian
gateways counterfeit/IP-infringing merchants par strict hain kyunki RBI compliance
ka issue banta hai.

Checkout page par order place karne ki koshish karein — gateway ka naam dikh jaayega.

---

## Step 3 — Jo *nahi* karna

- ❌ **Domain UDRP file mat karein abhi.** UDRP tab chalta hai jab domain naam mein
  aapka trademark ho. `vashome` mein "Dev Aastha" nahi hai — is ground par case
  kamzor hai, fees waste hogi. Content ke andar trademark use alag maamla hai,
  wo upar wale channels se hi chalega.
- ❌ **Khud unse contact mat karein** C&D se pehle. Wo evidence delete kar denge.
- ❌ **Public mein call out mat karein** (social media par) jab tak takedown file
  na ho jaaye — wo alert ho jaayenge.

---

## Status tracker

| # | Channel | Bheja (date) | Reference / Ticket | Status |
|---|---|---|---|---|
| 1 | Payment gateway | | | ⬜ Pending |
| 2 | Hosting provider | | | ⬜ Pending |
| 3 | Registrar | | | ⬜ Pending |
| 4 | Google removal | | | ⬜ Pending |
| 5 | Meta IP report | | | ⬜ Pending |
| 6 | Cease & desist | | | ⬜ Pending |
