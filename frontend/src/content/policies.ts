export type PolicySection = { heading: string; body: string }

export type PolicyContent = {
  title: string
  sections: PolicySection[]
}

export const policies: Record<string, PolicyContent> = {
  faqs: {
    title: "FAQs",
    sections: [
      {
        heading: "How do I order?",
        body: "Browse the shop, add items to your cart, and complete checkout on the site. We confirm details, payment, and delivery with you on WhatsApp.",
      },
      {
        heading: "What currency do you use?",
        body: "Prices are shown in Rwandan Francs (RWF). Your WhatsApp confirmation will match the total shown at checkout.",
      },
      {
        heading: "Where are products made?",
        body: "Grece Fov Cycles formulas are developed and packaged in Rwanda, working with local coffee-growing communities.",
      },
      {
        heading: "Are your products natural?",
        body: "We upcycle coffee grounds and combine them with plant-based ingredients. Each label lists what is inside—ask us if you need full INCI detail.",
      },
      {
        heading: "Shipping and pickup",
        body: "Delivery options depend on your location in Rwanda. We will confirm timing and any delivery fee when we reply on WhatsApp.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        heading: "What we collect",
        body: "When you order or contact us, we collect your name, email, phone (if provided), shipping address, and order details. Admin sign-in uses Supabase Auth.",
      },
      {
        heading: "How we use it",
        body: "We use your information to fulfil orders, respond to enquiries, and improve our service. We do not sell your personal data.",
      },
      {
        heading: "Storage",
        body: "Order and contact data is stored in our secure database (Supabase). Messages you send on WhatsApp are handled under WhatsApp’s own privacy terms.",
      },
      {
        heading: "Your rights",
        body: "You may ask us to correct or delete contact information where we are not required to keep it for legal or order records. Email us via the contact page.",
      },
      {
        heading: "Updates",
        body: "We may update this policy as our practices change. The latest version is always available from the footer links on this site.",
      },
    ],
  },
  returns: {
    title: "Returns Policy",
    sections: [
      {
        heading: "Our approach",
        body: "We want you to love your Grece Fov care. If something arrives damaged or not as described, contact us within 7 days of delivery.",
      },
      {
        heading: "Eligible returns",
        body: "Unopened or lightly used items may be accepted at our discretion when the product is faulty or we sent the wrong item. Opened personal-care items may not be resalable—reach out and we will work with you fairly.",
      },
      {
        heading: "How to start a return",
        body: "Message us on WhatsApp or use the contact form with your order reference, photos if relevant, and the reason for the return. We will reply with next steps.",
      },
      {
        heading: "Refunds",
        body: "Approved refunds are processed to the original payment method where possible, or by mobile money or bank transfer as agreed on WhatsApp.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        heading: "Using this site",
        body: "This storefront is operated by Grece Fov Cycles. By placing an order or contacting us, you agree to these terms and our privacy policy.",
      },
      {
        heading: "Products and pricing",
        body: "Descriptions and images reflect our range as accurately as possible. Prices may change; the price at checkout applies to your order once confirmed on WhatsApp.",
      },
      {
        heading: "Orders",
        body: "Submitting checkout is a request, not a completed sale until we confirm stock, total, and delivery on WhatsApp. We may decline orders if items are unavailable.",
      },
      {
        heading: "Limitation",
        body: "Our liability is limited to the value of your order except where law requires otherwise. Use products as directed on the label; patch test if you have sensitive skin.",
      },
      {
        heading: "Contact",
        body: "Questions about these terms: use the Contact page or WhatsApp. Governing law: Rwanda.",
      },
    ],
  },
}
