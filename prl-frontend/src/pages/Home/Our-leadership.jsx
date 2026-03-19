import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap"
    rel="stylesheet"
  />
);

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const ExpandBlock = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const CompactFounderJourney = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <>
      <FontLink />
      <style>{`
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-outfit     { font-family: 'Outfit', sans-serif; }

        /* Decorative corner frame — 4 corner brackets */
        .img-frame-corners::before,
        .img-frame-corners::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          z-index: 20;
          pointer-events: none;
        }
        .img-frame-corners::before {
          top: 10px; left: 10px;
          border-top: 2px solid #b84a2e;
          border-left: 2px solid #b84a2e;
        }
        .img-frame-corners::after {
          bottom: 10px; right: 10px;
          border-bottom: 2px solid #b84a2e;
          border-right: 2px solid #b84a2e;
        }
        .img-frame-corners-2::before,
        .img-frame-corners-2::after {
          content: '';
          position: absolute;
          width: 28px;
          height: 28px;
          z-index: 20;
          pointer-events: none;
        }
        .img-frame-corners-2::before {
          top: 10px; right: 10px;
          border-top: 2px solid #b84a2e;
          border-right: 2px solid #b84a2e;
        }
        .img-frame-corners-2::after {
          bottom: 10px; left: 10px;
          border-bottom: 2px solid #b84a2e;
          border-left: 2px solid #b84a2e;
        }

        /* Outer gold border frame */
        .img-outer-frame {
          position: relative;
          padding: 10px;
          background: #f5f0e8;
        }
        .img-outer-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid #ddd5c8;
          pointer-events: none;
          z-index: 5;
        }
        .img-outer-frame::after {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid #c9a87c;
          pointer-events: none;
          z-index: 5;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="font-outfit bg-[#f5f0e8] py-12 px-4 flex items-start justify-center"
      >
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] relative items-start">
            {/* ══════════════════════
                LEFT — IMAGE (STICKY)
            ══════════════════════ */}
            <motion.div
              /* KEY FIX: overflow-visible + self-start so sticky works correctly
                 and image is never clipped by parent overflow:hidden */
              className="md:sticky md:top-8 self-start"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer decorative frame wrapper */}
              <div className="img-outer-frame">
                {/* Corner brackets layer 1 (top-left, bottom-right) */}
                <div className="img-frame-corners relative">
                  {/* Corner brackets layer 2 (top-right, bottom-left) */}
                  <div className="img-frame-corners-2 relative">
                    {/* Actual image box — fixed aspect ratio */}
                    <div className="relative overflow-hidden bg-[#1a1410] w-full aspect-[4/5]">
                      <img
                        src="/assets/extra-img/rajesh-parida.jpeg"
                        alt="Rajesh Kumar Parida"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />

                      {/* Dark gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(26,20,16,0.92) 0%, rgba(26,20,16,0.3) 50%, transparent 100%)",
                        }}
                      />

                      {/* Shimmer top line */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b84a2e] to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                        transition={{
                          delay: 0.6,
                          duration: 0.9,
                          ease: "easeOut",
                        }}
                      />

                      {/* Name / title overlay */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.65,
                          delay: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <motion.div
                          className="inline-flex items-center gap-2 mb-2.5"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ delay: 0.5, duration: 0.4 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b84a2e] shrink-0" />
                          <span className="text-[9px] tracking-[0.22em] uppercase text-[#d4b896] font-medium">
                            Managing Director · PRL
                          </span>
                        </motion.div>

                        <h3 className="font-cormorant text-[28px] font-bold text-white leading-tight mb-1">
                          Rajesh Kumar
                          <br />
                          Parida
                        </h3>
                        <p className="text-[9px] tracking-[0.18em] uppercase text-[#b84a2e] font-semibold">
                          Founder &amp; Visionary
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical divider (desktop only) */}
              <div
                className="hidden md:block absolute top-0 right-0 w-px"
                style={{
                  bottom: 0,
                  background:
                    "linear-gradient(to bottom, transparent, #ddd5c8 15%, #ddd5c8 85%, transparent)",
                }}
              />
            </motion.div>

            {/* ══════════════════════
                RIGHT — CONTENT
            ══════════════════════ */}
            <motion.div
              className="flex flex-col px-4 py-9 md:px-11"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
            >
              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-6 h-0.5 bg-[#b84a2e] shrink-0" />
                <span className="text-[9px] tracking-[0.28em] uppercase text-[#b84a2e] font-semibold">
                  Founder's Story
                </span>
              </motion.div>

              {/* Pull quote */}
              <motion.p
                variants={fadeUp}
                className="font-cormorant text-[21px] italic text-[#1a1410] leading-snug mb-5 pb-5 border-b border-[#ddd5c8]"
              >
                "Every success story has a beginning.
                <br />
                Every company founder has a story."
              </motion.p>

              {/* Intro */}
              <motion.p
                variants={fadeUp}
                className="text-[14px] text-[#7a6e64] leading-relaxed font-light mb-7"
              >
                Mine began in a small corner of{" "}
                <strong className="text-[#1a1410] font-medium">Odisha</strong>.
                After finishing my engineering studies, I started this journey
                with a heart full of dreams and pockets completely empty. There
                was no money, no support, and no clear path — only
                determination.
              </motion.p>

              {/* Toggle Button */}
              <motion.button
                variants={fadeUp}
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative inline-flex items-center gap-3 self-start overflow-hidden border border-[#b84a2e] px-5 py-2.5 cursor-pointer bg-transparent"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 bg-[#b84a2e] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <span className="relative z-10 text-[9px] font-semibold tracking-[0.25em] uppercase text-[#b84a2e] group-hover:text-white transition-colors duration-200">
                  {isExpanded ? "Show Less" : "Read My Full Journey"}
                </span>
                <motion.span
                  className="relative z-10 text-[9px] text-[#b84a2e] group-hover:text-white transition-colors duration-200"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-7 pt-7 border-t border-[#ddd5c8] flex flex-col gap-5">
                      <ExpandBlock delay={0.05}>
                        <p className="text-[13.5px] text-[#7a6e64] leading-relaxed font-light">
                          The early days were filled with challenges that tested
                          both my body and spirit. There were nights I worked
                          without sleep, and days I survived without food. There
                          were moments when negativity surrounded me, people
                          doubted me, and circumstances pushed me to give up.
                          <strong className="block mt-2.5 text-[#8c3520] font-semibold italic">
                            But I survived — only because of one thing:
                            determination to change my life and create something
                            meaningful.
                          </strong>
                        </p>
                      </ExpandBlock>

                      <ExpandBlock delay={0.1}>
                        <div className="border border-[#ddd5c8] border-l-[3px] border-l-[#b84a2e] bg-white px-5 py-5">
                          <div className="text-[8px] tracking-[0.3em] uppercase text-[#b84a2e] font-semibold mb-3">
                            A Life of Extreme Hardship · Delhi
                          </div>
                          <ul className="flex flex-col gap-2">
                            {[
                              "Walked 30 km because I didn't even have ₹10 for a ticket.",
                              "Survived 4 days without food, fighting hunger and loneliness.",
                              "Body collapsed due to vitamin deficiency — I became paralysed.",
                              "Admitted myself to the hospital… completely alone.",
                              "Slept on the cold winter ground without any bedsheet or pillow.",
                              "Faced betrayal from people I trusted, again and again.",
                              "Couldn't go back home because returning meant giving up on my dreams.",
                            ].map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 0.15 + i * 0.06,
                                  duration: 0.35,
                                }}
                                className="text-[12.5px] text-[#5a5050] font-light italic pl-4 relative leading-snug before:content-['›'] before:absolute before:left-0 before:text-[#b84a2e] before:not-italic before:font-bold"
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </ExpandBlock>

                      <ExpandBlock delay={0.18}>
                        <div className="relative bg-[#1a1410] px-6 py-6 overflow-hidden">
                          <span className="font-cormorant absolute top-[-16px] left-3 text-[130px] leading-none text-[#b84a2e] opacity-[0.13] pointer-events-none select-none">
                            &ldquo;
                          </span>
                          <div className="text-[9px] tracking-[0.22em] uppercase text-[#b84a2e] font-semibold mb-3">
                            The Kambal (Blanket) Moment
                          </div>
                          <p className="font-cormorant text-[15.5px] italic text-[#ede5d8] leading-relaxed relative z-10">
                            "I bought a blanket with my own money. That day was
                            the happiest day of my life. Not because it was just
                            a blanket — but because for the first time, I felt I
                            had won against life. I felt safe. I felt strong. My
                            struggle was turning into strength."
                          </p>
                        </div>
                      </ExpandBlock>

                      <ExpandBlock delay={0.24}>
                        <h5 className="font-cormorant text-[17px] text-[#1a1410] font-semibold mb-2">
                          Turning Pain into Purpose
                        </h5>
                        <p className="text-[13.5px] text-[#7a6e64] font-light leading-relaxed">
                          When there was no one beside me, courage became my
                          partner. When the world doubted me, self-belief became
                          my strength. When I had no resources, determination
                          became my fuel. Slowly, I started working… learning…
                          building… failing… and rising again.
                        </p>
                      </ExpandBlock>

                      <ExpandBlock delay={0.3}>
                        <div className="relative bg-[#b84a2e] px-6 py-6 overflow-hidden">
                          <span className="font-cormorant absolute right-[-8px] bottom-[-20px] text-[88px] font-bold text-white/[0.06] leading-none pointer-events-none select-none tracking-tighter">
                            PRL
                          </span>
                          <h5 className="font-cormorant text-[21px] font-bold text-white mb-2">
                            The Birth of PRL
                          </h5>
                          <p className="text-[12.5px] text-white/70 font-light leading-relaxed mb-4">
                            PRL – Parida Red Lion India Pvt. Ltd. was created in
                            pain, hunger, and silent tears. Today, we are
                            India's leading manufacturers in uPVC &amp; Aluminum
                            Machine Industry.
                          </p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              "✓ 28,000 sq. ft. Plant",
                              "✓ 50+ Employees",
                              "✓ 500+ PAN India Clients",
                              "✓ Advanced Tool Room",
                            ].map((stat) => (
                              <div
                                key={stat}
                                className="bg-white/10 border border-white/15 px-3 py-2 text-[10px] font-semibold tracking-wide text-white uppercase"
                              >
                                {stat}
                              </div>
                            ))}
                          </div>
                          <p className="mt-3 text-[10px] italic text-white/40">
                            Every machine we deliver carries technology and a
                            part of my journey.
                          </p>
                        </div>
                      </ExpandBlock>

                      <ExpandBlock delay={0.36}>
                        <h5 className="font-cormorant text-[17px] text-[#1a1410] font-semibold mb-3">
                          Our Core Values
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "Innovation",
                            "Customer Delight",
                            "Sustainability",
                            "Excellence",
                            "Global Reach",
                          ].map((v, i) => (
                            <motion.span
                              key={v}
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: 0.4 + i * 0.06,
                                duration: 0.3,
                              }}
                              className="border border-[#ddd5c8] bg-white text-[#7a6e64] text-[9px] font-medium tracking-[0.1em] uppercase px-3 py-1.5"
                            >
                              {v}
                            </motion.span>
                          ))}
                        </div>
                      </ExpandBlock>

                      <ExpandBlock delay={0.42}>
                        <div className="bg-[#ede5d8] border border-[#ddd5c8] px-6 py-5 text-center">
                          <p className="text-[9px] tracking-[0.22em] uppercase text-[#7a6e64] mb-3">
                            Message from the Founder
                          </p>
                          <blockquote className="font-cormorant text-[18px] italic text-[#1a1410] leading-snug">
                            "If I can rise from nothing — you can rise too.
                            <br />
                            It's your time."
                          </blockquote>
                        </div>
                      </ExpandBlock>

                      <ExpandBlock delay={0.48}>
                        <p className="text-[11px] text-[#7a6e64] text-center pt-4 border-t border-[#ddd5c8] font-light tracking-[0.04em]">
                          From nothing to something — this is our story. And it
                          has only just begun.
                        </p>
                      </ExpandBlock>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompactFounderJourney;
