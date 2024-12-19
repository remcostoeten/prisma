'use client'

import { type ReactNode } from 'react'
import { getFontStyle, type FontStyle } from '@/core/utils/typography'

type MixedFontProps = {
    children?: ReactNode
    style?: FontStyle
    className?: string
    monospaceContent?: ReactNode
    regularContent?: ReactNode
}

export default function MixedFont({
    children,
    style = 'mixed',
    className,
    monospaceContent,
    regularContent
}: MixedFontProps) {
    if (monospaceContent && regularContent) {
        return (
            <div className={getFontStyle(style, className)}>
                {monospaceContent}
                <span>{regularContent}</span>
            </div>
        )
    }

    if (!children) {
        return null
    }

    return (
        <div className={getFontStyle(style, className)}>
            {children}
        </div>
    )
}

// Example usage:
// <MixedFont 
//   monospaceContent="const x = 42;"
//   regularContent="This is a variable declaration"
// />
// 
// Or with children:
// <MixedFont>
//   const x = 42; <span>This is a variable declaration</span>
// </MixedFont> 
