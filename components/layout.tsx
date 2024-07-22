import React from 'react'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <nav>
          <Link href="/" className="text-xl font-bold">
            My Blog
          </Link>
          {/* Add more navigation items here */}
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © {new Date().getFullYear()} My Blog
      </footer>
    </div>
  )
}