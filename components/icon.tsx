import Image from "next/image";
import { ICONS } from "@/lib/constants/icon";

export default function Icon({
  src,
  alt,
  width = 24,
  height = 24,
}: {
  src: (typeof ICONS)[keyof typeof ICONS];
  alt: string;
  width?: number;
  height?: number;
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