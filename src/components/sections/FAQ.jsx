import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: 'How easy is it to get started with Zenith?',
      answer: 'Getting started with Zenith is incredibly simple. After signing up, you\'ll have immediate access to our intuitive dashboard. Our onboarding process guides you through the essential features, and you can import your existing data in just a few clicks. Most users are up and running within minutes.',
    },
    {
      id: 2,
      question: 'Can I migrate data from other platforms?',
      answer: 'Yes, we offer comprehensive migration tools to help you seamlessly transfer data from other platforms. Zenith supports imports from all major competitors, and our dedicated migration team is available to assist with complex transfers at no additional cost.',
    },
    {
      id: 3,
      question: 'Is Zenith suitable for small businesses and enterprises alike?',
      answer: 'Absolutely! Zenith was designed to scale with your needs. Our Starter plan is perfect for small businesses and individuals, while our Professional and Enterprise plans offer advanced features for larger organizations. Many of our clients have scaled with us from startup to enterprise.',
    },
    {
      id: 4,
      question: 'What kind of customer support do you offer?',
      answer: 'We provide multi-tiered support across all plans. Starter plans include email support with 24-hour response times. Professional plans add priority support with faster response times and chat support. Enterprise plans include 24/7 dedicated support with a dedicated account manager and phone support.',
    },
    {
      id: 5,
      question: 'How secure is my data with Zenith?',
      answer: 'Security is our top priority. Zenith employs industry-leading encryption protocols, regular security audits, and compliance with major standards including GDPR, HIPAA, and SOC 2. All data is encrypted both in transit and at rest, and we offer optional two-factor authentication for all accounts.',
    },
    {
      id: 6,
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your subscription at any time with no cancellation fees. For monthly plans, you\'ll retain access until the end of your billing cycle. For annual plans, we offer prorated refunds for the unused portion of your subscription.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Find answers to common questions about Zenith's features, pricing, and support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white transition-all duration-200 hover:shadow-md"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-slate-900">{faq.question}</h3>
                <svg
                  className={`h-6 w-6 text-indigo-500 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600">
            Still have questions?
            <a href="#contact" className="text-indigo-600 font-medium ml-1 hover:text-indigo-700">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;