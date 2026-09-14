'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PanchayatDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== 'PANCHAYAT') {
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
          <p className="text-gray-600 text-lg">Panchayat Dashboard</p>
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
            <div className="text-gray-600 text-sm font-medium mb-2">Grounds</div>
            <div className="text-4xl font-bold text-primary">0</div>
            <p className="text-gray-500 text-sm mt-2">Registered</p>
          </div>
          <div className="card">
            <div className="text-gray-600 text-sm font-medium mb-2">Athletes</div>
            <div className="text-4xl font-bold text-secondary">0</div>
            <p className="text-gray-500 text-sm mt-2">In your village</p>
          </div>
          <div className="card">
            <div className="text-gray-600 text-sm font-medium mb-2">Events</div>
            <div className="text-4xl font-bold text-blue-600">0</div>
            <p className="text-gray-500 text-sm mt-2">Organized</p>
          </div>
        </div>

        {/* Panchayat Info */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Panchayat Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Panchayat Head Name</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Village Name</label>
              <input
                type="text"
                placeholder="Enter your village name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Population</label>
              <input
                type="number"
                placeholder="Village population"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Tell us about your village and sports infrastructure"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base resize-none"
              />
            </div>
          </div>
          <button className="mt-6 btn btn-primary py-3 text-lg">
            Save Details
          </button>
        </div>

        {/* Grounds Section */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Sports Grounds</h2>
            <button className="btn btn-secondary py-2 text-base">+ Add Ground</button>
          </div>
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No grounds registered yet.</p>
            <p className="text-sm mt-2">Add your village sports grounds to help athletes find places to play.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
