import { ArrowUpRight } from 'lucide-react'
import { AuthCard } from './auth-card'
import { CardItemProps } from '../../../../types/card'

export const CardItem = ({ title, desc, href }: CardItemProps) => {
  return (
    <AuthCard
      href={href}
      className="h-full"
      color={{ from: "#3b82f6", to: "#1d4ed8" }}
      strength={0.15}
      size={300}
      updateSpeed={30}
    >
      <div className="flex flex-col justify-between h-full text-[#8c877d] text-lg relative z-[2]">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 mb-3">
            <h3 className="text-[#f2f0ed] uppercase text-lg leading-[1.24em] m-0">{title}</h3>
          </div>
          <div className="mb-8">{desc}</div>
        </div>
        <div className="tool-link-arrow mt-auto">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </AuthCard>
  )
}

