'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal, Magnetic } from './Animations';

export default function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="wrap section-pad !py-20">
        {/* Big CTA */}
        <Reveal>
          <div className="text-center mb-20">
            <span className="micro-label">Ready when you are</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-6">
              <span className="font-serif italic font-normal">Break out</span> of the crowd.
            </h2>
            <p className="text-muted text-lg mb-8 max-w-lg mx-auto font-body">
              Join 5,000+ students already transforming their careers with PaceX.
            </p>
            <Magnetic>
              <Link href="/internship" className="btn-primary" data-cursor-text="Apply">
                <span>Start Your Journey</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-line to-transparent mb-10"
          style={{ originX: 0.5 }}
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted font-body">
          <p>© 2026 PaceX. All rights reserved.</p>

          <div className="flex gap-6">
            {['Home', 'About', 'Gallery', 'Internship'].map((label) => (
              <Link
                key={label}
                href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                className="hover:text-fg transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex gap-4">
            {[
              { label: 'IG', href: 'https://www.instagram.com/pacexindia/' },
              { label: 'YT', href: 'https://www.youtube.com/@PACEXINDIA' },
              { label: 'FB', href: 'https://www.facebook.com/profile.php?id=61576615411160' },
            ].map((s) => (
              <Magnetic key={s.label} strength={0.3}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono hover:border-fg hover:text-fg transition-all duration-300"
                  data-cursor-text={s.label}
                >
                  {s.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
