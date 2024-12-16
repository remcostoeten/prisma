import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Users, Activity, LineChart } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Users",
      value: "10.5k",
      icon: Users,
      description: "Active users this month",
    },
    {
      title: "Active Now",
      value: "856",
      icon: Activity,
      description: "Users currently online",
    },
    {
      title: "Revenue",
      value: "$45,231.89",
      icon: LineChart,
      description: "Revenue this quarter",
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}