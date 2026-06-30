'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '@/components/Animations';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', college: '', domain: '' });
  const [loading, setLoading] = useState(false);

  const domains = ['Web Development', 'Digital Marketing', 'AI & Data Analysis', 'Graphic Design', 'Social Media', 'Business Development', 'Content Writing', 'HR & Talent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => {
      alert('Account created (dev mode)');
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/"><span className="font-serif italic text-2xl">PaceX</span></Link>
          <h1 className="font-display font-semibold text-3xl mt-6">
            {step === 1 ? 'Create your account' : 'Tell us more'}
          </h1>
          <p className="text-muted text-sm mt-2">
            {step === 1 ? 'Join the movement' : 'Help us personalize your experience'}
          </p>

          <div className="flex gap-2 justify-center mt-6">
            {[1, 2].map((s) => (
              <motion.div
                key={s}
                animate={{ width: s === step ? 40 : 20, backgroundColor: s <= step ? '#f3f1ea' : 'rgba(243,241,234,0.12)' }}
                className="h-px"
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <label className="micro-label !mb-2 block">Full Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-input" />

                <label className="micro-label !mb-2 block mt-8">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-input" />

                <label className="micro-label !mb-2 block mt-8">Password</label>
                <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="field-input" />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <label className="micro-label !mb-2 block">College Name</label>
                <input required value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className="field-input" />

                <label className="micro-label !mb-2 block mt-8">Preferred Domain</label>
                <select
                  required
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                  className="field-input appearance-none"
                >
                  <option value="" className="bg-bg">Select a domain</option>
                  {domains.map((d) => <option key={d} value={d} className="bg-bg">{d}</option>)}
                </select>

                <label className="flex items-start gap-3 mt-8">
                  <input type="checkbox" required className="w-4 h-4 mt-0.5 accent-fg" />
                  <span className="text-muted text-xs leading-relaxed">I agree to the terms and conditions</span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 space-y-3">
            <Magnetic strength={0.15} className="block w-full">
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-50">
                {loading ? 'Creating…' : step === 1 ? 'Continue' : 'Create Account'}
              </button>
            </Magnetic>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline w-full justify-center"
              >
                Back
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-muted text-sm mt-10">
          Already have an account?{' '}
          <Link href="/login" className="text-fg hover:opacity-70 transition-opacity">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
