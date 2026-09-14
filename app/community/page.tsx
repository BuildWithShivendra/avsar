import CommunityFeed from '@/components/CommunityFeed'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function CommunityPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CommunityFeed />
    </div>
  )
}
