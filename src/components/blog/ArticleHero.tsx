import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleImage from "@/components/blog/ArticleImage";

type ArticleHeroProps = {
  title: string;
  subtitle: string;
  date: string;
  author?: string;
  coverImage?: string;
};

export default function ArticleHero({ title, subtitle, date, author, coverImage }: ArticleHeroProps) {
  return (
    <section className="pb-4">
      {coverImage ? (
        <ArticleImage
          src={coverImage}
          alt={title}
          className="mx-auto h-[260px] w-full max-w-6xl overflow-hidden border-b border-white/10 sm:h-[360px] lg:h-[460px]"
        />
      ) : null}
      <ArticleHeader title={title} subtitle={subtitle} date={date} author={author} />
    </section>
  );
}
