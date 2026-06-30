'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal, ScaleIn, SlideIn, Stagger, StaggerChild, TiltCard, Parallax, FloatingShape, Magnetic, TextReveal, Counter, ScrollProgress } from '@/components/Animations';

export default function Internship() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const steps = [
    { num: '01', title: 'Apply Online', desc: 'Fill a short form — your stream, college, and preferred domain. Under 5 minutes. No entrance test.' },
    { num: '02', title: 'Orientation & Onboarding', desc: 'Meet your mentor, receive your project brief, and understand what success looks like.' },
    { num: '03', title: 'Work on Real Projects', desc: 'Contribute to live projects — not dummy tasks. Weekly mentor check-ins and real feedback.' },
    { num: '04', title: 'Get Certified & Placed', desc: 'Receive a digitally verifiable certificate. Top performers get direct referrals to 200+ hiring partners.' },
  ];

  const benefits = [
    { title: 'Industry-Led Mentorship', desc: 'Paired with a working professional who reviews your work every week.' },
    { title: 'Verifiable Certificate', desc: 'Each certificate has a unique QR code recruiters can scan instantly.' },
    { title: 'Live Project Experience', desc: 'Real briefs from real organizations. Concrete answers for interviews.' },
    { title: 'Placement Support', desc: 'Resume review, mock interviews, direct referrals to 200+ hiring partners.' },
    { title: 'Skill Certifications', desc: 'Domain-specific micro-certifications in Digital Marketing, Data Analysis, and more.' },
    { title: 'Letter of Recommendation', desc: 'High performers receive a personalized LOR useful for higher education.' },
  ];

  const domains = [
    'Web Development', 'Digital Marketing', 'AI & Data Analysis', 'Graphic Design & UI',
    'Social Media', 'Business Dev', 'Content & SEO', 'HR & Talent',
    'Finance', 'E-Commerce', 'Video Production', 'PR & Comms',
  ];

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <FloatingShape className="top-[15%] right-[10%]" size={100} color="rgba(233,69,96,0.08)" duration={12} />
        <FloatingShape className="bottom-[20%] left-[5%]" size={60} color="rgba(124,58,237,0.08)" duration={10} delay={3} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="wrap px-6 md:px-12 lg:px-20 pt-40 pb-20">
          <div className="max-w-4xl">
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xs font-mono text-accent tracking-[0.3em] uppercase">
              Internship Program
            </motion.span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mt-4 leading-[0.95]">
              <TextReveal text="Real Work." delay={0.4} />
              <br />
              <span className="gradient-text-hover"><TextReveal text="Real Experience." delay={0.8} /></span>
              <br />
              <TextReveal text="Real Career." delay={1.2} />
            </h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }} className="text-lg text-white/50 max-w-xl mt-8 mb-10 font-body leading-relaxed">
              We bridge the gap between classroom learning and industry demands — giving students a structured internship that builds a career, not just a line on a resume.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }} className="flex flex-wrap gap-4">
              <Magnetic>
                <Link href="https://forms.gle/Lyufwto7JJY8VqRz9" target="_blank" className="btn-primary" data-cursor-text="Apply">
                  <span>Apply for Internship</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href="#process" className="btn-outline" data-cursor-text="Learn">How It Works</a>
              </Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="wrap px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: '35', suf: '+', label: 'College Partners' },
              { val: '5000', suf: '+', label: 'Students Enrolled' },
              { val: '87', suf: '%', label: 'Placement Rate' },
              { val: '200', suf: '+', label: 'Hiring Partners' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-display font-bold gradient-text">
                    <Counter target={s.val} suffix={s.suf} />
                  </p>
                  <p className="text-xs text-white/40 font-mono uppercase tracking-wider mt-2">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="section-pad">
        <div className="wrap">
          <Reveal>
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Process</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mt-3 mb-16">
              Application to certificate. <span className="gradient-text">Four steps.</span>
            </h2>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-purple/30 to-transparent" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ x: 12 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex gap-8 items-start pl-4"
                  >
                    {/* Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-purple flex items-center justify-center"
                      >
                        <span className="text-xs font-mono font-bold">{step.num}</span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="glass rounded-xl p-8 flex-1 border border-white/5 hover:border-accent/20 transition-colors duration-500" data-cursor="pointer">
                      <h3 className="text-xl font-display font-bold mb-2">{step.title}</h3>
                      <p className="text-white/50 font-body leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-pad relative overflow-hidden">
        <Parallax speed={0.1} className="absolute top-0 right-0 w-[500px] h-[500px] -z-10">
          <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, rgba(233,69,96,0.05) 0%, transparent 70%)' }} />
        </Parallax>

        <div className="wrap">
          <Reveal>
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">What You Get</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-16">
              More than a certificate. <span className="gradient-text">A career headstart.</span>
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            {benefits.map((b, i) => (
              <StaggerChild key={i}>
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="glass rounded-2xl p-8 h-full border border-white/5 hover:border-accent/20 transition-colors duration-500 group"
                    data-cursor="pointer"
                  >
                    <span className="text-2xl font-mono text-accent/30 group-hover:text-accent transition-colors">◆</span>
                    <h3 className="text-lg font-display font-bold mt-4 mb-2">{b.title}</h3>
                    <p className="text-white/40 font-body text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                </TiltCard>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Domains */}
      <section className="section-pad">
        <div className="wrap">
          <Reveal>
            <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Domains</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-16">
              12 domains. <span className="gradient-text">One goal: career-ready.</span>
            </h2>
          </Reveal>

          <Stagger className="flex flex-wrap gap-3" staggerDelay={0.05}>
            {domains.map((d, i) => (
              <StaggerChild key={i}>
                <motion.span
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="inline-block px-5 py-3 rounded-full glass text-sm font-body text-white/70 hover:text-white hover:border-accent/30 border border-white/5 transition-all duration-300"
                  data-cursor="pointer"
                >
                  {d}
                </motion.span>
              </StaggerChild>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="wrap text-center">
          <ScaleIn>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Your first day at work <span className="gradient-text">starts here.</span>
            </h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto mb-10 font-body">
              Applications for the July 2026 batch are open now.
            </p>
            <Magnetic>
              <Link href="https://forms.gle/Lyufwto7JJY8VqRz9" target="_blank" className="btn-primary text-lg" data-cursor-text="Apply">
                <span>Apply Now</span>
              </Link>
            </Magnetic>
          </ScaleIn>
        </div>
      </section>
    </>
  );
}
