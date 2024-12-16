import { Users, Activity, LineChart } from "lucide-react"
import { StatCard } from "./stat-card"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Users",
      value: "10.5k",
      icon: Users,
      description: "Active users this month",
      trend: {
        value: 12.5,
        label: "from last month"
      }
    },
    {
      title: "Active Now",
      value: "856",
      icon: Activity,
      description: "Users currently online",
      trend: {
        value: -3.2,
        label: "from last hour"
      }
    },
    {
      title: "Revenue",
      value: "$45,231.89",
      icon: LineChart,
      description: "Revenue this quarter",
      trend: {
        value: 8.3,
        label: "from last quarter"
      }
    }
  ]

  return (
    <>
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </>
  )
}