/**
 * @author Remco Stoeten
 * @description A comprehensive component used to place text, this should be used instead of a `<p>` where possible.
 */

import React, { CSSProperties, ReactNode } from 'react';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
type TextColor = 'default' | 'sub' | 'muted' | 'disabled' | 'brand';

interface TextProps {
  children: ReactNode;
  size?: TextSize | number;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;
  transform?: TextTransform;
  decoration?: 'none' | 'underline' | 'line-through';
  lineHeight?: number | string;
  letterSpacing?: number | string;
  truncate?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<TextSize, string> = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
};

const weightMap: Record<TextWeight, number> = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

const colorMap: Record<TextColor, string> = {
  default: 'rgb(222, 222, 222)',
  sub: 'rgb(190, 190, 190)',
  muted: 'rgb(137, 137, 137)',
  disabled: 'rgb(57, 57, 57)',
  brand: 'rgb(62, 207, 142)',
};

/**
 * Text component for rendering text with various styles and properties.
 *
 * @param {TextProps} props - The properties for the Text component.
 * @param {ReactNode} props.children - The content to be rendered within the Text component.
 * @param {TextSize | number} [props.size='md'] - The size of the text.
 * @param {TextWeight} [props.weight='normal'] - The weight of the text.
 * @param {TextColor} [props.color='default'] - The color of the text.
 * @param {TextAlign} [props.align] - The alignment of the text.
 * @param {TextTransform} [props.transform] - The text transformation.
 * @param {string} [props.decoration] - The text decoration.
 * @param {number | string} [props.lineHeight] - The line height of the text.
 * @param {number | string} [props.letterSpacing] - The letter spacing of the text.
 * @param {number} [props.truncate] - The number of lines to truncate the text.
 * @param {keyof JSX.IntrinsicElements} [props.as='p'] - The HTML element to render the text as.
 * @param {string} [props.className] - Additional CSS classes to apply to the text.
 * @param {CSSProperties} [props.style] - Additional inline styles to apply to the text.
 * @returns {JSX.Element} The rendered Text component.
 */
function Text({
  children,
  size = 'md',
  weight = 'normal',
  color = 'default',
  align,
  transform,
  decoration,
  lineHeight,
  letterSpacing,
  truncate,
  as: Component = 'p',
  className = '',
  style = {},
  ...props
}: TextProps): JSX.Element {
  const textStyle: CSSProperties = {
    fontSize: typeof size === 'string' ? sizeMap[size] : `${size}px`,
    fontWeight: weightMap[weight],
    color: colorMap[color],
    textAlign: align,
    textTransform: transform,
    textDecoration: decoration,
    lineHeight,
    letterSpacing,
    ...style,
  };

  if (truncate) {
    textStyle.overflow = 'hidden';
    textStyle.textOverflow = 'ellipsis';
    textStyle.display = '-webkit-box';
    textStyle.WebkitLineClamp = truncate;
    textStyle.WebkitBoxOrient = 'vertical';
  }

  return (
    <Component className={`text ${className}`} style={textStyle} {...props}>
      {children}
    </Component>
  );
}

export default Text;

