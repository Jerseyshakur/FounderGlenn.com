import type { ReactNode } from "react";
import type { FunnelAction } from "@/components/funnel/types";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function sectionClassName(className?: string): string {
  return `rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10${className ? ` ${className}` : ""}`;
}

export function FunnelSection({ children, className }: SectionProps) {
  return <section className={sectionClassName(className)}>{children}</section>;
}

export function FunnelSectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  return (
    <header className={alignment}>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl text-zinc-300">{description}</p> : null}
    </header>
  );
}

type ActionButtonProps = {
  action: FunnelAction;
  variant?: "primary" | "secondary";
  className?: string;
};

const PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-full border border-white/20 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200";
const SECONDARY_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black";

export function FunnelActionButton({ action, variant = "primary", className = "" }: ActionButtonProps) {
  const toneClass = variant === "primary" ? PRIMARY_BUTTON_CLASS : SECONDARY_BUTTON_CLASS;
  const composedClass = `${toneClass} ${className}`.trim();

  if (action.type === "link") {
    const rel = action.external ? "noreferrer" : undefined;
    const target = action.external ? "_blank" : undefined;
    return (
      <a
        href={action.href}
        rel={rel}
        target={target}
        className={composedClass}
        data-analytics-cta="1"
        data-analytics-label={action.label}
        data-analytics-destination={action.href}
        data-analytics-context="funnel-action"
      >
        {action.label}
      </a>
    );
  }

  if (action.type === "open-cart") {
    return (
      <button
        type="button"
        data-shopify-action="open-cart"
        className={composedClass}
        data-analytics-cta="1"
        data-analytics-label={action.label}
        data-analytics-destination="cart_modal"
        data-analytics-context="funnel-action"
      >
        {action.label}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-shopify-action={action.type === "shopify-add" ? "add-line" : "buy-now"}
      data-shopify-variant-id={action.variantId}
      data-shopify-product-handle={action.productHandle}
      data-shopify-product-title={action.productTitle}
      data-shopify-product-category={action.productCategory}
      data-shopify-price={action.priceAmount}
      data-shopify-currency={action.priceCurrencyCode}
      data-analytics-cta="1"
      data-analytics-label={action.label}
      data-analytics-context="funnel-action"
      className={composedClass}
    >
      {action.label}
    </button>
  );
}
