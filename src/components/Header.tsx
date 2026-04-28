import { useState } from 'react';
import { useScrollHeader } from '../hooks/useScrollHeader';
import { Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onCheckEligibilityClick: () => void;
}

export function Header({ onCheckEligibilityClick }: HeaderProps) {
  const isScrolled = useScrollHeader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'features', label: 'How It Works' },
    { id: 'calculator', label: 'Savings' },
    { id: 'faq', label: 'FAQ' },
  ];

  const headerTextStyle = isScrolled ? 'text-slate-900' : 'text-white';
  const navLinkStyle = isScrolled 
    ? 'text-slate-600 hover:text-slate-900' 
    : 'text-white/80 hover:text-white';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 relative z-50">
            <Sun className="w-6 h-6 text-solar-amber" strokeWidth={1.5} />
            <span className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${headerTextStyle}`}>
              Lumina Solar
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors duration-300 ${navLinkStyle}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative z-50">
            <button
              className="hidden sm:block px-6 py-2 solar-gradient text-slate-900 text-sm font-semibold rounded-lg hover:shadow-md hover:shadow-solar-amber/20 transition-all duration-300 cursor-default"
            >
              Check Eligibility
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 transition-colors duration-300 ${headerTextStyle}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-left text-lg font-medium text-slate-900 hover:text-solar-amber transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    onCheckEligibilityClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-4 solar-gradient text-slate-900 font-bold rounded-xl text-center"
                >
                  Check Eligibility
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Scroll progress indicator */}
      <ScrollProgress />
    </>
  );
}

function ScrollProgress() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-solar-amber origin-left"
        style={{
          width: '100%',
          transformOrigin: 'left',
          animation: 'scrollProgress linear',
          animationTimeline: 'scroll()',
        }}
      />
    </div>
  );
}
