'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, ScaleIn, SlideIn, Stagger, StaggerChild, TiltCard, Parallax, FloatingShape, TextReveal, WordReveal, ScrollProgress } from '@/components/Animations';

export default function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const values = [
    { title: 'Skills Lead to Success', desc: 'Every program is outcome-driven and industry-aligned.', icon: '◆' },
    { title: 'Experiential Learning', desc: 'Real projects, real clients, real deadlines — not simulations.', icon: '◇' },
    { title: 'Personalized Mentorship', desc: 'Paired with professionals who guide your unique journey.', icon: '△' },
    { title: 'Continuous Upskilling', desc: 'The market moves fast. We keep you ahead of the curve.', icon: '○' },
  ];

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <FloatingShape className="top-[20%] right-[10%]" size={120} color="rgba(124,58,237,0.08)" duration={12} />
        <FloatingShape className="bottom-[30%] left-[5%]" size={80} color="rgba(233,69,96,0.08)" duration={10} delay={3} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="wrap px-6 md:px-12 lg:px-20 pt-40 pb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs font-mono text-accent tracking-[0.3em] uppercase">
            About PaceX
          </motion.span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mt-4 leading-[0.95]">
            <TextReveal text="We're building" delay={0.4} />
            <br />
            <TextReveal text="the bridge between" delay={0.7} />
            <br />
            <span className="gradient-text-hover"><TextReveal text="education & career." delay={1.0} /></span>
          </h1>
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="section-pad">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <SlideIn direction="left">
              <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-6 leading-tight">
                Education must be <span className="gradient-text">practical, transformative, and accessible.</span>
              </h2>
              <p className="text-white/50 font-body leading-relaxed mb-6">
                We're not just preparing learners for the future — we're helping them create it. Our philosophy is rooted in one core principle: skills lead to success.
              </p>
              <p className="text-white/50 font-body leading-relaxed">
                That's why every program we design is outcome-driven, industry-aligned, and focused on unlocking real opportunities for real people.
              </p>
            </SlideIn>

            <SlideIn direction="right" delay={0.2}>
              <TiltCard className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/10 to-purple/10 blur-3xl" />
                <div className="relative h-full glass rounded-3xl flex items-center justify-center p-12">
                  <div className="text-center">
                    <motion.div
                      className="text-7xl mb-6"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      ◈
                    </motion.div>
                    <p className="text-2xl font-display font-bold gradient-text">Skills Lead Success</p>
                    <p className="text-white/40 text-sm mt-2 font-body">Our core principle</p>
                  </div>
                </div>
              </TiltCard>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad relative overflow-hidden">
        <Parallax speed={0.1} className="absolute bottom-0 left-0 w-[500px] h-[500px] -z-10">
          <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' }} />
        </Parallax>

        <div className="wrap">
          <Reveal>
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Core Values</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-16">
              What drives <span className="gradient-text">everything we do.</span>
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.12}>
            {values.map((v, i) => (
              <StaggerChild key={i}>
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass rounded-2xl p-8 h-full border border-white/5 hover:border-accent/20 transition-colors duration-500 group"
                    data-cursor="pointer"
                  >
                    <span className="text-3xl text-accent/40 group-hover:text-accent transition-colors font-mono">{v.icon}</span>
                    <h3 className="text-xl font-display font-bold mt-4 mb-2 group-hover:gradient-text transition-all">{v.title}</h3>
                    <p className="text-white/40 font-body leading-relaxed">{v.desc}</p>
                  </motion.div>
                </TiltCard>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <TiltCard>
                <div className="glass rounded-2xl p-10 md:p-12 h-full border border-white/5 hover:border-purple/30 transition-colors duration-500" data-cursor="pointer">
                  <span className="text-xs font-mono text-purple tracking-[0.3em] uppercase">Vision</span>
                  <p className="text-xl md:text-2xl font-display font-semibold mt-4 leading-relaxed text-white/80">
                    To empower individuals with the practical skills, confidence, and support needed to excel in their careers — through innovative programs, expert mentorship, and real-world learning.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.15}>
              <TiltCard>
                <div className="glass rounded-2xl p-10 md:p-12 h-full border border-white/5 hover:border-accent/30 transition-colors duration-500" data-cursor="pointer">
                  <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Mission</span>
                  <p className="text-xl md:text-2xl font-display font-semibold mt-4 leading-relaxed text-white/80">
                    To bridge the gap between education and employability by making skill-based, industry-relevant training accessible and impactful for every learner — across roles, industries, and aspirations.
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey CTA */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <div className="glass rounded-3xl p-12 md:p-20 text-center border border-white/5 relative overflow-hidden">
              <FloatingShape className="top-[10%] left-[10%]" size={60} color="rgba(233,69,96,0.1)" duration={8} />
              <FloatingShape className="bottom-[10%] right-[10%]" size={40} color="rgba(124,58,237,0.1)" duration={10} delay={2} />
              <div className="relative z-10">
                <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Join Us</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-6">
                  <WordReveal text="Whether you're aiming to grow professionally, break through barriers, or build something of your own — this is where it begins." />
                </h2>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
