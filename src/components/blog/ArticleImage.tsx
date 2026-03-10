import Image from "next/image";

type ArticleImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
};

export default function ArticleImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 920px",
}: ArticleImageProps) {
  if (!src) {
    return null;
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized
        className="h-full w-full object-cover"
      />
    </div>
  );
}
