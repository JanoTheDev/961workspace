"use client"

import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-64">
          <main className={cn("flex-1 overflow-y-auto", className)}>{children}</main>
        </div>
      </div>
    </div>
  )
}

