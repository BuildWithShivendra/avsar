'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    role: string
  }
  _count: {
    comments: number
    likes: number
  }
}

export default function CommunityFeed() {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [postsLoading, setPostsLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push('/login')
      return
    }
    fetchPosts()
  }, [session, router])

  const fetchPosts = async () => {
    try {
      setPostsLoading(true)
      const response = await fetch('/api/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setPostsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        const newPost = await response.json()
        setPosts([newPost, ...posts])
        setContent('')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ATHLETE':
        return 'bg-blue-100 text-blue-800'
      case 'PANCHAYAT':
        return 'bg-purple-100 text-purple-800'
      case 'ORGANIZER':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Community Feed</h1>

      {/* Post Creation Form */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Share with Community</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, achievements, or ask for help..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base resize-none"
          />
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="mt-4 btn btn-primary w-full py-3 text-lg disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {postsLoading ? (
          <div className="text-center text-gray-500 py-8">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No posts yet. Be the first to share!
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {post.user.name}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      getRoleBadgeColor(post.user.role)
                    }`}
                  >
                    {post.user.role === 'ATHLETE' && 'Athlete'}
                    {post.user.role === 'PANCHAYAT' && 'Panchayat'}
                    {post.user.role === 'ORGANIZER' && 'Organizer'}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex gap-6 text-gray-600 text-sm">
                <button className="hover:text-primary font-medium">
                  ❤️ {post._count.likes} Likes
                </button>
                <button className="hover:text-primary font-medium">
                  💬 {post._count.comments} Comments
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
