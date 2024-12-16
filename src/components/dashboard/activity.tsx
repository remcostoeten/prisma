import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"

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
        <div className="space-y-8">
          {/* Add activity content here */}
        </div>
      </CardContent>
    </Card>
  )
}