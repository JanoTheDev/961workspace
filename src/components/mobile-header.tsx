"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { LayoutDashboard, Wallet, Users, Settings, Building, ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)
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
    <div className="md:hidden">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white border-b h-16 px-4">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-black"></div>
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-brand-red">961</span>
          <span className="ml-2 text-lg font-medium">Workspace</span>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="destructive" size="icon" className="h-10 w-10">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-brand-red">961</span>
                    <span className="ml-2 text-lg font-medium">Workspace</span>
                  </Link>
                </div>
                <div className="mt-4 relative">
                  <div
                    className="flex items-center justify-between p-2 cursor-pointer"
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
                    <div className="mt-1 bg-white border rounded-md shadow-lg z-20">
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
              </div>
              <div className="p-4 border-b">
                <Button variant="destructive" className="w-full justify-center">
                  Create
                </Button>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <nav className="space-y-2">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

