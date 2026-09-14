import type { Metadata } from 'next'
import { AuthProvider } from '@/components/AuthProvider'
import './globals.css'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'

export const metadata: Metadata = {
  title: 'Avsar - Rural Sports Platform',
  description: 'Every Village Deserves a Place to Play',
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar session={session} />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
