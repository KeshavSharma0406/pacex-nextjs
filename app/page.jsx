'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Reveal, ScaleIn, SlideIn, Stagger, StaggerChild,
  Parallax, TiltCard, Magnetic, TextReveal,
  FloatingTags, Marquee, LetterPin, TerminalStat, SlideCounter,
  ScrollProgress,
} from '@/components/Animations';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, -100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const [activeProgram, setActiveProgram] = useState(0);

  const heroTags = [
    { label: 'Mentorship', top: '15%', left: '8%', duration: 9 },
    { label: 'Internships', top: '25%', right: '10%', duration: 11, delay: 1 },
    { label: 'Certification', top: '65%', left: '5%', duration: 10, delay: 2 },
    { label: 'Placement', top: '70%', right: '12%', duration: 8, delay: 0.5 },
    { label: 'Real Projects', top: '45%', left: '2%', duration: 12, delay: 1.5 },
    { label: 'Career Growth', top: '10%', left: '45%', duration: 9, delay: 2.5 },
    { label: 'Industry Mentors', top: '80%', left: '40%', duration: 10, delay: 0.8 },
  ];

  const letters = [
    { letter: 'P', eyebrow: 'Practical', title: 'Skills that work in the real world', desc: 'Business tools, communication, critical thinking, AI fluency — what actually matters once you walk into a job.' },
    { letter: 'A', eyebrow: 'Authentic', title: 'Mentorship from people who\u2019ve done it', desc: 'Entrepreneurs, managers, designers, coders. Not textbook theory — lived industry experience.' },
    { letter: 'C', eyebrow: 'Career-Ready', title: 'Outcomes over certificates', desc: 'Every program is built backward from what hiring managers actually screen for.' },
    { letter: 'E', eyebrow: 'Experience', title: 'On-the-job training from day one', desc: 'Live projects, real briefs, real deadlines — your first day already looks like a real job.' },
    { letter: 'X', eyebrow: 'eXcellence', title: 'A track record that speaks for itself', desc: '5,000+ learners trained, 87% placement rate, 200+ hiring partners across India.' },
  ];

  const programs = [
    { name: 'CAPTURE', duration: '4 months', desc: 'On-the-job training from day one. Built for students entering the workforce for the first time.' },
    { name: 'IMPACT', duration: '8 months', desc: 'Advanced acceleration for working professionals stuck in stagnant roles, ready to lead.' },
    { name: 'IGNITE', duration: '6–8 months', desc: 'Entrepreneurship launchpad — from idea validation to legal setup, finance, and execution.' },
  ];

  const tickerItems = ['INTERNSHIPS', 'MENTORSHIP', 'CERTIFICATION', 'PLACEMENT', 'REAL PROJECTS', 'CAREER GROWTH'];

  return (
    <>
      <ScrollProgress />

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <FloatingTags tags={heroTags} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="wrap px-6 md:px-12 lg:px-20 pt-32 pb-20 relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="micro-label">Career Readiness Platform</span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-display font-bold leading-[0.92] tracking-tight">
            <TextReveal text="Stuck in the" delay={0.4} />
            <br />
            <span className="font-serif italic font-normal text-white/90">
              <TextReveal text="crowd?" delay={0.8} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-lg text-white/40 max-w-md mx-auto mt-8 mb-12 font-body leading-relaxed"
          >
            Get trained. Get paid. Get placed. 90% of grads feel lost — you don't have to be one of them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Magnetic>
              <Link href="/internship" className="btn-primary" data-cursor-text="Apply">
                <span>Start Your Journey</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/about" className="btn-outline" data-cursor-text="Learn">
                Discover PaceX
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] text-white/25 tracking-[0.3em]">SCROLL</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30 text-lg"
          >
            ↓
          </motion.span>
        </motion.div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <section className="py-8 border-y border-line">
        <Marquee items={tickerItems} speed={22} />
      </section>

      {/* ═══════ LETTER SPINE — P·A·C·E·X ═══════ */}
      <section className="section-pad !pb-0">
        <div className="wrap">
          <Reveal>
            <span className="micro-label">What we stand for</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4">
              Five letters. <span className="font-serif italic font-normal">One standard.</span>
            </h2>
          </Reveal>
        </div>

        <div className="wrap mt-12">
          {letters.map((l, i) => (
            <LetterPin
              key={l.letter}
              letter={l.letter}
              eyebrow={l.eyebrow}
              title={l.title}
              desc={l.desc}
              index={i + 1}
              total={letters.length}
            />
          ))}
        </div>
      </section>

      {/* ═══════ TERMINAL STATS ═══════ */}
      <section className="py-20 border-y border-line">
        <div className="wrap px-6 md:px-12 lg:px-20">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
            {[
              { value: '5000+', label: 'Students Trained' },
              { value: '87%', label: 'Placement Rate' },
              { value: '35+', label: 'College Partners' },
              { value: '2026', label: 'Established' },
            ].map((s, i) => (
              <StaggerChild key={i}>
                <TerminalStat value={s.value} label={s.label} />
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════ PROGRAMS SLIDER ═══════ */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-16">
              <div>
                <span className="micro-label">Programs</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">
                  Three paths. <span className="font-serif italic font-normal">One goal.</span>
                </h2>
              </div>
              <SlideCounter current={activeProgram + 1} total={programs.length} />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line">
            {programs.map((p, i) => (
              <motion.div
                key={p.name}
                onMouseEnter={() => setActiveProgram(i)}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                className="bg-bg p-8 md:p-10 cursor-pointer group"
                data-cursor="pointer"
                data-cursor-text="View"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="stat-label">{String(i + 1).padStart(2, '0')}</span>
                  <span className="stat-label">{p.duration}</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent transition-colors duration-500">
                  {p.name}
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CLOSING ═══════ */}
      <section className="section-pad relative overflow-hidden">
        <Parallax speed={0.1} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] -z-10">
          <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(91,158,255,0.04) 0%, transparent 70%)' }} />
        </Parallax>

        <div className="wrap text-center">
          <ScaleIn>
            <span className="micro-label">Jaipur, Rajasthan</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mt-4 mb-8">
              We don't provide courses.
              <br />
              <span className="font-serif italic font-normal">We provide a launchpad.</span>
            </h2>
            <Magnetic>
              <a href="mailto:contact@pacex.co.in" className="btn-outline" data-cursor-text="Email">
                contact@pacex.co.in
              </a>
            </Magnetic>
          </ScaleIn>
        </div>
      </section>
    </>
  );
}
