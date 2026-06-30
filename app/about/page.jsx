'use client';

import { Reveal, ScaleIn, SlideIn, LetterPin, ScrollProgress, TextReveal } from '@/components/Animations';

export default function About() {
  const letters = [
    { letter: 'P', eyebrow: 'Practical', title: 'Skills that work in the real world', desc: 'Business tools, communication, critical thinking, AI fluency — what actually matters once you walk into a job.' },
    { letter: 'A', eyebrow: 'Authentic', title: "Mentorship from people who've done it", desc: 'Entrepreneurs, managers, designers, coders — lived industry experience, not textbook theory.' },
    { letter: 'C', eyebrow: 'Career-Ready', title: 'Outcomes over certificates', desc: 'Every program is built backward from what hiring managers actually screen for.' },
    { letter: 'E', eyebrow: 'Experience', title: 'On-the-job training from day one', desc: 'Live projects, real briefs, real deadlines — your first day already looks like a real job.' },
    { letter: 'X', eyebrow: 'eXcellence', title: 'A track record that speaks for itself', desc: '5,000+ learners trained, 87% placement rate, 200+ hiring partners across India.' },
  ];

  return (
    <>
      <ScrollProgress />

      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center section-pad !pb-10">
        <span className="micro-label mb-6">About PaceX</span>
        <h1 className="font-display font-semibold text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
          <span className="block"><TextReveal text="We're building" delay={0.3} /></span>
          <span className="block"><TextReveal text="the bridge between" delay={0.6} /></span>
          <span className="block serif-italic font-normal"><TextReveal text="education and career." delay={0.9} /></span>
        </h1>
      </section>

      {/* Philosophy */}
      <section className="section-pad !pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <SlideIn direction="left">
            <span className="micro-label">Philosophy</span>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-display font-semibold mt-3 mb-6 leading-tight">
              Education must be <span className="serif-italic font-normal">practical, transformative, and accessible.</span>
            </h2>
          </SlideIn>
          <SlideIn direction="right" delay={0.15}>
            <p className="text-muted leading-relaxed mb-5">
              We're not just preparing learners for the future — we're helping them create it.
              Our philosophy is rooted in one core principle: skills lead to success.
            </p>
            <p className="text-muted leading-relaxed">
              That's why every program we design is outcome-driven, industry-aligned, and
              focused on unlocking real opportunities for real people.
            </p>
          </SlideIn>
        </div>
      </section>

      {/* Letter spine */}
      <section className="section-pad !pb-0">
        <Reveal>
          <span className="micro-label">What we stand for</span>
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] font-display font-semibold mt-3 mb-4">
            Five letters. <span className="serif-italic font-normal">One standard.</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-t border-line">
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

      {/* Mission & Vision */}
      <section className="section-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <div className="border-t border-line pt-8">
              <span className="micro-label">Vision</span>
              <p className="text-xl md:text-2xl font-display font-medium mt-4 leading-relaxed text-fg/80">
                To empower individuals with the practical skills, confidence, and support
                needed to excel in their careers — through innovative programs, expert
                mentorship, and real-world learning.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border-t border-line pt-8">
              <span className="micro-label">Mission</span>
              <p className="text-xl md:text-2xl font-display font-medium mt-4 leading-relaxed text-fg/80">
                To bridge the gap between education and employability by making skill-based,
                industry-relevant training accessible and impactful for every learner.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="section-pad min-h-[50vh] flex flex-col justify-center border-t border-line">
        <ScaleIn>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-display font-semibold leading-relaxed max-w-3xl">
            Whether you're aiming to grow professionally, break through barriers, or build
            something of your own —{' '}
            <span className="serif-italic font-normal">this is where it begins.</span>
          </h2>
        </ScaleIn>
      </section>
    </>
  );
}
