'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Magnetic } from './Animations';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    setHidden(latest > prev && latest > 200 && !open);
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
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 w-full z-50 py-7"
        style={{ mixBlendMode: 'difference' }}
      >
        <div className="wrap px-6 md:px-12 lg:px-[6vw] flex items-center justify-between">
          <Magnetic strength={0.2}>
            <Link href="/" data-cursor-text="Home">
              <span className="font-serif italic text-xl text-fg">PaceX</span>
            </Link>
          </Magnetic>

          <nav className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <Magnetic key={link.href} strength={0.15}>
                <Link
                  href={link.href}
                  className="relative font-mono text-[11px] tracking-[0.15em] uppercase text-fg/70 hover:text-fg transition-colors duration-300 group"
                  data-cursor-text="View"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-fg transition-all duration-300 group-hover:w-full" />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Magnetic strength={0.2}>
              <Link
                href="/internship"
                className="hidden md:inline-flex px-5 py-2.5 rounded-full font-mono text-[11px] tracking-[0.15em] uppercase border border-fg text-fg"
                data-cursor-text="Apply"
              >
                Apply
              </Link>
            </Magnetic>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-8 h-5"
              aria-label="Menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 w-8 h-px bg-fg"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute left-0 top-1/2 w-8 h-px bg-fg"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="absolute left-0 bottom-0 w-8 h-px bg-fg"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-serif italic text-5xl text-fg"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-4 mt-6"
            >
              <Link href="/login" onClick={() => setOpen(false)} className="btn-outline">
                Login
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary">
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
