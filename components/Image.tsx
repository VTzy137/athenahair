import NextImage from "next/image";
import { IMAGES } from "@/lib/constants/image";

export function Img({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
  priority = false,
}: {
  src: (typeof IMAGES)[keyof typeof IMAGES];
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

// Usage examples:
// <Img src={IMAGES.girlHair} alt="Girl hair" width={400} height={300} />
// <Img src={IMAGES.girlHair} alt="Girl hair" fill className="object-cover" />
