/**
 * @author Remco Stoeten
 * @description A comprehensive and flexible Stack component for vertical or horizontal stacking of elements with consistent spacing.
 */

import React, { CSSProperties, ReactNode } from 'react';

type StackProps = {
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
  spacing?: number | string;
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  inline?: boolean;
  reverse?: boolean;
  divider?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
} & {
  [key: `spacing${number}`]: boolean;
};

const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  spacing,
  align,
  justify,
  wrap,
  inline,
  reverse,
  divider,
  as: Component = 'div',
  className = '',
  style = {},
  ...props
}) => {
  const stackStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: 
      direction === 'vertical' 
        ? (reverse ? 'column-reverse' : 'column')
        : (reverse ? 'row-reverse' : 'row'),
    alignItems: 
      align === 'start' ? 'flex-start' 
      : align === 'end' ? 'flex-end'
      : align === 'center' ? 'center'
      : align === 'stretch' ? 'stretch'
      : align === 'baseline' ? 'baseline'
      : direction === 'horizontal' ? 'center' : 'stretch',
    justifyContent: 
      justify === 'start' ? 'flex-start'
      : justify === 'end' ? 'flex-end'
      : justify === 'center' ? 'center'
      : justify === 'between' ? 'space-between'
      : justify === 'around' ? 'space-around'
      : justify === 'evenly' ? 'space-evenly'
      : direction === 'horizontal' ? 'flex-start' : 'flex-start',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: spacing !== undefined ? (typeof spacing === 'number' ? `${spacing}px` : spacing) : undefined,
    ...style,
  };

  // Handle dynamic spacing sizes
  Object.keys(props).forEach((key) => {
    if (key.startsWith('spacing') && props[key]) {
      const spacingSize = key.slice(7);
      stackStyle.gap = `${spacingSize}px`;
    }
  });

  const stackItems = React.Children.toArray(children).filter(child => child !== null && child !== undefined);

  const stackWithDividers = stackItems.reduce((acc: ReactNode[], child, index) => {
    if (index !== 0 && divider) {
      acc.push(
        <div key={`divider-${index}`} style={{ alignSelf: 'stretch' }}>
          {divider}
        </div>
      );
    }
    acc.push(child);
    return acc;
  }, []);

  return (
    <Component className={`stack ${className}`} style={stackStyle}>
      {divider ? stackWithDividers : children}
    </Component>
  );
};

export default Stack;

