type ArticleBodyProps = {
  html: string;
};

export default function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <section className="mx-auto mt-14 w-full max-w-3xl px-6">
      <div className="editorial-body" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
