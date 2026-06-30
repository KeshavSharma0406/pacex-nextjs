'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Magnetic } from '@/components/Animations';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert('Login submitted (dev mode)');
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
        <div className="text-center mb-12">
          <Link href="/">
            <span className="font-serif italic text-2xl">PaceX</span>
          </Link>
          <h1 className="font-display font-semibold text-3xl mt-6">Welcome back</h1>
          <p className="text-muted text-sm mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="micro-label !mb-2 block">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="field-input"
            />
          </div>

          <div className="pt-6">
            <label className="micro-label !mb-2 block">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="field-input"
            />
          </div>

          <div className="flex justify-end pt-3">
            <Link href="#" className="font-mono text-xs text-muted hover:text-fg transition-colors">
              Forgot password?
            </Link>
          </div>

          <Magnetic strength={0.15} className="block w-full">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-10 disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </Magnetic>
        </form>

        <p className="text-center text-muted text-sm mt-10">
          Don't have an account?{' '}
          <Link href="/signup" className="text-fg hover:opacity-70 transition-opacity">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
