'use client';

import { motion } from 'framer-motion';
import { Reveal, Stagger, StaggerChild, TextReveal, ScrollProgress } from '@/components/Animations';

const events = [
  { name: 'Student Orientation 2026', category: 'Orientation', date: 'Jan 2026' },
  { name: 'Digital Marketing Workshop', category: 'Workshop', date: 'Feb 2026' },
  { name: 'Annual Career Fair', category: 'Event', date: 'Mar 2026' },
  { name: 'Campus Connect Drive', category: 'Campus', date: 'Mar 2026' },
  { name: 'Batch Kickoff — July Cohort', category: 'Orientation', date: 'Jul 2026' },
  { name: 'AI & Data Analysis Bootcamp', category: 'Workshop', date: 'Aug 2026' },
  { name: 'Startup Weekend Jaipur', category: 'Event', date: 'Sep 2026' },
  { name: 'College Partnership Signing', category: 'Campus', date: 'Oct 2026' },
  { name: 'UI/UX Design Sprint', category: 'Workshop', date: 'Nov 2026' },
];

export default function Gallery() {
  return (
    <>
      <ScrollProgress />

      <section className="min-h-[50vh] flex flex-col justify-center section-pad !pb-10">
        <span className="micro-label mb-6">Gallery</span>
        <h1 className="font-display font-semibold text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
          <span className="block"><TextReveal text="Moments that" delay={0.3} /></span>
          <span className="block serif-italic font-normal"><TextReveal text="define us." delay={0.7} /></span>
        </h1>
      </section>

      <section className="section-pad !pt-0">
        <Reveal>
          <p className="text-muted max-w-lg mb-16">
            A running index of orientations, workshops, and events from our learning
            community across Jaipur and beyond.
          </p>
        </Reveal>

        <Stagger className="border-t border-line" staggerDelay={0.06}>
          {events.map((ev, i) => (
            <StaggerChild key={i}>
              <motion.div
                whileHover={{ paddingLeft: 16 }}
                className="flex flex-wrap items-center gap-4 md:gap-8 py-8 border-b border-line cursor-pointer group"
                data-cursor="pointer"
              >
                <span className="font-mono text-xs text-muted w-8">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display font-semibold text-xl md:text-2xl flex-1 min-w-[200px] group-hover:opacity-70 transition-opacity">
                  {ev.name}
                </span>
                <span className="micro-label !mb-0 hidden md:inline-flex">{ev.category}</span>
                <span className="font-mono text-xs text-muted">{ev.date}</span>
              </motion.div>
            </StaggerChild>
          ))}
        </Stagger>
      </section>

      <section className="section-pad text-center">
        <Reveal>
          <span className="micro-label">Follow along</span>
          <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-display font-semibold mt-4 mb-8">
            New moments added <span className="serif-italic font-normal">every month.</span>
          </h2>
          <a
            href="https://www.instagram.com/pacexindia/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            data-cursor-text="Follow"
          >
            @pacexindia
          </a>
        </Reveal>
      </section>
    </>
  );
}
