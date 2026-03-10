"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { NAV_ITEMS } from "@/content/navigation";
import { ShopifyCartButton } from "@/components/shopify/ShopifyRuntime";
import { seoConfig } from "@/lib/seo";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function socialLabel(url: string): string {
  if (url.includes("x.com")) return "X";
  if (url.includes("tiktok.com")) return "TikTok";
  if (url.includes("youtube.com")) return "YouTube";
  return "Profile";
}

export default function SiteNavDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-controls={drawerId}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="fixed left-4 top-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span
            className={`absolute left-0 top-0 h-[2px] w-5 bg-white transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[7px] h-[2px] w-5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute left-0 top-[14px] h-[2px] w-5 bg-white transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </span>
      </button>
      <ShopifyCartButton className="fixed right-4 top-4 z-[70] inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-black/45 px-4 text-xs font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" />

      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id={drawerId}
        aria-hidden={!open}
        className={`fixed left-0 top-0 z-[65] flex h-screen w-[min(90vw,380px)] flex-col overflow-hidden border-r border-white/10 bg-[#0f0f0f]/95 px-6 pb-6 pt-20 text-zinc-100 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Store</p>
          <ShopifyCartButton className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-black" />
        </div>
        <div className="site-nav-scroll min-h-0 flex-1 overflow-y-auto pr-1">
          <nav className="space-y-1" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-sm font-semibold text-white">Founder Glenn</p>
            <p className="mt-1 text-xs text-zinc-400">Shakur Raqon Ziyār Glenn</p>
            <p className="mt-3 text-sm text-zinc-300">I build systems for creators.</p>

            <div className="mt-4 flex flex-wrap gap-2 pb-1">
              {seoConfig.person.sameAs.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  {socialLabel(url)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
