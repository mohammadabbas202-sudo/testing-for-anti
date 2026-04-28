import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Calculator, ArrowRight, Sun, DollarSign, TrendingDown, Clock } from 'lucide-react';

interface SavingsCalculatorProps {
  onGetEstimate: () => void;
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v: number) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span>{display}</motion.span>;
}

export function SavingsCalculator({ onGetEstimate }: SavingsCalculatorProps) {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [sunHours, setSunHours] = useState(5);

  const calculateSavings = useCallback(() => {
    const systemSizeKw = (monthlyBill / 0.15) / (sunHours * 30);
    const monthlyProduction = systemSizeKw * sunHours * 30;
    const monthlySavings = Math.min(monthlyProduction * 0.15, monthlyBill * 0.85);
    const annualSavings = monthlySavings * 12;
    const lifetimeSavings = annualSavings * 25;
    const systemCost = systemSizeKw * 3000;
    const paybackYears = systemCost / annualSavings;
    return { monthlySavings, annualSavings, lifetimeSavings, paybackYears };
  }, [monthlyBill, sunHours]);

  const savings = calculateSavings();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
      id="calculator"
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-solar-amber/10 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-solar-amber" strokeWidth={1.5} />
            <span className="text-sm font-medium text-solar-amber">Savings Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            See What You Could Save
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Adjust the inputs below to estimate your potential savings with solar.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-8 items-stretch"
        >
          {/* Inputs */}
          <div className="bg-cool-gray rounded-xl p-8 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-8">Your Details</h3>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Monthly Electric Bill</label>
                <span className="text-lg font-bold text-solar-amber">${monthlyBill}</span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-amber"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>$50</span>
                <span>$500</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-slate-700">Average Daily Sun Hours</label>
                <span className="text-lg font-bold text-solar-amber">{sunHours}h</span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                step={0.5}
                value={sunHours}
                onChange={(e) => setSunHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-amber"
              />
              <div className="flex justify-between text-xs text-muted mt-2">
                <span>3h (Cloudy)</span>
                <span>8h (Sunny)</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Sun className="w-4 h-4 text-solar-amber" strokeWidth={1.5} />
                <span>Most US locations get 4-6 peak sun hours daily</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white flex flex-col relative overflow-hidden group/results border border-slate-800 hover:border-solar-amber/20 transition-colors duration-500">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-solar-amber/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold">Your Estimated Savings</h3>
              <div className="flex flex-col items-end">
                <span className="text-[10px] uppercase tracking-widest font-bold text-solar-amber/60 mb-1">Efficiency Match</span>
                <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-solar-amber"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (savings.monthlySavings / monthlyBill) * 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-solar-amber" strokeWidth={2} />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Monthly</span>
                </div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={savings.monthlySavings} prefix="$" />
                </p>
                <p className="text-[10px] text-solar-amber/60 mt-2 font-medium italic">Compared to ${monthlyBill} utility</p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-4 h-4 text-solar-amber" strokeWidth={2} />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Annually</span>
                </div>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={savings.annualSavings} prefix="$" />
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors duration-300 col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sun className="w-4 h-4 text-solar-amber" strokeWidth={2} />
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">25-Year Total Benefits</span>
                    </div>
                    <p className="text-4xl font-bold text-solar-amber">
                      <AnimatedNumber value={savings.lifetimeSavings} prefix="$" />
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-3 justify-end">
                      <Clock className="w-4 h-4 text-solar-amber" strokeWidth={2} />
                      <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Payback</span>
                    </div>
                    <p className="text-xl font-bold">
                      <AnimatedNumber value={savings.paybackYears} suffix=" yr" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onGetEstimate}
              className="mt-8 w-full solar-gradient text-slate-900 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-solar-amber/20 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Your Personalized Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
