import { useState } from "react";
import { X, ArrowRight, CheckCircle } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  initialZipCode?: string;
  onClose: () => void;
}

export function LeadCaptureModal({ isOpen, initialZipCode = "", onClose }: LeadCaptureModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: initialZipCode,
    homeType: "",
    monthlyBill: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  if (!isOpen) return null;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(1, prev - 1));

  const homeTypes = ["Single Family", "Multi-Family", "Townhome", "Commercial"];
  const bills = ["$50-100", "$101-200", "$201-300", "$300+"];

  if (step === 4) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 max-w-md w-full text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-2 solar-gradient" />
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Design Ready!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">We've received your details. One of our solar engineers will contact you within 24 hours with your custom design.</p>
          <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">Done</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 solar-gradient" />
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-1.5">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${step >= s ? 'w-8 bg-solar-amber' : 'w-4 bg-slate-100'}`} />
              ))}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's get started</h2>
                  <p className="text-slate-500">Tell us about your home.</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Property Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {homeTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, homeType: type })}
                        className={`p-4 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                          formData.homeType === type 
                            ? 'border-solar-amber bg-solar-amber/5 text-slate-900 shadow-md shadow-solar-amber/10' 
                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Current Monthly Bill</label>
                  <div className="grid grid-cols-2 gap-3">
                    {bills.map(bill => (
                      <button
                        key={bill}
                        onClick={() => setFormData({ ...formData, monthlyBill: bill })}
                        className={`p-4 rounded-xl border-2 text-sm font-bold transition-all duration-200 ${
                          formData.monthlyBill === bill 
                            ? 'border-solar-amber bg-solar-amber/5 text-slate-900 shadow-md shadow-solar-amber/10' 
                            : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {bill}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={!formData.homeType || !formData.monthlyBill}
                  onClick={nextStep} 
                  className="w-full solar-gradient text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-solar-amber/20 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button onClick={prevStep} className="text-slate-400 hover:text-slate-600 font-medium text-sm flex items-center gap-1 transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Location</h2>
                  <p className="text-slate-500">Where should we build your system?</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Zip Code</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 90210" 
                      value={formData.zipCode} 
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })} 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 focus:outline-none focus:border-solar-amber/40 transition-colors font-medium" 
                    />
                  </div>
                </div>

                <button 
                  disabled={!formData.zipCode}
                  onClick={nextStep} 
                  className="w-full solar-gradient text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-solar-amber/20 transition-all disabled:opacity-50"
                >
                  Final Step <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button onClick={prevStep} className="text-slate-400 hover:text-slate-600 font-medium text-sm flex items-center gap-1 transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Contact Details</h2>
                  <p className="text-slate-500">Who are we sending the design to?</p>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 focus:outline-none focus:border-solar-amber/40 transition-colors font-medium" />
                    <input type="text" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 focus:outline-none focus:border-solar-amber/40 transition-colors font-medium" />
                  </div>
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 focus:outline-none focus:border-solar-amber/40 transition-colors font-medium" />
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 focus:outline-none focus:border-solar-amber/40 transition-colors font-medium" />
                </div>

                <button 
                  disabled={!formData.firstName || !formData.email || !formData.phone}
                  onClick={nextStep} 
                  className="w-full solar-gradient text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-solar-amber/20 transition-all disabled:opacity-50"
                >
                  Generate My Custom Design <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
