import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          {description}
          {trend && (
            <span className={trend.value >= 0 ? "text-green-500" : "text-red-500"}>
              {' '}{trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  )
}