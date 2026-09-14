'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CommunityFeed from '@/components/CommunityFeed'

export default function AthleteDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== 'ATHLETE') {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome, {session.user?.name}!
          </h1>
          <p className="text-gray-600 text-lg">Athlete Dashboard</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container flex gap-8">
          <button className="py-4 font-semibold text-primary border-b-4 border-primary text-lg">
            Overview
          </button>
          <Link href="/community" className="py-4 text-gray-600 hover:text-primary font-semibold text-lg">
            Community
          </Link>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="text-gray-600 text-sm font-medium mb-2">Tournaments</div>
            <div className="text-4xl font-bold text-primary">0</div>
            <p className="text-gray-500 text-sm mt-2">Participated</p>
          </div>
          <div className="card">
            <div className="text-gray-600 text-sm font-medium mb-2">Achievements</div>
            <div className="text-4xl font-bold text-secondary">0</div>
            <p className="text-gray-500 text-sm mt-2">Medals won</p>
          </div>
          <div className="card">
            <div className="text-gray-600 text-sm font-medium mb-2">Sports</div>
            <div className="text-4xl font-bold text-blue-600">0</div>
            <p className="text-gray-500 text-sm mt-2">Registered</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={session.user?.name || ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={session.user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                placeholder="Enter your age"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Sport</label>
              <input
                type="text"
                placeholder="e.g., Cricket, Football, Kabaddi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
              <input
                type="text"
                placeholder="Your village name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Achievements</label>
              <textarea
                placeholder="Your achievements and awards"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base resize-none"
              />
            </div>
          </div>
          <button className="mt-6 btn btn-primary py-3 text-lg">
            Save Profile
          </button>
        </div>

        {/* Recent Activity */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No recent activity yet.</p>
            <Link href="/community" className="text-primary font-semibold hover:underline mt-2 inline-block">
              Share with community →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
