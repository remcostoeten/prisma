import { User } from "@/server/mutations/auth/user/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

interface DashboardWelcomeProps {
  user: User | null
}

export function DashboardWelcome({ user }: DashboardWelcomeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back, {user?.name || user?.email}</CardTitle>
        <CardDescription>
          Here&lsquo;s what&apos;s happening with your account today.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add welcome content here */}
        </div>
      </CardContent>
    </Card>
  )
}
