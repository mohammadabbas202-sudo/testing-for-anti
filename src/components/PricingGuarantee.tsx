import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export function PricingGuarantee() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <motion.section
      id="guarantee"
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Zero Down. Immediate ROI.
          </h2>
          <p className="text-xl text-muted leading-relaxed">
            Your monthly savings typically exceed your solar payment from day one.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative bg-cool-gray border-2 border-solar-amber/20 rounded-2xl p-10 md:p-12 overflow-hidden group/guarantee"
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-solar-amber/8 to-transparent" />
          <div className="relative flex items-start gap-6 mb-2">
            <div className="w-12 h-12 rounded-xl bg-solar-amber flex items-center justify-center shadow-lg shadow-solar-amber/20">
              <Shield className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                The Lumina Production Guarantee
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                If your system underproduces, we pay you the difference in cash.
              </p>
            </div>
          </div>
          
          {/* Connector Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-solar-amber/20 to-transparent hidden md:block" />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 grid md:grid-cols-3 gap-6 relative">
          {/* Connecting Arrows for Desktop */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-solar-amber/10 to-transparent -translate-y-6 hidden md:block" />
          
          <div className="p-8 bg-white border border-slate-200 rounded-2xl hover:border-solar-amber/30 hover:shadow-xl hover:shadow-solar-amber/5 hover:scale-[1.02] transition-all duration-500 group">
            <p className="text-[10px] tracking-widest font-bold text-slate-400 mb-4 uppercase">INSTALLATION</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">No Cost</p>
            <p className="text-sm text-slate-500">Professional setup included</p>
            <div className="mt-6 w-8 h-1 bg-slate-100 group-hover:bg-solar-amber/20 transition-colors rounded-full" />
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-2xl hover:border-solar-amber/30 hover:shadow-xl hover:shadow-solar-amber/5 hover:scale-[1.02] transition-all duration-500 group">
            <p className="text-[10px] tracking-widest font-bold text-slate-400 mb-4 uppercase">WARRANTY</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">25 Years</p>
            <p className="text-sm text-slate-500">Performance & production</p>
            <div className="mt-6 w-8 h-1 bg-slate-100 group-hover:bg-solar-amber/20 transition-colors rounded-full" />
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-2xl hover:border-solar-amber/30 hover:shadow-xl hover:shadow-solar-amber/5 hover:scale-[1.02] transition-all duration-500 group">
            <p className="text-[10px] tracking-widest font-bold text-slate-400 mb-4 uppercase">ROOF PROTECTION</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">10 Years</p>
            <p className="text-sm text-slate-500">Roof-Shield leak warranty</p>
            <div className="mt-6 w-8 h-1 bg-slate-100 group-hover:bg-solar-amber/20 transition-colors rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
