import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const faqs = [
    {
      question: 'Does it work when it\'s cloudy?',
      answer:
        'Yes. Our panels capture energy across the full light spectrum, including diffuse light. Systems still generate 10-25% of peak output on overcast days.',
    },
    {
      question: 'What about roof damage?',
      answer:
        'Our Roof-Shield 10-year warranty covers any leaks. We use non-penetrating mounting that distributes load evenly, and we cover all repairs if anything goes wrong.',
    },
    {
      question: 'Is there really $0 upfront?',
      answer:
        'Absolutely. Choose from loans, leases, or power-purchase agreements with no upfront cost. Most customers see positive cash flow from month one.',
    },
    {
      question: 'How long does installation take?',
      answer:
        '1-3 days for a typical residential install. We handle all permitting and inspections, and you\'ll be generating clean energy within weeks of signing.',
    },
    {
      question: 'What about maintenance?',
      answer:
        'Virtually maintenance-free. Most systems need a cleaning once or twice a year, and our monitoring app alerts you to any issues instantly.',
    },
  ];

  return (
    <motion.section
      id="faq"
      className="py-20 bg-cool-gray"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-16 relative inline-block w-full"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Common Questions
          </h2>
          <div className="w-24 h-1 bg-solar-amber mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted">
            Everything you need to know about solar.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`border rounded-2xl overflow-hidden bg-white transition-all duration-300 ${
                openIndex === index 
                  ? 'border-solar-amber/30 shadow-lg shadow-solar-amber/5' 
                  : 'border-slate-200 hover:border-solar-amber/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors duration-200 relative"
              >
                {openIndex === index && (
                  <motion.div 
                    layoutId="active-accent"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-solar-amber"
                  />
                )}
                <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === index ? 'text-slate-900' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-lg transition-colors duration-300 ${openIndex === index ? 'bg-solar-amber/10' : 'bg-slate-100'}`}>
                  <ChevronDown
                    className={`w-4 h-4 text-solar-amber flex-shrink-0 transition-transform duration-500 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    strokeWidth={2.5}
                  />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="border-t border-slate-100"
                  >
                    <div className="p-8 text-slate-600 leading-relaxed bg-slate-50/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50"
        >
          <p className="text-slate-600 font-medium mb-4">Still have questions?</p>
          <button className="text-solar-amber font-bold hover:text-solar-amber-dark transition-colors flex items-center gap-2 mx-auto group">
            Speak with an advisor
            <div className="w-8 h-8 rounded-full bg-solar-amber/10 flex items-center justify-center group-hover:bg-solar-amber group-hover:text-white transition-all">
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </div>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
