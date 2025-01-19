/**
 * @author Remco Stoeten
 * @description A flexible and intuitive component for building layouts using Flexbox.
 */

import React, { CSSProperties, ReactNode } from 'react';

type FlexProps = {
  children: ReactNode;
  col?: boolean;
  rCol?: boolean;
  rRow?: boolean;
  wrap?: boolean;
  rWrap?: boolean;
  jEnd?: boolean;
  jCenter?: boolean;
  jBetween?: boolean;
  jAround?: boolean;
  jEvenly?: boolean;
  alignStart?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  alignBaseline?: boolean;
  alignCStart?: boolean;
  alignCEnd?: boolean;
  alignCCenter?: boolean;
  alignCBetween?: boolean;
  alignCAround?: boolean;
  alignCEvenly?: boolean;
  gap?: boolean;
  center?: boolean;
  cGap?: number;
  rGap?: number;
  className?: string;
  style?: CSSProperties;
} & {
  [key: `gap${number}`]: boolean;
};

export default function Flex({
    children,
  col,
  rCol,
  rRow,
  wrap,
  rWrap,
  jEnd,
  jCenter,
  jBetween,
  jAround,
  jEvenly,
  alignStart,
  alignEnd,
  alignCenter,
  alignBaseline,
  alignCStart,
  alignCEnd,
  alignCCenter,
  alignCBetween,
  alignCAround,
  alignCEvenly,
  gap,
  center,
  cGap,
  rGap,
  className = '',
  style = {},
  ...props
}: FlexProps) {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: col ? 'column' : rCol ? 'column-reverse' : rRow ? 'row-reverse' : 'row',
    flexWrap: wrap ? 'wrap' : rWrap ? 'wrap-reverse' : 'nowrap',
    justifyContent: jEnd ? 'flex-end' : jCenter ? 'center' : jBetween ? 'space-between' : jAround ? 'space-around' : jEvenly ? 'space-evenly' : 'flex-start',
    alignItems: alignStart ? 'flex-start' : alignEnd ? 'flex-end' : alignCenter ? 'center' : alignBaseline ? 'baseline' : 'stretch',
    alignContent: alignCStart ? 'flex-start' : alignCEnd ? 'flex-end' : alignCCenter ? 'center' : alignCBetween ? 'space-between' : alignCAround ? 'space-around' : alignCEvenly ? 'space-evenly' : 'stretch',
    gap: gap ? '1rem' : undefined,
    ...style,
  };

  if (center) {
    flexStyle.justifyContent = 'center';
    flexStyle.alignItems = 'center';
  }

  if (cGap !== undefined) {
    flexStyle.columnGap = `${cGap}px`;
  }

  if (rGap !== undefined) {
    flexStyle.rowGap = `${rGap}px`;
  }

  // Handle dynamic gap sizes
  Object.keys(props).forEach((key) => {
    if (key.startsWith('gap') && props[key]) {
      const gapSize = key.slice(3);
      flexStyle.gap = `${gapSize}px`;
    }
  });

  return (
    <div className={`flex ${className}`} style={flexStyle}>
      {children}
    </div>
  );
};
