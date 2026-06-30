'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { scrollState } from '@/lib/scrollProgress';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ({ scroll, limit }) => {
      scrollState.progress = limit > 0 ? scroll / limit : 0;
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Reset scroll to top on route change (Lenis instance persists across navigation
  // since SmoothScroll lives in the root layout)
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    scrollState.progress = 0;
  }, [pathname]);

  return <>{children}</>;
}
