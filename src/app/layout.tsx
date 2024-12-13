import { Header } from '@/components/layout/header'
import './globals.css'
import { Toaster } from 'sonner'

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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground">
        <Header />
        <Toaster />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
