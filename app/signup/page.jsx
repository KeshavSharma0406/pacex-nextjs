'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TiltCard, FloatingShape, Magnetic } from '@/components/Animations';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '', domain: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const domains = ['Web Development', 'Digital Marketing', 'AI & Data Analysis', 'Graphic Design', 'Social Media', 'Business Development', 'Content Writing', 'HR & Talent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => {
      alert('Account created (dev mode)');
      setLoading(false);
    }, 1500);
  };

  const Field = ({ name, label, type = 'text', value }) => (
    <div className="relative">
      <motion.label
        animate={{
          y: focused === name || value ? -24 : 0,
          scale: focused === name || value ? 0.85 : 1,
          color: focused === name ? '#e94560' : 'rgba(255,255,255,0.4)',
        }}
        className="absolute left-4 top-4 text-sm font-body origin-left pointer-events-none"
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused('')}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        required
        className="w-full px-4 pt-6 pb-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-body focus:border-accent focus:outline-none transition-colors duration-300"
      />
    </div>
  );

  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0, filter: 'blur(6px)' }),
    center: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (d) => ({ x: d < 0 ? 80 : -80, opacity: 0, filter: 'blur(6px)' }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <FloatingShape className="top-[15%] right-[10%]" size={200} color="rgba(124,58,237,0.06)" duration={15} />
      <FloatingShape className="bottom-[15%] left-[10%]" size={250} color="rgba(233,69,96,0.05)" duration={18} delay={3} />

      <div className="absolute inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/"><span className="text-2xl font-display font-bold gradient-text-hover">PaceX</span></Link>
          <h1 className="text-3xl font-display font-bold mt-4">
            {step === 1 ? 'Create your account' : 'Tell us more'}
          </h1>
          <p className="text-white/40 text-sm font-body mt-2">
            {step === 1 ? 'Join the movement' : 'Help us personalize your experience'}
          </p>

          {/* Progress */}
          <div className="flex gap-2 justify-center mt-6">
            {[1, 2].map((s) => (
              <motion.div
                key={s}
                animate={{ width: s === step ? 48 : 24, backgroundColor: s <= step ? '#e94560' : 'rgba(255,255,255,0.1)' }}
                className="h-1 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Form */}
        <TiltCard>
          <div className="glass-strong rounded-2xl p-8 border border-white/5">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" custom={step}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <Field name="name" label="Full Name" value={form.name} />
                    <Field name="email" label="Email Address" type="email" value={form.email} />
                    <Field name="password" label="Password" type="password" value={form.password} />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={1}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <Field name="college" label="College Name" value={form.college} />

                    <div>
                      <label className="block text-sm text-white/40 font-body mb-3">Preferred Domain</label>
                      <select
                        value={form.domain}
                        onChange={(e) => setForm({ ...form, domain: e.target.value })}
                        required
                        className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white font-body focus:border-accent focus:outline-none transition-colors duration-300 appearance-none"
                      >
                        <option value="" className="bg-surface">Select a domain</option>
                        {domains.map((d) => (
                          <option key={d} value={d} className="bg-surface">{d}</option>
                        ))}
                      </select>
                    </div>

                    <label className="flex items-start gap-3">
                      <input type="checkbox" required className="w-4 h-4 rounded mt-0.5 accent-accent" />
                      <span className="text-white/40 text-xs font-body leading-relaxed">
                        I agree to the terms and conditions
                      </span>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="mt-8 space-y-3">
                <Magnetic strength={0.15}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary !rounded-xl py-4 disabled:opacity-50"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {loading && (
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      )}
                      {loading ? 'Creating...' : step === 1 ? 'Continue' : 'Create Account'}
                    </span>
                  </motion.button>
                </Magnetic>

                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 font-display text-sm"
                  >
                    Back
                  </button>
                )}
              </div>
            </form>
          </div>
        </TiltCard>

        <p className="text-center text-white/40 text-sm font-body mt-8">
          Already have an account?{' '}
          <Link href="/login" className="text-accent hover:text-white transition-colors font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
