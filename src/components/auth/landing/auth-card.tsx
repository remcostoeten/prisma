"use client"

import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useSpotlight } from '../../../shared/hooks/useSpotlight'
import { AuthCardProps } from '../../../../types/card'
import { CardPattern } from './card-pattern'
export const AuthCard = ({
  children,
  className,
  href,
  borders = { top: true, right: true, bottom: true, left: true },
  ...spotlightProps
}: AuthCardProps) => {
  const { mouseX, mouseY, randomString, handleMouseMove } = useSpotlight(
    spotlightProps.characters,
    spotlightProps.updateSpeed
  )

  const borderClasses = cn(
    borders.top && "border-t",
    borders.right && "border-r",
    borders.bottom && "border-b",
    borders.left && "border-l",
    "border-dashed border-[#8c877d]"
  )

  const CardContent = (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "flex flex-col min-h-[269px] text-[#f2f0ed] text-[22px] leading-[1.1em] p-8 relative group/card",
        borderClasses,
        className
      )}
    >
      {children}
      <CardPattern
        mouseX={mouseX}
        mouseY={mouseY}
        randomString={randomString}
        {...spotlightProps}
      />
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    )
  }

  return CardContent
}

