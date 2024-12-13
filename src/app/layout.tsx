import './globals.css'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-wrapper'
import Nav from '@/components/layout/header/nav'
import UserProvider from '@/contexts/user-context'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <UserProvider>
          <ThemeProvider>
            <Nav />
            {children}
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  )
}
