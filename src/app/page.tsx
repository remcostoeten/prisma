'use client'

/**
 * @author Remco Stoeten
 * @description Example page demonstrating auth state usage
 */

import { useUser } from '@/state/auth'

export default function HomePage() {
	const { user, isLoading, logout } = useUser()

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-2xl font-bold">
						{user ? `Welcome, ${user.firstName}!` : 'Welcome Guest!'}
					</h1>
					<p className="mt-2 text-gray-600">
						{user 
							? 'You are logged in'
							: 'Please log in to access your account'
						}
					</p>
				</div>

				<div className="space-y-4">
					{user ? (
						<button
							onClick={() => logout()}
							className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
						>
							Logout
						</button>
					) : (
						<a
							href="/login"
							className="block w-full px-4 py-2 text-center text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
						>
							Login
						</a>
					)}
				</div>

				{user && (
					<div className="mt-8 p-4 bg-gray-100 rounded-lg">
						<h2 className="text-lg font-semibold mb-4">User Details</h2>
						<pre className="whitespace-pre-wrap break-words">
							{JSON.stringify(user, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	)
}
