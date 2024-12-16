'use client'

import { ActivityItem } from "./activity-item"

const mockActivities = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      image: 'https://avatars.githubusercontent.com/u/1234567'
    },
    action: 'updated their',
    target: 'profile settings',
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    action: 'logged in from a new',
    target: 'device',
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  }
]

export function ActivityList() {
  return (
    <div className="space-y-6">
      {mockActivities.map((activity) => (
        <ActivityItem key={activity.id} item={activity} />
      ))}
    </div>
  )
}