"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "./Photo";
import type { PhotoKey } from "@/lib/media";

export type Slide = {
  label: string;
  title: string;
  body: string;
  image: PhotoKey;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

const SLIDE_MS = 7000;

export default function HeroBanner({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const running = playing && !hovered && !reduced;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate overflow-hidden bg-ink text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="relative min-h-[40rem] h-[calc(100svh-6.75rem)] max-h-[48rem]">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.label}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <div className={`absolute inset-0 ${active && !reduced ? "kenburns" : ""}`}>
                <Photo name={s.image} fill priority={i === 0} sizes="100vw" />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,31,32,0.92)_0%,rgba(35,31,32,0.78)_38%,rgba(35,31,32,0.25)_75%,rgba(35,31,32,0.1)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent" />

              <div className="container-x relative flex h-full flex-col justify-center pt-10 pb-32">
                <div className={`max-w-[44rem] ${active ? "slide-in" : ""}`}>
                  <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-sky-light ring-1 ring-white/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />
                    {s.label}
                  </p>
                  {i === 0 ? (
                    <h1 className="mt-5 text-banner">{s.title}</h1>
                  ) : (
                    <h2 className="mt-5 text-banner">{s.title}</h2>
                  )}
                  <p className="mt-5 max-w-[50ch] text-lg text-white/85">{s.body}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={s.primary.href} className="btn btn-primary">
                      {s.primary.label}
                    </Link>
                    {s.secondary && (
                      <Link href={s.secondary.href} className="btn btn-outline text-white">
                        {s.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="container-x pb-6">
            <div className="flex items-end gap-3">
              <div role="tablist" aria-label="Choose a slide" className="grid flex-1 grid-cols-5 gap-2 sm:gap-4">
                {slides.map((s, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={s.label}
                      role="tab"
                      aria-selected={active}
                      aria-label={s.label}
                      onClick={() => go(i)}
                      className="group text-left"
                    >
                      <span className="block h-1 overflow-hidden rounded-full bg-white/25">
                        <span
                          key={`${index}-${i}`}
                          className={`block h-full rounded-full bg-sky ${active ? (reduced ? "w-full" : "progress-run") : i < index ? "w-full" : "w-0"}`}
                          style={active && !reduced ? { animationDuration: `${SLIDE_MS}ms`, animationPlayState: running ? "running" : "paused" } : undefined}
                          onAnimationEnd={active ? () => go(index + 1) : undefined}
                        />
                      </span>
                      <span className={`mt-2 hidden text-sm font-semibold md:block ${active ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => go(index - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 hover:bg-white/20" aria-label="Previous slide">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => setPlaying((p) => !p)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 hover:bg-white/20" aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
                  {playing && !reduced ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2v10M10 2v10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 2l8 5-8 5z" fill="currentColor" /></svg>
                  )}
                </button>
                <button type="button" onClick={() => go(index + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/25 hover:bg-white/20" aria-label="Next slide">
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
