import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetYourDesign: (zipCode: string) => void;
}

const words = ['Energy', 'Independence,', 'Artfully', 'Engineered.'];

const videos = [
  'https://videos.pexels.com/video-files/8853531/8853531-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/15046856/15046856-uhd_2730_1440_24fps.mp4',
  'https://videos.pexels.com/video-files/7211094/7211094-uhd_2560_1440_30fps.mp4',
];

function AmbientParticle({ delay, x, size }: { delay: number; x: string; size: string }) {
  return (
    <motion.div
      className="absolute rounded-full bg-solar-amber/30 pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        bottom: '10%',
      }}
      animate={{
        y: [-20, -80, -40, -100, -20],
        x: [0, 10, -5, 15, 0],
        opacity: [0.1, 0.4, 0.15, 0.3, 0.1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function Hero({ onGetYourDesign }: HeroProps) {
  const [zipCode, setZipCode] = useState('');
  const [currentVideo, setCurrentVideo] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Background videos with crossfade */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {videos.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload={currentVideo === i ? "auto" : "none"}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]"
            style={{ opacity: currentVideo === i ? 1 : 0 }}
          />
        ))}
      </motion.div>

      {/* Heavy dark overlay - keeps text as focal point */}
      <div className="absolute inset-0 z-[1] bg-black/65" />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 z-[2]" style={{
        background: `
          radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%),
          linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 25%),
          linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 15%)
        `,
      }} />

      {/* Subtle amber glow from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 z-[3]" style={{
        background: 'linear-gradient(to top, rgba(245,158,11,0.04) 0%, transparent 100%)',
      }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[4] opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
      }} />

      {/* Ambient particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <AmbientParticle delay={0} x="15%" size="3px" />
        <AmbientParticle delay={2} x="35%" size="2px" />
        <AmbientParticle delay={4} x="55%" size="4px" />
        <AmbientParticle delay={1} x="70%" size="2px" />
        <AmbientParticle delay={3} x="85%" size="3px" />
        <AmbientParticle delay={5} x="25%" size="2px" />
        <AmbientParticle delay={6} x="60%" size="3px" />
        <AmbientParticle delay={2.5} x="45%" size="2px" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        initial="hidden"
        animate="visible"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.05] tracking-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-lg md:text-xl text-gray-300 mb-14 leading-relaxed font-light tracking-wide max-w-xl mx-auto"
        >
          Lower your bills and raise your home's value with the world's most efficient solar technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative px-4 sm:px-0"
        >
          <input
            type="text"
            placeholder="Enter your zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full sm:flex-1 px-5 py-4 rounded-lg bg-white/8 backdrop-blur-md text-white placeholder-gray-500 font-medium border border-white/10 focus:outline-none focus:ring-2 focus:ring-solar-amber/40 focus:bg-white/12 transition-all duration-300"
          />
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => {
                if (zipCode.trim()) {
                  onGetYourDesign(zipCode);
                }
              }}
              className="w-full relative px-8 py-4 solar-gradient text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-solar-amber/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap group"
            >
              Get Your Design
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <span className="absolute inset-0 rounded-lg solar-gradient animate-ping opacity-20 pointer-events-none" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 text-sm text-gray-500 font-light tracking-wide"
        >
          Join 12,000+ homeowners already saving with Lumina
        </motion.p>
      </motion.div>

      {/* Video navigation dots */}
      <div className="absolute bottom-10 left-6 sm:left-12 z-20 flex gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentVideo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentVideo === i ? 'bg-solar-amber w-6' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>

      {/* Transition line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-solar-amber/15 z-10" />
    </section>
  );
}
