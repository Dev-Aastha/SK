const {Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
       ShadingType, HeadingLevel, AlignmentType, BorderStyle, PageOrientation} = require('docx');
const fs = require('fs');

const SAFFRON = "B45309", DEEP = "7C2D12", GREY = "F5F5F4", WHITE = "FFFFFF", LINE = "D6D3D1";

// landscape letter-ish: pass portrait dims, flag landscape
const PAGE_W = 15840, PAGE_H = 12240, MARGIN = 720;
const CONTENT = 15840 - MARGIN*2; // 14400
const COLS = [520, 2000, 5200, 1900, 3100, 1680]; // = 14400

const t = (text, o={}) => new TextRun({text, font:"Calibri", size:o.size||17, bold:!!o.bold,
                                       italics:!!o.i, color:o.color||"1C1917"});
const p = (runs, o={}) => new Paragraph({children:Array.isArray(runs)?runs:[runs],
  spacing:{before:o.before??20, after:o.after??20, line:o.line??240},
  alignment:o.align, border:o.border});

function cell(paras, o={}){
  return new TableCell({
    width:{size:o.w, type:WidthType.DXA},
    shading:o.fill?{type:ShadingType.CLEAR, fill:o.fill, color:"auto"}:undefined,
    margins:{top:90, bottom:90, left:110, right:110},
    verticalAlign: o.va || "top",
    children: paras,
  });
}

// copy text -> paragraphs, blank lines become spacing
function copyParas(str){
  const out=[];
  str.split("\n").forEach(ln=>{
    if(ln.trim()===""){ out.push(new Paragraph({children:[t("")], spacing:{before:0,after:0,line:120}})); return; }
    const bold = /^🎁|^⏳|^🏆|^🚚/.test(ln.trim());
    out.push(p(t(ln, {size:17, bold}), {before:0, after:0, line:230}));
  });
  return out;
}

function bullets(arr, o={}){
  return arr.map(s=>p(t("• "+s, {size:o.size||16, color:o.color||"44403C"}), {before:0, after:30, line:220}));
}

const ROWS = JSON.parse(fs.readFileSync("copy.json","utf8"));

const hdr = new TableRow({tableHeader:true, children:[
  ["#",520],["Segment & Send",2000],["WhatsApp Message Copy",5200],["Discount",1900],["Image Suggestion",3100],["CTA Buttons",1680]
].map(([label,w])=>cell([p(t(label,{bold:true,color:WHITE,size:18}),{before:40,after:40})],{w,fill:DEEP}))});

function banner(label, note){
  return new TableRow({children:[ new TableCell({
    columnSpan: 6,
    width:{size:CONTENT, type:WidthType.DXA},
    shading:{type:ShadingType.CLEAR, fill:SAFFRON, color:"auto"},
    margins:{top:80,bottom:80,left:110,right:110},
    children:[ p([t(label,{bold:true,size:19,color:WHITE}), t("   "+note,{size:16,color:"FEF3C7"})],{before:20,after:20}) ],
  })]});
}

const rows = ROWS.map((r,i)=>{
  const fill = i%2 ? GREY : WHITE;
  return new TableRow({cantSplit:false, children:[
    cell([p(t(r.n,{bold:true,size:22,color:SAFFRON}),{align:AlignmentType.CENTER})],{w:520,fill}),
    cell([ p(t(r.grp==="YOUR COHORT" ? "YOUR COHORT" : "SUGGESTED",
                 {bold:true,size:13,color:r.grp==="YOUR COHORT" ? "166534" : "9A3412"})),
           p(t(r.seg,{bold:true,size:18}),{before:40}),
           p(t(r.size,{size:15,color:"78716C"})),
           p(t("SEND  "+r.send,{size:16,bold:true,color:SAFFRON}),{before:60}) ],{w:2000,fill}),
    cell(copyParas(r.copy),{w:5200,fill}),
    cell(bullets(r.disc,{size:15}),{w:1900,fill}),
    cell(bullets(r.img,{size:15}),{w:3100,fill}),
    cell(r.cta.map(c=>p(t("▸ "+c,{bold:true,size:16,color:DEEP}),{after:70})),{w:1680,fill}),
  ]});
});

const table = new Table({
  columnWidths: COLS,
  width:{size:CONTENT, type:WidthType.DXA},
  rows:[hdr, ...rows],
  borders:{
    top:{style:BorderStyle.SINGLE,size:6,color:LINE}, bottom:{style:BorderStyle.SINGLE,size:6,color:LINE},
    left:{style:BorderStyle.SINGLE,size:6,color:LINE}, right:{style:BorderStyle.SINGLE,size:6,color:LINE},
    insideHorizontal:{style:BorderStyle.SINGLE,size:6,color:LINE},
    insideVertical:{style:BorderStyle.SINGLE,size:6,color:LINE},
  },
});

// ---------- front matter ----------
const rule = {bottom:{style:BorderStyle.SINGLE,size:8,color:SAFFRON,space:6}};

const ladder = new Table({
  columnWidths:[2400,2400,2400,7200],
  width:{size:CONTENT,type:WidthType.DXA},
  rows:[
    new TableRow({tableHeader:true, children:[["Flat Offer",2400],["Min Cart",2400],["Effective %",2400],["Where it is used",7200]]
      .map(([l,w])=>cell([p(t(l,{bold:true,color:WHITE,size:17}))],{w,fill:DEEP}))}),
    ...[["₹151 off","₹1,499","10.1%","ATC · PDP 7–14d · HP 7–30d (first order)"],
        ["₹251 off","₹1,999","12.6%","PDP 15–30d · Dhanteras"],
        ["₹351 off","₹2,999","11.7%","Collection visitors"],
        ["₹751 off","₹5,999","12.5%","Reserve tier — high-cart upsell"],
        ["₹1,100 off","₹7,499","14.7%","Bulk / corporate only"]]
      .map((r,i)=>new TableRow({children:r.map((v,j)=>cell([p(t(v,{size:17,bold:j===0}))],{w:[2400,2400,2400,7200][j],fill:i%2?GREY:WHITE}))}))
  ],
  borders:{top:{style:BorderStyle.SINGLE,size:6,color:LINE},bottom:{style:BorderStyle.SINGLE,size:6,color:LINE},
           left:{style:BorderStyle.SINGLE,size:6,color:LINE},right:{style:BorderStyle.SINGLE,size:6,color:LINE},
           insideHorizontal:{style:BorderStyle.SINGLE,size:6,color:LINE},insideVertical:{style:BorderStyle.SINGLE,size:6,color:LINE}},
});

const doc = new Document({
  creator:"Dev Aastha", title:"WhatsApp Festive Campaign Brief 2026",
  sections:[{
    properties:{page:{size:{width:PAGE_W,height:PAGE_H,orientation:PageOrientation.LANDSCAPE},
                      margin:{top:MARGIN,bottom:MARGIN,left:MARGIN,right:MARGIN}}},
    children:[
      p(t("Dev Aastha — WhatsApp Festive Campaign Brief",{bold:true,size:36,color:DEEP}),{after:40}),
      p(t("Post–Ganesh Chaturthi → Navratri → Dhanteras → Diwali  ·  10 campaigns  ·  Prepared 24 September 2026",
          {size:18,color:"78716C"}),{after:100,border:rule}),

      p(t("Why these products",{bold:true,size:24,color:DEEP}),{before:220,after:60}),
      ...bullets([
        "Your Ganesh SKUs are about to die. Last 30 days they did ~₹1.60L (Divine Ganesha 49 orders, Throne Ganesha 38, Trishul 27). Visarjan was 25 Sep — there is no occasion behind them until next year.",
        "The block that carries to Diwali is Kamdhenu (168 orders/30d), Elephant Pair (167), Kuber Kalash (203) and the Lakshmi Ganesh Set (59). Every campaign below is built on these.",
        "Kuber Kalash ₹1,249 is the best conversion weapon in the catalogue — most orders, lowest price barrier, pure wealth symbolism. It is what cold cohorts get.",
        "Lakshmi Charan averaged ₹9,857 per order and Shubh Labh ₹3,570, against a ₹1,900 store AOV. Those are bulk gifting buyers already sitting in your base — campaign 8 goes after them.",
      ],{size:17}),

      p(t("The 26 September wall",{bold:true,size:24,color:DEEP}),{before:220,after:60}),
      ...bullets([
        "Ganesh Visarjan / Anant Chaturdashi: 25 September 2026.",
        "Pitru Paksha (Shraddh): 27 September – 10 October. Indian homes do not buy new murtis in this fortnight. Do not hard-sell.",
        "Navratri opens 11 October · Dussehra 20 October · Dhanteras 6 November · Diwali 8 November.",
        "Campaigns 1–7 must all land before midnight on 26 September, or the Shraddh urgency stops being true and the audience will know it.",
      ],{size:17}),

      p(t("The flat discount ladder",{bold:true,size:24,color:DEEP}),{before:220,after:60}),
      p(t("Flat rupee amounts in shagun denominations — for a devotional brand these read as a blessing amount, not a markdown. Every one sits behind a minimum cart, which is the point: a flat offer with a threshold lifts AOV, a percentage does not.",
          {size:17}),{after:100}),
      ladder,
      p(t("Worked example — Kuber Kalash is ₹1,249, below every tier. A buyer who wants ₹251 off must reach ₹1,999, so they add a Lakshmi Charan. At 10% off you pay ₹125 and collect ₹1,124. At flat ₹251 above ₹1,999 you pay ₹251 and collect ₹2,497. You spend ₹126 more and the order more than doubles.",
          {size:17,bold:true,color:DEEP}),{before:100}),
      p(t("Never run a flat amount without a minimum. ₹251 off an unguarded ₹1,249 Kalash is 20% — six times your normal discount rate, on your highest-volume SKU.",
          {size:17,i:true,color:"991B1B"}),{before:60}),

      p(t("The house template",{bold:true,size:24,color:DEEP}),{before:260,after:60}),
      p(t("Every copy below follows the structure of the Ganesh Chaturthi send, so the whole festive run reads as one voice:",{size:17}),{after:60}),
      ...bullets([
        "Line 1 — occasion or trigger hook, with the key phrase in WhatsApp bold.",
        "Line 2 — the product and why it matters. Significance, not features.",
        "Line 3 — the offer, then \"Use Coupon Code CODE\" on its own line.",
        "Line 4 — the hourglass scarcity line, closed with a double exclamation.",
        "Line 5 — a blessing in quotation marks, then the Dev Aastha sign-off.",
        "Two buttons: a buy action and a browse action.",
      ],{size:17}),
      p(t("Copy is written with WhatsApp bold markup (single asterisks), so it can be pasted in as-is. Creative keeps the established system — product on a wooden base, dark green backdrop, jute mat, and the maroon 999 SILVER PLATED badge top-left — except campaign 9, which deliberately breaks it.",{size:17,i:true,color:"44403C"}),{before:80}),

      p(t("The 10 campaigns",{bold:true,size:24,color:DEEP}),{before:260,after:100}),
      p(t("Campaigns 1–7 are the seven segments you shared, listed in your order. Campaigns 8–10 are additions of mine.",{size:17,bold:true,color:DEEP}),{after:40}),
      p(t("List order is not send order. The calendar is driven by the 26 September Shraddh deadline, so read the SEND time in each row — campaigns 1–7 all go out between 24 and 26 September, in the sequence given in the send plan below.",{size:17}),{after:60}),
      p(t("Variables:  {{1}} first name  ·  {{2}} product name  ·  {{3}} stock count  ·  {{4}} price",
          {size:16,color:"78716C",i:true}),{after:100}),
      table,

      p(t("Send plan — the order they actually go out",{bold:true,size:24,color:DEEP}),{before:260,after:60}),
      ...bullets([
        "24 Sep, 7:00 PM — Campaign 7 · ATC – 180 Days (2,398)",
        "25 Sep, 11:00 AM — Campaign 3 · PDP Visit 2–7 Days (4,417)",
        "25 Sep, 6:30 PM — Campaign 2 · PDP Visit 7–14 Days (4,231)",
        "26 Sep, 12:00 PM — Campaign 1 · PDP Visit 15–30 Days (6,003)",
        "26 Sep, 1:00 PM — Campaign 6 · Orders – 180 Days (2,635)",
        "26 Sep, 5:00 PM — Campaign 4 · Coll Visit – 180 Days (1,538)",
        "26 Sep, 8:00 PM — Campaign 5 · HP Visit 7–30 Days (5,975)",
        "27 Sep – 10 Oct — SHRADDH. No selling.",
        "28 Sep, 9:00 AM — Campaign 9 · all cohorts, Navratri pre-book (~27,000)",
        "12 Oct, 11:00 AM — Campaign 8 · bulk / corporate slice (~300)",
        "6 Nov, 7:00 AM — Campaign 10 · all cohorts, Dhanteras (~27,000)",
      ],{size:17}),

      p(t("Before you send",{bold:true,size:24,color:DEEP}),{before:260,after:60}),
      ...bullets([
        "Create every code in Shopify as a FIXED AMOUNT discount with a MINIMUM PURCHASE AMOUNT set — CART151, AASTHA151, LAKSHMI251, SET351, FIRST151, BULK1100, DHAN251. A fixed-amount code with no minimum is the one way this structure loses money.",
        "FIRST151: new customers only, one use per customer. DHAN251: valid 6 November only.",
        "Register templates with Meta about 24 hours ahead — utility vs marketing category changes what you pay.",
        "Stock check before sending: Standing Hanuman 5.5\" is at 0 inventory, and Balaji 6\" and 8\" variants are at 0. Exclude from all sends.",
        "Suppression order, dedupe top-down, one message per number per day: ATC → PDP 2–7d → PDP 7–14d → PDP 15–30d → Collection → Homepage. Run Orders – 180 Days as a separate track; never suppress a past buyer into a discount list.",
        "A/B test campaigns 4 and 6 (largest cohorts): lead with the price line vs. lead with the significance line.",
        "Projection across the full arc: ~459 orders, ~₹8.9L, blended discount cost ~7.1%. The number to actually watch is repeat rate — 7.6% to 15% on 2,635 past buyers is ~200 extra orders at near-zero acquisition cost. Campaigns 7 and 8 are what move it.",
      ],{size:17}),
    ],
  }],
});

Packer.toBuffer(doc).then(b=>{fs.writeFileSync("Dev-Aastha-WhatsApp-Campaign-Brief.docx",b);
  console.log("written", b.length, "bytes");});
