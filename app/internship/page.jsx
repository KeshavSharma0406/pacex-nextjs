'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Reveal, ScaleIn, Stagger, StaggerChild, Magnetic,
  TextReveal, TerminalStat, ScrollProgress,
} from '@/components/Animations';

export default function Internship() {
  const steps = [
    { num: '01', title: 'Apply Online', desc: 'A short form — your stream, college, and preferred domain. Under 5 minutes, no entrance test.' },
    { num: '02', title: 'Orientation & Onboarding', desc: 'Meet your mentor, receive your project brief, understand what success looks like.' },
    { num: '03', title: 'Work on Real Projects', desc: 'Contribute to live projects — not dummy tasks. Weekly mentor check-ins and real feedback.' },
    { num: '04', title: 'Get Certified & Placed', desc: 'A digitally verifiable certificate. Top performers get direct referrals to hiring partners.' },
  ];

  const programs = [
    { name: 'CAPTURE', duration: '4 months', desc: 'On-the-job training from day one. Built for students entering the workforce for the first time.' },
    { name: 'IMPACT', duration: '8 months', desc: 'Advanced acceleration for working professionals stuck in stagnant roles, ready to lead.' },
    { name: 'IGNITE', duration: '6–8 months', desc: 'Entrepreneurship launchpad — idea validation, legal setup, finance, and execution.' },
  ];

  const domains = [
    'Web Development', 'Digital Marketing', 'AI & Data Analysis', 'Graphic Design & UI',
    'Social Media', 'Business Development', 'Content & SEO', 'HR & Talent',
    'Finance', 'E-Commerce', 'Video Production', 'PR & Communications',
  ];

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center section-pad !pb-10">
        <span className="micro-label mb-6">Internship Program</span>
        <h1 className="font-display font-semibold text-[clamp(3rem,8vw,7rem)] leading-[0.95] max-w-4xl">
          <span className="block"><TextReveal text="Real Work." delay={0.3} /></span>
          <span className="block serif-italic font-normal"><TextReveal text="Real Experience." delay={0.7} /></span>
          <span className="block"><TextReveal text="Real Career." delay={1.1} /></span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="max-w-xl mt-8 text-lg text-muted leading-relaxed"
        >
          We bridge the gap between classroom learning and industry demands — a structured
          internship that builds a career, not just a line on a resume.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Magnetic>
            <a
              href="https://forms.gle/Lyufwto7JJY8VqRz9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor-text="Apply"
            >
              Apply for Internship
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#process" className="btn-outline" data-cursor-text="View">
              How it works
            </a>
          </Magnetic>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-line">
        <Stagger className="wrap px-6 md:px-12 lg:px-[6vw] flex flex-wrap gap-12 md:gap-20" staggerDelay={0.1}>
          {[
            { value: '35+', label: 'College Partners' },
            { value: '5000+', label: 'Students Enrolled' },
            { value: '87%', label: 'Placement Rate' },
            { value: '200+', label: 'Hiring Partners' },
          ].map((s, i) => (
            <StaggerChild key={i}>
              <TerminalStat value={s.value} label={s.label} />
            </StaggerChild>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section id="process" className="section-pad">
        <Reveal>
          <span className="micro-label">Process</span>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-semibold mt-3 mb-16">
            Application to certificate. <span className="serif-italic font-normal">Four steps.</span>
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-10 border-b border-line">
                <span className="font-mono text-sm text-muted md:w-16">{s.num}</span>
                <h3 className="font-display font-semibold text-xl md:text-2xl md:w-80">{s.title}</h3>
                <p className="text-muted leading-relaxed max-w-md">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="section-pad !pt-0">
        <Reveal>
          <span className="micro-label">Programs</span>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-semibold mt-3 mb-16">
            Three paths. <span className="serif-italic font-normal">Pick yours.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border-t border-line">
          {programs.map((p, i) => (
            <motion.div
              key={p.name}
              whileHover={{ backgroundColor: 'rgba(243,241,234,0.02)' }}
              className="bg-bg p-8 md:p-10"
              data-cursor="pointer"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="stat-label">{String(i + 1).padStart(2, '0')}</span>
                <span className="stat-label">{p.duration}</span>
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4">{p.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Domains */}
      <section className="section-pad">
        <Reveal>
          <span className="micro-label">Domains</span>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-semibold mt-3 mb-16">
            12 domains. <span className="serif-italic font-normal">One goal: career-ready.</span>
          </h2>
        </Reveal>

        <Stagger className="flex flex-wrap gap-3" staggerDelay={0.04}>
          {domains.map((d, i) => (
            <StaggerChild key={i}>
              <span className="inline-block px-5 py-3 rounded-full border border-line text-sm text-fg/70 hover:text-fg hover:border-fg transition-all duration-300 cursor-default">
                {d}
              </span>
            </StaggerChild>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="section-pad min-h-[60vh] flex flex-col justify-center border-t border-line">
        <ScaleIn>
          <h2 className="text-[clamp(2.6rem,6vw,5rem)] font-display font-semibold leading-tight mb-8">
            Your first day at work <span className="serif-italic font-normal">starts here.</span>
          </h2>
          <p className="text-muted text-lg max-w-md mb-10">
            Applications for the July 2026 batch are open now.
          </p>
          <Magnetic>
            <a
              href="https://forms.gle/Lyufwto7JJY8VqRz9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor-text="Apply"
            >
              Apply Now
            </a>
          </Magnetic>
        </ScaleIn>
      </section>
    </>
  );
}
