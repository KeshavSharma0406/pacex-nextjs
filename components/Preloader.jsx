'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip preloader on repeat visits within the session
    if (sessionStorage.getItem('pacex-loaded')) {
      setDone(true);
      return;
    }

    let raf;
    const start = performance.now();
    const duration = 1800;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem('pacex-loaded', '1');
        setTimeout(() => setDone(true), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <motion.span
              className="font-mono text-xs text-white/30 tracking-[0.3em] mb-6"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              [ 00 ] PACEX
            </motion.span>

            <span className="font-serif italic text-6xl md:text-8xl text-white">
              {progress}
              <span className="text-2xl align-top">%</span>
            </span>

            <motion.div className="w-48 h-px bg-white/10 mt-8 overflow-hidden">
              <motion.div
                className="h-full bg-fg"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            <span className="font-mono text-[10px] text-white/20 tracking-widest mt-4">
              index.html — loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
