"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { nav } from "@/lib/nav";
import { site, whatsappLink } from "@/lib/site";

const short: Record<string, string> = {
  "University Admissions": "Admissions",
  "Pathway Programmes": "Pathways",
  "Corporate Training": "Corporate",
  "Online Programmes": "Online Courses",
};

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  return (
    <header className={`sticky top-0 z-50 bg-white border-b transition-shadow ${scrolled ? "border-transparent shadow-[0_8px_30px_-12px_rgba(35,31,32,0.25)]" : "border-line"}`}>
      <div className="hidden md:block bg-ink text-white/85 text-sm">
        <div className="container-x flex items-center justify-between h-9">
          <p>Recognised qualifications and job-ready skills — online across Oman and the GCC</p>
          <div className="flex items-center gap-5">
            <a href={site.contact.phoneHref} className="hover:text-white">{site.contact.phoneDisplay}</a>
            <a href={`mailto:${site.contact.email}`} className="hover:text-white">{site.contact.email}</a>
          </div>
        </div>
      </div>

      <div ref={navRef} className="container-x relative flex items-center justify-between gap-4 h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const active = isActive(item.href);
              if (!item.groups) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap px-3 py-2 rounded-full text-[0.95rem] font-medium transition-colors ${active ? "bg-mist text-sky-deep" : "hover:bg-mist"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = openMenu === item.label;
              const wide = item.groups.length > 3;
              return (
                <li key={item.label} onMouseEnter={() => open(item.label)} onMouseLeave={scheduleClose}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`menu-${item.href.slice(1)}`}
                    onClick={() => (isOpen ? setOpenMenu(null) : open(item.label))}
                    className={`inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 rounded-full text-[0.95rem] font-medium transition-colors ${active || isOpen ? "bg-mist text-sky-deep" : "hover:bg-mist"}`}
                  >
                    {short[item.label] || item.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div
                    id={`menu-${item.href.slice(1)}`}
                    hidden={!isOpen}
                    className={`absolute top-full mt-px rounded-b-panel bg-white shadow-[0_30px_60px_-20px_rgba(35,31,32,0.35)] ring-1 ring-line ${wide ? "left-4 right-4" : "left-1/2 -translate-x-1/2 w-[46rem]"}`}
                  >
                    <div className="grid grid-cols-12">
                      <div className="col-span-4 bg-mist p-7 rounded-bl-panel">
                        <p className="font-display text-xl font-semibold">{item.label}</p>
                        <p className="mt-2 text-stone">{item.intro}</p>
                        <Link href={item.href} className="link mt-4 inline-block">Overview</Link>
                        {item.cta && (
                          <Link href={item.cta.href} className="btn btn-dark mt-6 w-full whitespace-normal text-center">{item.cta.label}</Link>
                        )}
                      </div>
                      <div className={`col-span-8 grid gap-6 p-7 ${wide ? "grid-cols-3" : "grid-cols-2"}`}>
                        {item.groups.map((g, gi) => (
                          <div key={gi}>
                            {g.heading?.trim() ? (
                              <p className="text-sm font-semibold text-sky-deep">{g.heading}</p>
                            ) : (
                              <p className="text-sm" aria-hidden="true">&nbsp;</p>
                            )}
                            <ul className="mt-2 space-y-0.5">
                              {g.links.map((l) => (
                                <li key={l.label}>
                                  <Link href={l.href} className="block rounded-lg px-2 py-1.5 -mx-2 hover:bg-mist hover:text-sky-deep">
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-primary hidden sm:inline-flex">Get free advice</Link>
          <button
            type="button"
            className="xl:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-line"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {mobileOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="xl:hidden fixed inset-x-0 top-[4.5rem] md:top-[6.75rem] bottom-0 bg-white overflow-y-auto">
          <nav aria-label="Mobile" className="container-x py-4 flex flex-col">
            {nav.map((item) =>
              item.groups ? (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((e) => (e === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between py-4 font-display text-xl font-semibold"
                  >
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`}>
                      <path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                  {expanded === item.label && (
                    <div className="pb-4">
                      <Link href={item.href} className="block py-2 font-semibold text-sky-deep">Overview</Link>
                      {item.groups.flatMap((g) => g.links).map((l, i) => (
                        <Link key={`${l.label}-${i}`} href={l.href} className="block py-2 text-stone">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="py-4 border-b border-line font-display text-xl font-semibold">
                  {item.label}
                </Link>
              )
            )}
            <Link href="/contact" className="py-4 border-b border-line font-display text-xl font-semibold">Contact</Link>
            <div className="mt-8 grid gap-3">
              <Link href="/contact" className="btn btn-primary">Get free advice</Link>
              <a href={whatsappLink("Hello MHEC, I would like to know more about your programmes.")} className="btn btn-dark">Chat on WhatsApp</a>
              <a href={site.contact.phoneHref} className="btn btn-outline">Call {site.contact.phoneDisplay}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
