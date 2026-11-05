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
        body: "Add products to your cart and submit your request. We’ll confirm payment and delivery through WhatsApp.",
      },
      {
        heading: "Where are products made?",
        body: "Our products are made in Gisenyi, Rwanda.",
      },
      {
        heading: "Are your products natural?",
        body: "Our range includes products developed using repurposed coffee grounds and other ingredients. See individual product descriptions for details.",
      },
      {
        heading: "Shipping and pickup",
        body: "Delivery options, timing, and costs are confirmed through WhatsApp.",
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
        body: "Order data is stored in our secure database (Supabase). Messages you send on WhatsApp or email are handled under those providers’ privacy terms.",
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
        body: "We want you to love your Grece Fav Cycles care. If something arrives damaged or not as described, contact us within 7 days of delivery.",
      },
      {
        heading: "Eligible returns",
        body: "Unopened or lightly used items may be accepted at our discretion when the product is faulty or we sent the wrong item. Opened personal-care items may not be resalable—reach out and we will work with you fairly.",
      },
      {
        heading: "How to start a return",
        body: "Message us on WhatsApp or email grecefavcycles01@gmail.com with your order details, photos if relevant, and the reason for the return. We will reply with next steps.",
      },
      {
        heading: "Refunds",
        body: "Approved refunds are processed by mobile money or bank transfer as agreed on WhatsApp after we confirm your return.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        heading: "Using this site",
        body: "This storefront is operated by Grece Fav Cycles. By placing an order request or contacting us, you agree to these terms and our privacy policy.",
      },
      {
        heading: "Products and pricing",
        body: "Descriptions and images reflect our range as accurately as possible. Prices may change; the total confirmed on WhatsApp applies to your order.",
      },
      {
        heading: "Orders",
        body: "Submitting a cart or checkout request is not a completed sale until we confirm stock, total, payment, and delivery on WhatsApp. We may decline orders if items are unavailable.",
      },
      {
        heading: "Limitation",
        body: "Our liability is limited to the value of your order except where law requires otherwise. Use products as directed; patch test if you have sensitive skin.",
      },
      {
        heading: "Contact",
        body: "Questions about these terms: use the Contact page, email grecefavcycles01@gmail.com, or WhatsApp. Governing law: Rwanda.",
      },
    ],
  },
}
