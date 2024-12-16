import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ActivityList } from "./activity-list"

export function DashboardActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your most recent actions and updates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ActivityList />
      </CardContent>
    </Card>
  )
}