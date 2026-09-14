import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import { redirect } from 'next/navigation'

export async function withAuth(handler: Function) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  return session
}
