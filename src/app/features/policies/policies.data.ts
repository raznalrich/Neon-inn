export interface PolicySection { heading: string; body: string[]; }
export interface PolicyDoc { title: string; updated: string; intro: string; sections: PolicySection[]; }

const UPDATED = 'November 2026';
const CONTACT: PolicySection = {
  heading: 'Contact us',
  body: ['Questions? Message us on WhatsApp at +91 75930 16782 and we will be happy to help.'],
};

export const POLICIES: Record<string, PolicyDoc> = {
  'terms-and-conditions': {
    title: 'Terms & Conditions',
    updated: UPDATED,
    intro: 'By browsing or ordering from Neon.Inn you agree to the terms below. Please read them carefully.',
    sections: [
      { heading: 'Orders & payment', body: [
        'Orders are confirmed over WhatsApp. An order is accepted only after we confirm the design, size, price and payment with you.',
        'All prices are in Indian Rupees (₹) and may change without notice before an order is confirmed.',
      ]},
      { heading: 'Custom products', body: [
        'Neon signs are made to order. Colours shown on screens may differ slightly from the finished product because neon light varies by display and environment.',
        'You are responsible for the accuracy of text, spelling and design details you approve before production begins.',
      ]},
      { heading: 'Intellectual property', body: [
        'Designs and content on this website belong to Neon.Inn. If you supply a logo or artwork, you confirm you have the right to use it.',
      ]},
      { heading: 'Safe use', body: [
        'Use the supplied adapter and follow the installation guidance. Neon.Inn is not liable for damage caused by misuse or incorrect installation.',
      ]},
      { heading: 'Changes to these terms', body: ['We may update these terms from time to time. The latest version is always on this page.'] },
      CONTACT,
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    updated: UPDATED,
    intro: 'Your privacy matters to us. This policy explains what information we collect and how we use it.',
    sections: [
      { heading: 'Information we collect', body: [
        'We collect only what you share with us when placing an order or enquiry, such as your name, phone number, delivery address and design requirements.',
        'Our website may collect basic technical data such as browser type and pages visited.',
      ]},
      { heading: 'How we use it', body: [
        'To process and deliver your order, respond to your queries, and provide support. We do not sell your personal information.',
      ]},
      { heading: 'Sharing', body: [
        'We share details only with delivery partners and payment providers as needed to fulfil your order, or when required by law.',
      ]},
      { heading: 'WhatsApp', body: [
        'Orders and support happen over WhatsApp, which is governed by WhatsApp’s own privacy policy.',
      ]},
      { heading: 'Your rights', body: ['You can ask us to access, correct or delete your personal information at any time.'] },
      CONTACT,
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    updated: UPDATED,
    intro: 'Every sign is handcrafted for you, so our refund terms are different from ready-made products.',
    sections: [
      { heading: 'Custom orders', body: [
        'Because each sign is made to order, we cannot offer refunds or cancellations once production has started.',
        'You may cancel for a full refund before production begins.',
      ]},
      { heading: 'Damaged or defective items', body: [
        'If your sign arrives damaged or not working, contact us within 48 hours of delivery with photos or a short video. We will repair or replace it, or refund you if a replacement is not possible.',
        'We recommend recording an unboxing video to help with claims.',
      ]},
      { heading: 'Not covered', body: [
        'Minor colour variations, mistakes in details you approved, change of mind, and damage from misuse are not eligible for refund.',
      ]},
      { heading: 'Refund timeline', body: ['Approved refunds are processed to the original payment method within 7–10 working days.'] },
      CONTACT,
    ],
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    updated: UPDATED,
    intro: 'We ship across India. Here is what to expect once you place an order.',
    sections: [
      { heading: 'Production & delivery time', body: [
        'Orders are typically produced and delivered within 7–10 days of confirmation. Complex or large designs may take longer and we will let you know in advance.',
      ]},
      { heading: 'Shipping charges', body: ['Shipping charges, if any, are confirmed with you on WhatsApp before payment.'] },
      { heading: 'Packaging', body: ['Signs are securely packed with protective material to reduce the risk of damage in transit.'] },
      { heading: 'Tracking', body: ['Once dispatched, we share tracking details with you on WhatsApp.'] },
      { heading: 'Delays & delivery issues', body: [
        'Courier delays are outside our control. Please ensure your address and phone number are correct. Contact us immediately if your parcel is delayed or arrives damaged.',
      ]},
      CONTACT,
    ],
  },
};
