import { Header } from '@/components/layout/header'
import './globals.css'
import { Inter } from 'next/font/google'
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
    <html lang="en" className="dark" color-scheme="dark">
      <body className={`${inter.className} bg-neutral-950 text-white`}>
        <Header />
        <Toaster />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
