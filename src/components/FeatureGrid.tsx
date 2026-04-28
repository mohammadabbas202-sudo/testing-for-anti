import { motion } from 'framer-motion';
import { Zap, Layers, Smartphone, Battery, ShieldCheck, CloudLightning } from 'lucide-react';

export function FeatureGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      icon: Zap,
      title: 'Tier-1 Performance',
      description: 'Harvests maximum energy even in low light with spectral sensitivity technology.',
    },
    {
      icon: Layers,
      title: 'Seamless Aesthetics',
      description: 'Low-profile, all-black mounting that complements modern architecture.',
    },
    {
      icon: Smartphone,
      title: 'Smart Ecosystem',
      description: 'Real-time monitoring and optimization through the Lumina App.',
    },
    {
      icon: Battery,
      title: 'Battery Storage',
      description: 'Optional Tesla Powerwall integration for 24/7 energy independence.',
    },
    {
      icon: ShieldCheck,
      title: 'Grid Independence',
      description: 'Stay powered during outages with advanced backup and switching systems.',
    },
    {
      icon: CloudLightning,
      title: 'Weather Resilient',
      description: 'Engineered to withstand 160mph winds and extreme hailstorms.',
    },
  ];

  return (
    <motion.section
      id="features"
      className="py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Engineered for Excellence
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Premium technology that maximizes efficiency and minimizes visual impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group p-8 border border-slate-200 rounded-xl hover:border-solar-amber/30 hover:shadow-lg hover:shadow-solar-amber/5 transition-all duration-300"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-solar-amber/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <Icon className="relative w-10 h-10 text-solar-amber transition-all duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
