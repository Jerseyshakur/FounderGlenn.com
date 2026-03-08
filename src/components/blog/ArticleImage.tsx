type ArticleImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function ArticleImage({ src, alt, className }: ArticleImageProps) {
  if (!src) {
    return null;
  }

  return (
    <div className={className}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
