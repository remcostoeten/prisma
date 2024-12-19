import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type FontStyle = 'mono' | 'regular' | 'mixed'

export const getFontStyle = (style: FontStyle = 'regular', className?: ClassValue) => {
    const baseStyles = {
        mono: 'font-mono text-sm tracking-tight',
        regular: 'font-sans text-base',
        mixed: 'font-mono text-sm tracking-tight [&>span]:font-sans [&>span]:text-base'
    }

    return twMerge(clsx(baseStyles[style], className))
}

// Example usage:
// <div className={getFontStyle('mixed')}>
//   Code here <span>Regular text here</span>
// </div>

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
} 
