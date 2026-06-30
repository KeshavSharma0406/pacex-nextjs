'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [text, setText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring configs — the ring lags behind the dot
  const dotX = useSpring(cursorX, { damping: 35, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 35, stiffness: 800, mass: 0.2 });
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 200, mass: 0.5 });

  // Trail particles
  const trailRef = useRef([]);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setHidden(true);
      return;
    }

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add trail particle
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 2 + 1,
      });
      if (trailRef.current.length > 60) trailRef.current.shift();
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    // Hover detection for interactive elements
    const onOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"], input, select, textarea');
      if (target) {
        setHovered(true);
        const label = target.getAttribute('data-cursor-text');
        if (label) setText(label);
      }
    };

    const onOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"], input, select, textarea');
      if (target) {
        setHovered(false);
        setText('');
      }
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Canvas trail
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        trailRef.current.forEach((p, i) => {
          p.life -= 0.025;
          if (p.life <= 0) {
            trailRef.current.splice(i, 1);
            return;
          }

          const alpha = p.life * 0.4;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8);
          gradient.addColorStop(0, `rgba(233, 69, 96, ${alpha})`);
          gradient.addColorStop(0.4, `rgba(124, 58, 237, ${alpha * 0.5})`);
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
          ctx.fill();
        });

        rafRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Ring (outer) — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          animate={{
            width: hovered ? 80 : 40,
            height: hovered ? 80 : 40,
            borderColor: hovered
              ? 'rgba(233, 69, 96, 0.8)'
              : 'rgba(255, 255, 255, 0.3)',
            backgroundColor: hovered
              ? 'rgba(233, 69, 96, 0.08)'
              : 'transparent',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full border"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AnimatePresence>
            {text && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-[10px] font-display font-semibold text-white uppercase tracking-wider"
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Dot (inner) — sticks to mouse */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          animate={{
            width: clicked ? 6 : hovered ? 4 : 8,
            height: clicked ? 6 : hovered ? 4 : 8,
            backgroundColor: hovered ? '#e94560' : '#ffffff',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 500 }}
          className="rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            boxShadow: hovered
              ? '0 0 20px rgba(233, 69, 96, 0.6)'
              : '0 0 10px rgba(255, 255, 255, 0.3)',
          }}
        />
      </motion.div>
    </>
  );
}
