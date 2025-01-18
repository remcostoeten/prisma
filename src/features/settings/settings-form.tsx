'use client'

import { Switch } from '@radix-ui/react-switch'
import { useState } from 'react'
import { Input } from '../../src/components/ui/input'
import { Label } from '../../src/components/ui/label'
import { Button } from '../../src/components/ui/button'

export function SettingsForm() {
	const [notifications, setNotifications] = useState(true)

	return (
		<div className="space-y-6">
			<section id="profile" className="space-y-4">
				<h2 className="text-lg font-semibold text-white">Profile</h2>
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" placeholder="Your name" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="Your email" />
				</div>
			</section>

			<section id="notifications" className="space-y-4">
				<h2 className="text-lg font-semibold text-white">
					Notifications
				</h2>
				<div className="flex items-center space-x-2">
					<Switch
						id="notifications-toggle"
						checked={notifications}
						onCheckedChange={setNotifications}
						className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-200 dark:focus-visible:ring-offset-gray-950 dark:data-[state=unchecked]:bg-gray-800"
					>
						<span className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-gray-950" />
					</Switch>
					<Label htmlFor="notifications-toggle">
						Enable notifications
					</Label>
				</div>
			</section>

			<section id="password" className="space-y-4">
				<h2 className="text-lg font-semibold text-white">
					Change Password
				</h2>
				<div className="space-y-2">
					<Label htmlFor="current-password">Current Password</Label>
					<Input id="current-password" type="password" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="new-password">New Password</Label>
					<Input id="new-password" type="password" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="confirm-password">
						Confirm New Password
					</Label>
					<Input id="confirm-password" type="password" />
				</div>
				<Button className="bg-emerald-500 text-white hover:bg-emerald-600">
					Update Password
				</Button>
			</section>
		</div>
	)
}
