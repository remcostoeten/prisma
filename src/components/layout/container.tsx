/**
 * @author Remco Stoeten
 * @description A reusable container component that provides consistent padding and max-width
 */

import { cn } from '@/shared/helpers';
import { ElementType, ComponentPropsWithoutRef } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = 'div'>({
  children,
  className,
  as,
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';
  
  return (
    <Component 
      className={cn(
        'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
} 
