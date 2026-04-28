import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle } from 'lucide-react';

interface FooterProps {
  onRequestAssessment: () => void;
}

export function Footer({ onRequestAssessment }: FooterProps) {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <motion.section
        id="cta"
        className="py-24 bg-slate-900 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-solar-amber/10 border border-solar-amber/20 rounded-full mb-8 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.1)]"
          >
            <AlertTriangle className="w-4 h-4 text-solar-amber" strokeWidth={1.5} />
            <span className="text-sm font-bold text-solar-amber uppercase tracking-wider">Limited 2026 Availability</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            The 2026 Solar Credits <br className="hidden md:block" /> are <span className="text-solar-amber">limited.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Lock in federal tax incentives before the Investment Tax Credit decreases next year. Join 12,000+ happy homeowners.
          </motion.p>

          <motion.div variants={itemVariants} className="relative inline-block">
            {/* Radial Glow Spotlight */}
            <div className="absolute inset-0 bg-solar-amber/20 blur-[60px] rounded-full scale-150 animate-pulse pointer-events-none" />
            
            <button
              className="relative inline-flex items-center gap-3 px-12 py-6 solar-gradient text-slate-900 font-bold rounded-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 transition-all duration-500 text-lg group overflow-hidden cursor-default"
            >
              <span className="relative z-10 flex items-center gap-2">
                Request Your Solar Assessment
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      <footer className="bg-slate-950 text-gray-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p>&copy; 2026 Lumina Solar. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                License
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
