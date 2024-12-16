'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface ActivityItem {
  id: string
  user: {
    name: string
    email: string
    image?: string
  }
  action: string
  target: string
  timestamp: Date
}

interface ActivityItemProps {
  item: ActivityItem
}

export function ActivityItem({ item }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={item.user.image} />
        <AvatarFallback>{item.user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{item.user.name}</span>
          {' '}{item.action}{' '}
          <span className="font-medium">{item.target}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  )
}