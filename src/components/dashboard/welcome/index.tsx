import { User } from "@/server/mutations/auth/user/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { WelcomeChart } from "./welcome-chart"

interface DashboardWelcomeProps {
  user: User | null
}

export function DashboardWelcome({ user }: DashboardWelcomeProps) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user?.name || user?.email}</CardTitle>
          <CardDescription>
            Here's what's happening with your account today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your activity overview for the past week
            </p>
            <WelcomeChart />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}