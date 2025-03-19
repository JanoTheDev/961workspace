"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Wallet, Users, Settings, ChevronDown, Building } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false)

  // Sample companies
  const companies = [
    { id: 1, name: "Tech Innovations Ltd." },
    { id: 2, name: "Design Studios Inc." },
    { id: 3, name: "Marketing Solutions" },
    { id: 4, name: "Global Ventures" },
  ]

  const [selectedCompany, setSelectedCompany] = useState(companies[0])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Wallet",
      icon: Wallet,
      href: "/wallet",
      active: pathname === "/wallet",
    },
    {
      label: "Team",
      icon: Users,
      href: "/team",
      active: pathname === "/team",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div className={cn("flex w-64 flex-col fixed left-0 bottom-0 top-16 z-10 bg-white border-r", className)}>
      <div className="flex flex-col flex-grow">
        <div className="px-4 py-4 border-b relative">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
          >
            <div className="flex items-center">
              <Building className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-sm font-medium">{selectedCompany.name}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                companyDropdownOpen && "transform rotate-180",
              )}
            />
          </div>

          {/* Dropdown menu */}
          {companyDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-20 mx-2">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className={cn(
                    "px-4 py-2 text-sm cursor-pointer hover:bg-gray-100",
                    selectedCompany.id === company.id && "bg-gray-50",
                  )}
                  onClick={() => {
                    setSelectedCompany(company)
                    setCompanyDropdownOpen(false)
                  }}
                >
                  {company.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-4 py-4 border-b">
          <Button variant="destructive" className="w-full justify-center font-medium">
            Create
          </Button>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                route.active ? "text-brand-red bg-red-50" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <route.icon className={cn("h-5 w-5", route.active ? "text-brand-red" : "text-gray-500")} />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

