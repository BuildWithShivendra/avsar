'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

interface NavbarProps {
  session: Session | null
}

export default function Navbar({ session }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold text-primary">
          Avsar
        </Link>
        
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-gray-700 text-sm">
                Welcome, {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-secondary text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
