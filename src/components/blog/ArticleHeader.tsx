function formatDate(dateValue: string) {
  if (!dateValue) {
    return "Date unavailable";
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type ArticleHeaderProps = {
  title: string;
  subtitle: string;
  date: string;
  author?: string;
};

export default function ArticleHeader({ title, subtitle, date, author = "Founder Glenn" }: ArticleHeaderProps) {
  return (
    <header className="mx-auto mt-10 w-full max-w-4xl px-6 md:mt-14">
      <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">{subtitle}</p>

      <div className="mt-7 border-t border-white/15 pt-5">
        <p className="text-sm font-medium text-zinc-200">By {author}</p>
        <p className="mt-1 text-sm text-zinc-500">Published: {formatDate(date)}</p>
      </div>
    </header>
  );
}
