import Image from "next/image";
import { ICONS } from "@/lib/constants/icon";

export function Icon({
  src,
  alt,
  width = 24,
  height = 24,
  className = "",
}: {
  src: (typeof ICONS)[keyof typeof ICONS];
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const iconSrc = typeof src === "string" ? src : src.src;

  return (
    <span
      className={`inline-block bg-current ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        maskImage: `url(${iconSrc})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url(${iconSrc})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
      }}
      role="img"
      aria-label={alt}
    />
  );
}

export function IconImage({
  src,
  alt,
  width = 24,
  height = 24,
  className = "",
}: {
  src: (typeof ICONS)[keyof typeof ICONS];
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

// <IconImage src={ICONS.globe} alt="globe" width={20} height={20} />
