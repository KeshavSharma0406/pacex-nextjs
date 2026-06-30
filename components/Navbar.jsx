'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Magnetic } from './Animations';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    setScrolled(latest > 50);
    setHidden(latest > prev && latest > 200);
  });

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Internship', href: '/internship' },
  ];

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="wrap px-6 md:px-12 lg:px-20">
          <div
            className={`flex items-center justify-between rounded-full px-6 md:px-8 py-3 transition-all duration-500 ${
              scrolled
                ? 'glass-strong shadow-lg shadow-black/20'
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <Magnetic strength={0.2}>
              <Link href="/" className="flex items-center gap-2" data-cursor-text="Home">
                <span className="text-xl font-display font-bold gradient-text-hover">
                  PaceX
                </span>
              </Link>
            </Magnetic>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <Magnetic key={link.href} strength={0.15}>
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 font-mono tracking-wide group"
                    data-cursor-text="View"
                  >
                    <span className="text-white/20 mr-1">{'//'}</span>
                    {link.label.toUpperCase()}
                    <motion.span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-accent rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: '70%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </Magnetic>
              ))}
            </nav>

            {/* CTA + Burger */}
            <div className="flex items-center gap-4">
              <Magnetic strength={0.2}>
                <Link
                  href="/signup"
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-wider border border-white/15 text-white hover:bg-white hover:text-black transition-all duration-500"
                  data-cursor-text="Join"
                >
                  GET_STARTED
                </Link>
              </Magnetic>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center"
                aria-label="Menu"
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    className="w-6 h-[1.5px] bg-white block origin-center"
                  />
                  <motion.span
                    animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    className="w-6 h-[1.5px] bg-white block"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    className="w-6 h-[1.5px] bg-white block origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-surface flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-5xl font-display font-bold text-white hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex gap-4 mt-8"
            >
              <Link href="/login" onClick={() => setOpen(false)} className="btn-outline">
                Login
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary">
                <span>Sign Up</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
