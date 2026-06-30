'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
} from 'framer-motion';

/* ─── Scroll-triggered fade-up reveal ─── */
export function Reveal({ children, className = '', delay = 0, y = 60 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Scale-in reveal ─── */
export function ScaleIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Horizontal slide ─── */
export function SlideIn({ children, className = '', delay = 0, direction = 'left' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const x = direction === 'left' ? -80 : 80;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger wrapper ─── */
export function Stagger({ children, className = '', staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChild({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax section ─── */
export function Parallax({ children, className = '', speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);
  const smoothY = useSpring(y, { damping: 30, stiffness: 100 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── 3D Tilt Card ─── */
export function TiltCard({ children, className = '' }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { damping: 20, stiffness: 200 });
  const smoothRotateY = useSpring(rotateY, { damping: 20, stiffness: 200 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(y * -8);
    rotateY.set(x * 8);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Magnetic Button Wrapper ─── */
export function Magnetic({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 15, stiffness: 150 });
  const smoothY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Character-by-character text reveal ─── */
export function TextReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const chars = text.split('');

  return (
    <motion.span ref={ref} className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom', display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Word-by-word text reveal ─── */
export function WordReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const words = text.split(' ');

  return (
    <motion.span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── Scroll-linked progress line ─── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-px bg-fg/40 z-[100]"
    />
  );
}

/* ─── Floating 3D shape ─── */
export function FloatingShape({
  className = '',
  size = 60,
  color = 'rgba(233, 69, 96, 0.15)',
  duration = 8,
  delay = 0,
}) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: 'blur(1px)',
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -10, 5, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ─── Floating tag cloud — words drifting around a focal point ─── */
export function FloatingTags({ tags, className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {tags.map((tag, i) => (
        <motion.span
          key={i}
          className="tag-chip absolute"
          style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            y: [0, -16, -8, -24],
            x: [0, 8, -4, 6],
          }}
          transition={{
            duration: tag.duration || 10,
            delay: tag.delay || 0,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {tag.label}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Infinite marquee ticker ─── */
export function Marquee({ items, speed = 25, className = '' }) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="inline-flex"
      >
        {[...Array(2)].map((_, set) => (
          <div key={set} className="inline-flex items-center">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center font-mono text-sm text-fg/40 tracking-wide">
                {item}
                <span className="mx-6 text-fg/30">·</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Letter-pinned spine section (Nudot N-U-D-O-T style) ─── */
export function LetterPin({ letter, eyebrow, title, desc, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative grid grid-cols-12 gap-6 items-center py-16 md:py-24 border-b border-line last:border-b-0">
      {/* Giant letter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-4 md:col-span-3"
      >
        <span className="font-serif italic text-[5rem] md:text-[9rem] leading-none text-fg/[0.06] select-none">
          {letter}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-8 md:col-span-9"
      >
        <div className="flex items-center gap-4 mb-3">
          <span className="micro-label">{eyebrow}</span>
          <span className="stat-label">{String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-display font-bold mb-3">{title}</h3>
        <p className="text-fg/40 font-body max-w-lg leading-relaxed">{desc}</p>
      </motion.div>
    </div>
  );
}

/* ─── Terminal-style stat ─── */
export function TerminalStat({ value, label, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className}>
      <p className="font-mono text-2xl md:text-3xl text-fg mb-1">
        {value}
        <span className="text-fg/50">_</span>
        <span className="text-fg/30">{label.toUpperCase().replace(/ /g, '_')}</span>
      </p>
    </div>
  );
}

/* ─── Slide counter (01 // 05 style) ─── */
export function SlideCounter({ current, total, className = '' }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-sm ${className}`}>
      <span className="text-fg">⟪</span>
      <span className="text-fg">{String(current).padStart(2, '0')}</span>
      <span className="text-fg/30">// {String(total).padStart(2, '0')}</span>
      <span className="text-fg">⟫</span>
    </div>
  );
}


export function Counter({ target, suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
