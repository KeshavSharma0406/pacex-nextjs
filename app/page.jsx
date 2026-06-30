'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Reveal, ScaleIn, SlideIn, Stagger, StaggerChild,
  Parallax, TiltCard, Magnetic, TextReveal, WordReveal,
  FloatingShape, Counter, ScrollProgress,
} from '@/components/Animations';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(heroScroll, [0, 1], [0, -150]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroBlur = useTransform(heroScroll, [0, 1], [0, 10]);

  const courses = [
    { name: 'CAPTURE', duration: '4 months', desc: 'Career Advancement & Practical Training Under Real Experience. Build essential industry-ready skills with on-the-job training from day one.', gradient: 'from-blue-500/20 to-cyan-500/20', border: 'hover:border-cyan-500/30' },
    { name: 'IMPACT', duration: '8 months', desc: 'Advanced career acceleration for working professionals stuck in stagnant roles. Leadership, strategic thinking, AI tools, and career transformation.', gradient: 'from-purple-500/20 to-pink-500/20', border: 'hover:border-purple-500/30' },
    { name: 'IGNITE', duration: '6-8 months', desc: 'Entrepreneurship launchpad for aspiring founders. From idea validation to startup finance, legal setup, marketing, and digital execution.', gradient: 'from-orange-500/20 to-red-500/20', border: 'hover:border-orange-500/30' },
  ];

  const features = [
    { title: 'Practical Learning', desc: 'Business tools, communication, critical thinking, AI — what actually matters at work.', num: '01' },
    { title: 'Day-One Experience', desc: 'Live industry exposure and on-the-job training from your very first month.', num: '02' },
    { title: 'Real Mentors', desc: 'Entrepreneurs, managers, designers, coders — not textbook teachers.', num: '03' },
    { title: 'Career Support', desc: 'Resume polishing, interview prep, and direct placement assistance.', num: '04' },
    { title: 'Stage-Matched Programs', desc: 'Starting out, switching careers, or building your own — we meet you where you are.', num: '05' },
    { title: 'Proven Results', desc: '5,000+ learners trained, hundreds of companies, careers transformed.', num: '06' },
  ];

  return (
    <>
      <ScrollProgress />

      {/* ═══════ HERO ═══════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(233,69,96,0.12) 0%, transparent 70%)' }}
            animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)' }}
            animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }}
            animate={{ x: [0, 60, -30, 0], y: [0, -50, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Floating 3D shapes */}
        <FloatingShape className="top-[15%] left-[10%]" size={80} color="rgba(233,69,96,0.1)" duration={10} />
        <FloatingShape className="top-[25%] right-[15%]" size={50} color="rgba(124,58,237,0.12)" duration={12} delay={2} />
        <FloatingShape className="bottom-[20%] left-[20%]" size={40} color="rgba(34,211,238,0.1)" duration={8} delay={4} />
        <FloatingShape className="bottom-[30%] right-[25%]" size={100} color="rgba(233,69,96,0.06)" duration={14} delay={1} />
        <FloatingShape className="top-[60%] left-[60%]" size={30} color="rgba(124,58,237,0.08)" duration={9} delay={3} />

        {/* Grid lines overlay */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="wrap px-6 md:px-12 lg:px-20 pt-32 pb-20 relative z-10"
        >
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-white/60 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Where Excellence Meets Direction
              </span>
            </motion.div>

            {/* Headline with character reveal */}
            <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display font-bold leading-[0.95] tracking-tight mb-8">
              <TextReveal text="Stuck in the" delay={0.4} />
              <br />
              <span className="gradient-text-hover">
                <TextReveal text="Crowd?" delay={0.8} />
              </span>
              <br />
              <TextReveal text="Time to" delay={1.1} />
              {' '}
              <span className="gradient-text-hover">
                <TextReveal text="Break Out." delay={1.3} />
              </span>
            </h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed mb-12 font-body"
            >
              90% of grads feel lost. 70% settle for jobs they don't love.
              You're built for more. Get trained. Get paid. Get placed.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
              className="flex flex-wrap gap-4"
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
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-1.5 rounded-full bg-accent"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ STATS MARQUEE ═══════ */}
      <section className="py-16 border-y border-white/5 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap"
        >
          {[...Array(2)].map((_, set) => (
            <div key={set} className="flex gap-16 items-center">
              {[
                { val: '5000', suffix: '+', label: 'Students Impacted' },
                { val: '35', suffix: '+', label: 'College Partners' },
                { val: '87', suffix: '%', label: 'Placement Rate' },
                { val: '200', suffix: '+', label: 'Hiring Partners' },
                { val: '12', suffix: '+', label: 'Internship Domains' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-4xl md:text-5xl font-display font-bold gradient-text">
                      <Counter target={stat.val} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-white/40 font-mono uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                  <span className="text-white/10 text-2xl">✦</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════ PROGRAMS ═══════ */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Programs</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 mb-4">
              Three paths.{' '}
              <span className="gradient-text">One goal.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl font-body mb-16">
              Career-ready. Every program is outcome-driven and industry-aligned.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6" staggerDelay={0.15}>
            {courses.map((c) => (
              <StaggerChild key={c.name}>
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`relative glass rounded-2xl p-8 md:p-10 h-full border border-white/5 ${c.border} transition-colors duration-500 group overflow-hidden`}
                    data-cursor="pointer"
                    data-cursor-text="Explore"
                  >
                    {/* Gradient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl`} />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-display font-bold">{c.name}</h3>
                        <span className="text-xs font-mono text-white/40 px-3 py-1 rounded-full border border-white/10">
                          {c.duration}
                        </span>
                      </div>
                      <p className="text-white/50 font-body leading-relaxed mb-8">{c.desc}</p>
                      <motion.span
                        className="inline-flex items-center gap-2 text-sm font-display text-accent"
                        whileHover={{ x: 5 }}
                      >
                        Learn more
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </motion.span>
                    </div>
                  </motion.div>
                </TiltCard>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════ WHY PACEX ═══════ */}
      <section className="section-pad relative overflow-hidden">
        {/* Parallax background accent */}
        <Parallax speed={0.15} className="absolute top-0 right-0 w-[600px] h-[600px] -z-10">
          <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(233,69,96,0.06) 0%, transparent 70%)' }} />
        </Parallax>

        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left sticky heading */}
            <SlideIn direction="left" className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Why PaceX</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-6 leading-tight">
                Not your typical{' '}
                <span className="gradient-text">training institute.</span>
              </h2>
              <p className="text-white/40 font-body leading-relaxed">
                We're a team of educators, industry professionals, and career coaches who believe every individual deserves a fair chance at success.
              </p>
            </SlideIn>

            {/* Right features */}
            <div className="lg:col-span-7">
              <Stagger className="space-y-4" staggerDelay={0.1}>
                {features.map((f) => (
                  <StaggerChild key={f.num}>
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                      className="glass rounded-xl p-6 flex gap-6 items-start group hover:border-accent/20 transition-colors duration-500"
                      data-cursor="pointer"
                    >
                      <span className="text-sm font-mono text-accent/50 group-hover:text-accent transition-colors pt-1">
                        {f.num}
                      </span>
                      <div>
                        <h4 className="font-display font-semibold text-lg mb-1 group-hover:text-accent transition-colors">{f.title}</h4>
                        <p className="text-white/40 font-body text-sm leading-relaxed">{f.desc}</p>
                      </div>
                    </motion.div>
                  </StaggerChild>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE TEXT ═══════ */}
      <section className="py-20 overflow-hidden border-y border-white/5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[8rem] md:text-[12rem] font-display font-bold text-white/[0.02] mx-8 select-none">
              GET TRAINED • GET PAID • GET PLACED •
            </span>
          ))}
        </motion.div>
      </section>

      {/* ═══════ LOCATION ═══════ */}
      <section className="section-pad">
        <div className="wrap text-center">
          <ScaleIn>
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Location</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 mb-4">
              <span className="gradient-text">Jaipur,</span> Rajasthan
            </h2>
            <p className="text-white/40 text-lg font-body max-w-lg mx-auto mb-8">
              We just don't provide courses — we provide a launchpad.
            </p>
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
