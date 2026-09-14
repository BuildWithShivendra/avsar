import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'

export default async function Home() {
  const session = await getServerSession()

  if (session) {
    const role = (session.user as any)?.role
    if (role === 'ATHLETE') redirect('/dashboard/athlete')
    if (role === 'PANCHAYAT') redirect('/dashboard/panchayat')
    if (role === 'ORGANIZER') redirect('/dashboard/organizer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
      <div className="text-center px-6 py-12">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
          Avsar
        </h1>
        <p className="text-2xl text-gray-600 mb-2">
          Every Village Deserves a Place to Play
        </p>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Connect athletes, organize tournaments, and build stronger communities through sports
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
          <Link href="/register" className="btn btn-outline">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
