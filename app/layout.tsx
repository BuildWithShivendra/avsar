import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth/next'

export const metadata: Metadata = {
  title: 'Avsar - Rural Sports Platform',
  description: 'Every Village Deserves a Place to Play',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
