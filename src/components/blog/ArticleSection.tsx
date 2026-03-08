type ArticleSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function ArticleSection({ title, children }: ArticleSectionProps) {
  return (
    <section className="mt-14">
      <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="mt-5 space-y-6 text-lg leading-8 text-zinc-200">{children}</div>
    </section>
  );
}
