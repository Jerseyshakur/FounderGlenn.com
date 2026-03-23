"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV_ITEMS } from "@/content/navigation";
import { ShopifyCartButton } from "@/components/shopify/ShopifyRuntime";
import { seoConfig } from "@/lib/seo";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isNexusBodyOSRoute(pathname: string): boolean {
  const p = pathname.toLowerCase();
  return p === "/nexusbodyos" || p.startsWith("/nexusbodyos/");
}

function socialLabel(url: string): string {
  if (url.includes("x.com")) return "X";
  if (url.includes("tiktok.com")) return "TikTok";
  if (url.includes("youtube.com")) return "YouTube";
  return "Profile";
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selectors)).filter(
    (node) => !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true",
  );
}

export default function SiteNavDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const drawerLabelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const drawerNode = drawerRef.current;
    if (!drawerNode) return;

    const focusables = getFocusableElements(drawerNode);
    const initialFocus = focusables[0] ?? drawerNode;
    initialFocus.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const currentFocusables = getFocusableElements(drawerNode);
      if (currentFocusables.length === 0) {
        event.preventDefault();
        drawerNode.focus();
        return;
      }

      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !drawerNode.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !drawerNode.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
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
      {isNexusBodyOSRoute(pathname) ? (
        <Link
          href="/NexusBodyOS"
          className="fixed left-[4.25rem] top-4 z-[70] inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/45 shadow-[0_0_24px_rgba(56,189,248,0.12)] backdrop-blur-md transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Nexus BodyOS"
        >
          {/* App icon — aligned with watch/iOS BodyOS branding; keep in sync with APPS nexus iconSrc. */}
          <img
            src="/images/nexus-bodyos-app-icon.svg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 object-cover"
            decoding="async"
          />
        </Link>
      ) : null}
      <ShopifyCartButton className="fixed right-4 top-4 z-[70] inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-black/45 px-4 text-xs font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40" />

      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={drawerLabelId}
        aria-hidden={!open}
        tabIndex={-1}
        className={`fixed left-0 top-0 z-[65] flex h-screen w-[min(90vw,380px)] flex-col overflow-hidden border-r border-white/10 bg-[#0f0f0f]/95 px-6 pb-6 pt-20 text-zinc-100 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 id={drawerLabelId} className="sr-only">
          Site navigation menu
        </h2>
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
