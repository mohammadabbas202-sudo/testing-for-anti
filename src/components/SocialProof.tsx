import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle, Zap } from 'lucide-react';

function CountUpNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 25 });
  const display = useTransform(spring, (v: number) => `${Math.round(v).toLocaleString()}${suffix}`);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          motionValue.set(target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, motionValue, hasAnimated]);

  return <motion.div ref={ref}>{display}</motion.div>;
}

export function SocialProof() {
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
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      id="social-proof"
      className="py-16 bg-white relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {/* Gradient Faded Borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
              <Award className="w-4 h-4 text-slate-600" strokeWidth={2} />
            </div>
            <span className="text-slate-600 text-sm font-semibold uppercase tracking-wider">NABCEP Certified</span>
          </motion.div>

          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
              <CheckCircle className="w-4 h-4 text-slate-600" strokeWidth={2} />
            </div>
            <span className="text-slate-600 text-sm font-semibold uppercase tracking-wider">SEIA Member</span>
          </motion.div>

          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-solar-amber/10 flex items-center justify-center border border-solar-amber/20">
              <Zap className="w-4 h-4 text-solar-amber" strokeWidth={2} />
            </div>
            <span className="text-slate-600 text-sm font-semibold uppercase tracking-wider">Energy Star</span>
          </motion.div>

          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="text-2xl font-bold text-slate-900 leading-tight">
              <CountUpNumber target={25} suffix=" Years" />
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Warranty</div>
          </motion.div>

          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="text-2xl font-bold text-slate-900 leading-tight">#1</div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Efficiency</div>
          </motion.div>

          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300" />

          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="text-2xl font-bold text-slate-900 leading-tight">
              <CountUpNumber target={12} suffix="K+" />
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Homes</div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
