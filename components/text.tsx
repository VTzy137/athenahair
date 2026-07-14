import Link from "next/link";
import React from "react";

// Definitions for mapping keys to Tailwind CSS utility classes
const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const colorClasses = {
  primary: "text-primary",
  "primary-fg": "text-primary-foreground",
  secondary: "text-secondary",
  "secondary-fg": "text-secondary-foreground",
  muted: "text-muted-foreground",
  "muted-fg": "text-muted-foreground",
  accent: "text-accent",
  "accent-fg": "text-accent-foreground",
  foreground: "text-foreground",
};

const bgClasses = {
  none: "",
  primary: "bg-primary",
  secondary: "bg-secondary",
  muted: "bg-muted",
  accent: "bg-accent",
  background: "bg-background",
};

const weightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: keyof typeof sizeClasses;
  color?: keyof typeof colorClasses;
  bgColor?: keyof typeof bgClasses;
  weight?: keyof typeof weightClasses;
  className?: string;
  as?: React.ElementType;
}

/**
 * Helper to build class names from core configuration.
 */
function buildTextClasses({
  size,
  color,
  bgColor,
  weight,
  className = "",
  fallbackSize = "base",
  fallbackColor = "foreground",
  fallbackWeight = "normal",
}: {
  size?: keyof typeof sizeClasses;
  color?: keyof typeof colorClasses;
  bgColor?: keyof typeof bgClasses;
  weight?: keyof typeof weightClasses;
  className?: string;
  fallbackSize?: keyof typeof sizeClasses;
  fallbackColor?: keyof typeof colorClasses;
  fallbackWeight?: keyof typeof weightClasses;
}) {
  return [
    sizeClasses[size ?? fallbackSize],
    colorClasses[color ?? fallbackColor],
    bgColor && bgColor !== "none" ? bgClasses[bgColor] : "",
    weightClasses[weight ?? fallbackWeight],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * H1 - Large elegant hero title, typically for page headings.
 */
export function H1({
  children,
  size,
  color = "foreground",
  bgColor = "none",
  weight = "semibold",
  className = "",
  as: Component = "h1",
  ...props
}: TextProps) {
  // Use responsive default if no explicit size override is passed
  const sizeClass = size ? sizeClasses[size] : "text-3xl sm:text-4xl lg:text-5xl";
  const classes = [
    sizeClass,
    colorClasses[color],
    bgColor !== "none" ? bgClasses[bgColor] : "",
    weightClasses[weight],
    "tracking-tight",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

/**
 * H2 - Section level headers.
 */
export function H2({
  children,
  size,
  color = "foreground",
  bgColor = "none",
  weight = "medium",
  className = "",
  as: Component = "h2",
  ...props
}: TextProps) {
  // Use responsive default if no explicit size override is passed
  const sizeClass = size ? sizeClasses[size] : "text-2xl sm:text-3xl";
  const classes = [
    sizeClass,
    colorClasses[color],
    bgColor !== "none" ? bgClasses[bgColor] : "",
    weightClasses[weight],
    "tracking-tight",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

/**
 * H3 - Sub-section headers.
 */
export function H3({
  children,
  size,
  color = "foreground",
  bgColor = "none",
  weight = "medium",
  className = "",
  as: Component = "h3",
  ...props
}: TextProps) {
  // Use responsive default if no explicit size override is passed
  const sizeClass = size ? sizeClasses[size] : "text-xl sm:text-2xl";
  const classes = [
    sizeClass,
    colorClasses[color],
    bgColor !== "none" ? bgClasses[bgColor] : "",
    weightClasses[weight],
    "tracking-tight",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

/**
 * H4 - Small subheaders.
 */
export function H4({
  children,
  size = "lg",
  color = "foreground",
  bgColor = "none",
  weight = "medium",
  className = "",
  as: Component = "h4",
  ...props
}: TextProps) {
  const classes = buildTextClasses({
    size,
    color,
    bgColor,
    weight,
    className: `tracking-tight ${className}`,
    fallbackSize: "lg",
    fallbackColor: "foreground",
    fallbackWeight: "medium",
  });

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

/**
 * Body - Main readable paragraph text.
 */
export function Body({
  children,
  size = "base",
  color = "foreground",
  bgColor = "none",
  weight = "normal",
  className = "",
  as: Component = "p",
  ...props
}: TextProps) {
  const classes = buildTextClasses({
    size,
    color,
    bgColor,
    weight,
    className: `leading-relaxed ${className}`,
    fallbackSize: "base",
    fallbackColor: "foreground",
    fallbackWeight: "normal",
  });

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

/**
 * Detail - Small text for captions, metadata, summaries.
 */
export function Detail({
  children,
  size = "sm",
  color = "muted",
  bgColor = "none",
  weight = "normal",
  className = "",
  as: Component = "p",
  ...props
}: TextProps) {
  const classes = buildTextClasses({
    size,
    color,
    bgColor,
    weight,
    className: `leading-snug ${className}`,
    fallbackSize: "sm",
    fallbackColor: "muted",
    fallbackWeight: "normal",
  });

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

/**
 * Label - Uppercase form label or tiny tracking-wide indicator.
 */
export function Label({
  children,
  size = "xs",
  color = "muted",
  bgColor = "none",
  weight = "semibold",
  className = "",
  as: Component = "span",
  ...props
}: TextProps) {
  const classes = buildTextClasses({
    size,
    color,
    bgColor,
    weight,
    className: `uppercase tracking-wider ${className}`,
    fallbackSize: "xs",
    fallbackColor: "muted",
    fallbackWeight: "semibold",
  });

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

interface TextLinkProps extends TextProps {
  href: string;
  external?: boolean;
}

/**
 * TextLink - Styled interactive link, works with internal routes or external URLs.
 */
export function TextLink({
  children,
  href,
  external,
  size = "base",
  color, // Default is undefined to let custom link styles handle color, or can override
  bgColor = "none",
  weight,
  className = "",
  as, // Extract so it is not forwarded to Link/a
  ...props
}: TextLinkProps) {
  const baseClasses = `underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/60 transition-colors duration-200`;
  
  const classes = [
    sizeClasses[size],
    color ? colorClasses[color] : "text-foreground/75 hover:text-foreground",
    bgColor !== "none" ? bgClasses[bgColor] : "",
    weight ? weightClasses[weight] : "",
    baseClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
