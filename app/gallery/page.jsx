'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, Stagger, StaggerChild, TiltCard, TextReveal, ScrollProgress } from '@/components/Animations';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'orientations', 'workshops', 'events', 'campus'];

  const images = [
    { id: 1, category: 'orientations', title: 'Student Orientation 2026', ratio: 'aspect-[3/4]' },
    { id: 2, category: 'workshops', title: 'Digital Marketing Workshop', ratio: 'aspect-square' },
    { id: 3, category: 'events', title: 'Annual Career Fair', ratio: 'aspect-[4/3]' },
    { id: 4, category: 'campus', title: 'Campus Connect Drive', ratio: 'aspect-square' },
    { id: 5, category: 'orientations', title: 'Batch Kickoff July 2026', ratio: 'aspect-[3/4]' },
    { id: 6, category: 'workshops', title: 'AI & Data Analysis Bootcamp', ratio: 'aspect-[4/3]' },
    { id: 7, category: 'events', title: 'Startup Weekend Jaipur', ratio: 'aspect-square' },
    { id: 8, category: 'campus', title: 'College Partnership Signing', ratio: 'aspect-[3/4]' },
    { id: 9, category: 'workshops', title: 'UI/UX Design Sprint', ratio: 'aspect-[4/3]' },
  ];

  const filtered = filter === 'all' ? images : images.filter((i) => i.category === filter);

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className="pt-40 pb-20 wrap px-6 md:px-12 lg:px-20">
        <Reveal>
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">Gallery</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mt-3 leading-[0.95]">
            <TextReveal text="Moments that" delay={0.3} />
            <br />
            <span className="gradient-text-hover"><TextReveal text="define us." delay={0.7} /></span>
          </h1>
        </Reveal>

        {/* Filter buttons */}
        <Reveal delay={0.4}>
          <div className="flex flex-wrap gap-2 mt-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full text-sm font-mono capitalize transition-all duration-300 ${
                  filter === cat
                    ? 'bg-accent text-white'
                    : 'glass text-white/50 hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="wrap px-6 md:px-12 lg:px-20 pb-32">
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid"
              >
                <TiltCard>
                  <motion.div
                    whileHover={{ y: -4 }}
                    onClick={() => setSelected(img)}
                    className={`${img.ratio} relative rounded-2xl overflow-hidden group border border-white/5 hover:border-accent/20 transition-colors duration-500`}
                    data-cursor="pointer"
                    data-cursor-text="View"
                  >
                    {/* Gradient placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5" />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-4xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"
                        whileHover={{ rotate: 90 }}
                      >
                        ◈
                      </motion.div>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
                    >
                      <div>
                        <p className="text-white font-display font-semibold text-sm">{img.title}</p>
                        <p className="text-white/50 text-xs font-mono capitalize mt-1">{img.category}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[200] flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
              style={{ perspective: 1000 }}
            >
              <div className="aspect-video bg-gradient-to-br from-accent/10 to-purple/10 rounded-2xl border border-white/10 flex items-center justify-center">
                <span className="text-6xl opacity-20">◈</span>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xl font-display font-bold">{selected.title}</p>
                <p className="text-white/40 text-sm font-mono capitalize mt-1">{selected.category}</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelected(null)}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
