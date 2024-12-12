import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auth Project',
  description: 'A simple authentication project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold">Auth Project</Link>
            <div>
              <Link href="/login" className="mr-4">Login</Link>
              <Link href="/register">Register</Link>
            </div>
          </div>
        </nav>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

