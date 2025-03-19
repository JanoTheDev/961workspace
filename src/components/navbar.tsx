"use client"

import Link from "next/link"

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-black"></div>
      <div className="flex items-center justify-between h-16 px-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-red-500">961</span>
          <span className="ml-2 text-lg font-medium">Workspace</span>
        </Link>
      </div>
    </div>
  )
}

