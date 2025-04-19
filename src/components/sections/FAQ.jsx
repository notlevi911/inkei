import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: 'How easy is it to get started with Zenith?',
      answer:
        "Getting started with Zenith is incredibly simple. After signing up, you'll have immediate access to our intuitive dashboard. Our onboarding process guides you through the essential features, and you can import your existing data in just a few clicks. Most users are up and running within minutes.",
    },
    {
      id: 2,
      question: 'Can I migrate data from other platforms?',
      answer:
        'Yes, we offer comprehensive migration tools to help you seamlessly transfer data from other platforms. Zenith supports imports from all major competitors, and our dedicated migration team is available to assist with complex transfers at no additional cost.',
    },
    {
      id: 3,
      question: 'Is Zenith suitable for small businesses and enterprises alike?',
      answer:
        'Absolutely! Zenith was designed to scale with your needs. Our Starter plan is perfect for small businesses and individuals, while our Professional and Enterprise plans offer advanced features for larger organizations. Many of our clients have scaled with us from startup to enterprise.',
    },
    {
      id: 4,
      question: 'What kind of customer support do you offer?',
      answer:
        'We provide multi-tiered support across all plans. Starter plans include email support with 24-hour response times. Professional plans add priority support with faster response times and chat support. Enterprise plans include 24/7 dedicated support with a dedicated account manager and phone support.',
    },
    {
      id: 5,
      question: 'How secure is my data with Zenith?',
      answer:
        'Security is our top priority. Zenith employs industry-leading encryption protocols, regular security audits, and compliance with major standards including GDPR, HIPAA, and SOC 2. All data is encrypted both in transit and at rest, and we offer optional two-factor authentication for all accounts.',
    },
    {
      id: 6,
      question: 'Can I cancel my subscription at any time?',
      answer:
        "Yes, you can cancel your subscription at any time with no cancellation fees. For monthly plans, you'll retain access until the end of your billing cycle. For annual plans, we offer prorated refunds for the unused portion of your subscription.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => setOpenIndex(openIndex === index ? null : index);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="faq" className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-300">
            Find answers to common questions about Zenith's features, pricing, and support.
          </p>
        </div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          variants={container}
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemFade}
              className="rounded-xl bg-slate-800/60 border border-slate-700 hover:border-indigo-500 backdrop-blur-md transition-all duration-300 cursor-pointer group"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center p-6 transition duration-300 group-hover:scale-[1.01]">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-slate-300">
                      <p className="text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-400">
            Still have questions?
            <a
              href="#contact"
              className="text-indigo-400 font-semibold ml-1 hover:text-indigo-300 transition duration-200"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
