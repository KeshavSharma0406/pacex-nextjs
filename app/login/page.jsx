'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TiltCard, FloatingShape, Magnetic } from '@/components/Animations';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Login submitted (dev mode)');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background shapes */}
      <FloatingShape className="top-[10%] left-[5%]" size={200} color="rgba(233,69,96,0.06)" duration={15} />
      <FloatingShape className="bottom-[10%] right-[5%]" size={300} color="rgba(124,58,237,0.05)" duration={18} delay={3} />
      <FloatingShape className="top-[50%] right-[30%]" size={100} color="rgba(34,211,238,0.04)" duration={12} delay={5} />

      {/* Grid overlay */}
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
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/">
            <span className="text-2xl font-display font-bold gradient-text-hover">PaceX</span>
          </Link>
          <h1 className="text-3xl font-display font-bold mt-4">Welcome back</h1>
          <p className="text-white/40 text-sm font-body mt-2">Sign in to continue your journey</p>
        </div>

        {/* Form card */}
        <TiltCard>
          <div className="glass-strong rounded-2xl p-8 border border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <motion.label
                  animate={{ y: focused === 'email' || form.email ? -24 : 0, scale: focused === 'email' || form.email ? 0.85 : 1, color: focused === 'email' ? '#e94560' : 'rgba(255,255,255,0.4)' }}
                  className="absolute left-4 top-4 text-sm font-body origin-left pointer-events-none"
                >
                  Email address
                </motion.label>
                <input
                  type="email"
                  value={form.email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full px-4 pt-6 pb-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-body focus:border-accent focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <motion.label
                  animate={{ y: focused === 'password' || form.password ? -24 : 0, scale: focused === 'password' || form.password ? 0.85 : 1, color: focused === 'password' ? '#e94560' : 'rgba(255,255,255,0.4)' }}
                  className="absolute left-4 top-4 text-sm font-body origin-left pointer-events-none"
                >
                  Password
                </motion.label>
                <input
                  type="password"
                  value={form.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="w-full px-4 pt-6 pb-3 rounded-xl bg-white/[0.03] border border-white/10 text-white font-body focus:border-accent focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Submit */}
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
                    {loading ? 'Signing in...' : 'Sign In'}
                  </span>
                </motion.button>
              </Magnetic>
            </form>
          </div>
        </TiltCard>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm font-body mt-8">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent hover:text-white transition-colors font-semibold">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
