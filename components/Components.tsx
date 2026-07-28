import React from 'react';
import { cn } from '@/lib/utils';

// Helper maps for layout props
const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
} as const;

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
} as const;

const sectionPaddingMap = {
  none: 'py-0',
  sm: 'py-4 md:py-6',
  md: 'py-8 md:py-12',
  lg: 'py-12 md:py-16',
  xl: 'py-16 md:py-24',
} as const;

const gridColsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-12',
};

// Base Layout Component Props
export interface BaseLayoutProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export interface FlexLayoutProps extends BaseLayoutProps {
  align?: keyof typeof alignMap;
  justify?: keyof typeof justifyMap;
  gap?: string | number;
  wrap?: boolean;
}

/**
 * Row - Horizontal flex layout container (`flex-row`)
 */
export const Row = ({
  children,
  className = '',
  align,
  justify,
  gap,
  wrap = false,
  as: Component = 'div',
  style,
  ...props
}: FlexLayoutProps) => {
  const gapStyle = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;

  return (
    <Component
      className={cn(
        'flex flex-row',
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        className
      )}
      style={{ ...(gapStyle ? { gap: gapStyle } : {}), ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Column - Vertical flex layout container (`flex-col`)
 */
export const Column = ({
  children,
  className = '',
  align,
  justify,
  gap,
  as: Component = 'div',
  style,
  ...props
}: FlexLayoutProps) => {
  const gapStyle = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;

  return (
    <Component
      className={cn(
        'flex flex-col',
        align && alignMap[align],
        justify && justifyMap[justify],
        className
      )}
      style={{ ...(gapStyle ? { gap: gapStyle } : {}), ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface ContainerProps extends BaseLayoutProps {
  maxWidth?: keyof typeof maxWidthMap;
  padding?: boolean;
  centered?: boolean;
}

/**
 * Container - Max-width wrapper with responsive horizontal padding & auto margins
 */
export const Container = ({
  children,
  className = '',
  maxWidth = '7xl',
  padding = true,
  centered = true,
  as: Component = 'div',
  ...props
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        'w-full',
        maxWidthMap[maxWidth],
        centered && 'mx-auto',
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface SectionProps extends BaseLayoutProps {
  padding?: keyof typeof sectionPaddingMap;
}

/**
 * Section - Semantic section container with vertical padding
 */
export const Section = ({
  children,
  className = '',
  padding = 'md',
  as: Component = 'section',
  ...props
}: SectionProps) => {
  return (
    <Component
      className={cn('w-full', sectionPaddingMap[padding], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface GridProps extends BaseLayoutProps {
  cols?: number | string;
  gap?: string | number;
}

/**
 * Grid - Responsive CSS Grid layout container
 */
export const Grid = ({
  children,
  className = '',
  cols = 3,
  gap,
  as: Component = 'div',
  style,
  ...props
}: GridProps) => {
  const colClass = typeof cols === 'number' ? gridColsMap[cols] || `grid-cols-${cols}` : cols;
  const gapStyle = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;

  return (
    <Component
      className={cn('grid', colClass, className)}
      style={{ ...(gapStyle ? { gap: gapStyle } : {}), ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Stack - Vertical column with uniform spacing between child elements
 */
export const Stack = ({
  children,
  className = '',
  gap = 4,
  ...props
}: FlexLayoutProps) => {
  return (
    <Column className={className} gap={gap} {...props}>
      {children}
    </Column>
  );
};

/**
 * Center - Utility component for absolute horizontal and vertical centering
 */
export const Center = ({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: BaseLayoutProps) => {
  return (
    <Component
      className={cn('flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface DividerProps extends BaseLayoutProps {
  orientation?: 'horizontal' | 'vertical';
  label?: React.ReactNode;
}

/**
 * Divider - Horizontal or vertical divider with optional inline text/label
 */
export const Divider = ({
  children,
  className = '',
  orientation = 'horizontal',
  label,
  as: Component = 'div',
  ...props
}: DividerProps) => {
  if (orientation === 'vertical') {
    return (
      <Component
        className={cn('inline-block h-full w-[1px] bg-gray-200 dark:bg-gray-800 self-stretch', className)}
        {...props}
      />
    );
  }

  if (label || children) {
    return (
      <Component className={cn('flex items-center w-full my-4', className)} {...props}>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-800" />
        <span className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label || children}
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-800" />
      </Component>
    );
  }

  return (
    <Component
      className={cn('w-full border-t border-gray-200 dark:border-gray-800 my-4', className)}
      {...props}
    />
  );
};