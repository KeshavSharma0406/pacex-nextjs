'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Reveal, ScaleIn, Stagger, StaggerChild,
  Magnetic, TextReveal, Marquee, TerminalStat,
  ScrollProgress,
} from '@/components/Animations';

const introWords = "We don't just teach. We build the bridge between education and employment.".split(' ');

function IntroStatement() {
  const ref = useRef(null);
  const [opacities, setOpacities] = useState(introWords.map(() => 0.12));

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const spans = ref.current.querySelectorAll('[data-word]');
      const centerY = window.innerHeight * 0.55;
      const next = Array.from(spans).map((el) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - centerY);
        return Math.max(0.12, 1 - dist / 280);
      });
      setOpacities(next);
    }
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className="text-[clamp(1.8rem,4.2vw,3.4rem)] font-display font-medium leading-[1.3] max-w-5xl">
      {introWords.map((w, i) => (
        <span
          key={i}
          data-word
          className={i === 6 || i === 7 ? 'serif-italic' : ''}
          style={{ opacity: opacities[i], transition: 'opacity 0.1s linear' }}
        >
          {w}{' '}
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const tickerItems = ['TRAINING', 'MENTORSHIP', 'CERTIFICATION', 'PLACEMENT', 'REAL EXPERIENCE', 'CAREER GROWTH'];

  const programs = [
    { name: 'CAPTURE', meta: '4 months — on-the-job training from day one' },
    { name: 'IMPACT', meta: '8 months — acceleration for working professionals' },
    { name: 'IGNITE', meta: '6–8 months — entrepreneurship launchpad' },
  ];

  return (
    <>
      <ScrollProgress />

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex flex-col justify-center section-pad !pb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="micro-label mb-8"
        >
          Career Readiness Platform
        </motion.span>

        <h1 className="font-display font-semibold text-[clamp(3.5rem,11vw,9rem)] leading-[0.92]">
          <span className="block"><TextReveal text="Stuck in the" delay={0.4} /></span>
          <span className="block serif-italic font-normal"><TextReveal text="ordinary?" delay={0.8} /></span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="max-w-md mt-8 text-lg text-muted leading-relaxed"
        >
          Get trained. Get paid. Get placed. 90% of graduates feel lost — you were built for more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <Magnetic>
            <Link href="/internship" className="btn-primary mt-10" data-cursor-text="Apply">
              Begin your journey
            </Link>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="absolute bottom-12 left-6 md:left-12 lg:left-[6vw] flex items-center gap-3"
        >
          <span className="font-mono text-[10px] text-muted tracking-[0.3em]">SCROLL</span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-muted text-lg">
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="py-6 border-y border-line">
        <Marquee items={tickerItems} speed={26} />
      </section>

      {/* ═══════ INTRO STATEMENT ═══════ */}
      <section className="section-pad flex items-center min-h-[60vh]">
        <IntroStatement />
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-20 border-y border-line">
        <div className="wrap px-6 md:px-12 lg:px-[6vw]">
          <Stagger className="flex flex-wrap gap-12 md:gap-20" staggerDelay={0.1}>
            {[
              { value: '5000+', label: 'Students Trained' },
              { value: '87%', label: 'Placement Rate' },
              { value: '35+', label: 'College Partners' },
              { value: '200+', label: 'Hiring Partners' },
            ].map((s, i) => (
              <StaggerChild key={i}>
                <TerminalStat value={s.value} label={s.label} />
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════ PROGRAMS TEASER ═══════ */}
      <section className="section-pad">
        <Reveal>
          <span className="micro-label">Programs</span>
          <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-display font-semibold mt-3 mb-16">
            Three paths. <span className="serif-italic font-normal">One goal.</span>
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {programs.map((p, i) => (
            <Link key={p.name} href="/internship" data-cursor="pointer" data-cursor-text="View">
              <motion.div
                whileHover={{ paddingLeft: 16 }}
                className="flex items-center gap-8 py-9 border-b border-line transition-colors"
              >
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display font-semibold text-[clamp(1.6rem,3vw,2.6rem)] min-w-[220px]">{p.name}</span>
                <span className="text-muted flex-1 text-sm hidden md:block">{p.meta}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════ CLOSING ═══════ */}
      <section className="section-pad min-h-[70vh] flex flex-col justify-center">
        <ScaleIn>
          <span className="micro-label">Jaipur, Rajasthan</span>
          <h2 className="text-[clamp(2.6rem,6vw,5.5rem)] font-display font-semibold leading-[1.1] mt-4 mb-8">
            We don't provide courses.
            <br />
            <span className="serif-italic font-normal">We provide a launchpad.</span>
          </h2>
          <Magnetic>
            <a href="mailto:contact@pacex.co.in" className="btn-outline" data-cursor-text="Email">
              contact@pacex.co.in
            </a>
          </Magnetic>
        </ScaleIn>
      </section>
    </>
  );
}
