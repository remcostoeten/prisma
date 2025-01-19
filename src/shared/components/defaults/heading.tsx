/**
 * @author Remco Stoeten
 * @description A comprehensive component to place headings `<h1 - h6`> in your component.
 */

import React, { CSSProperties, ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type HeadingWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type HeadingAlign = 'left' | 'center' | 'right' | 'justify';
type HeadingColor = 'default' | 'sub' | 'muted' | 'disabled' | 'brand';
type GradientType = 'default' | 'fade-to-background' | 'none';

interface HeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: HeadingColor;
  align?: HeadingAlign;
  gradient?: GradientType;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<HeadingSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
};

const weightMap: Record<HeadingWeight, number> = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const colorMap: Record<HeadingColor, string> = {
  default: 'rgb(222, 222, 222)',
  sub: 'rgb(190, 190, 190)',
  muted: 'rgb(137, 137, 137)',
  disabled: 'rgb(57, 57, 57)',
  brand: 'rgb(62, 207, 142)',
};

const bodyColor = '#1c1c1c';

/**
 * Heading component for rendering headings with various styles and gradient options.
 *
 * @param {HeadingProps} props - The properties for the Heading component.
 * @param {ReactNode} props.children - The content to be rendered within the Heading component.
 * @param {HeadingLevel} [props.level='h1'] - The heading level (h1-h6).
 * @param {HeadingSize} [props.size='2xl'] - The size of the heading.
 * @param {HeadingWeight} [props.weight='bold'] - The weight of the heading.
 * @param {HeadingColor} [props.color='default'] - The color of the heading.
 * @param {HeadingAlign} [props.align] - The alignment of the heading.
 * @param {GradientType} [props.gradient='none'] - The type of gradient to apply to the heading.
 * @param {string} [props.className] - Additional CSS classes to apply to the heading.
 * @param {CSSProperties} [props.style] - Additional inline styles to apply to the heading.
 * @returns {JSX.Element} The rendered Heading component.
 */
function Heading({
  children,
  level = 'h1',
  size = '2xl',
  weight = 'bold',
  color = 'default',
  align,
  gradient = 'none',
  className = '',
  style = {},
  ...props
}: HeadingProps): JSX.Element {
  const Component = level;

  const headingStyle: CSSProperties = {
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight],
    color: colorMap[color],
    textAlign: align,
    ...style,
  };

  if (gradient === 'default') {
    headingStyle.backgroundImage = `linear-gradient(to right, ${colorMap.default}, ${colorMap.muted})`;
    headingStyle.WebkitBackgroundClip = 'text';
    headingStyle.WebkitTextFillColor = 'transparent';
  } else if (gradient === 'fade-to-background') {
    headingStyle.backgroundImage = `linear-gradient(to right, ${colorMap[color]}, ${bodyColor})`;
    headingStyle.WebkitBackgroundClip = 'text';
    headingStyle.WebkitTextFillColor = 'transparent';
  }

  return (
    <Component className={`heading ${className}`} style={headingStyle} {...props}>
      {children}
    </Component>
  );
}

export default Heading;

