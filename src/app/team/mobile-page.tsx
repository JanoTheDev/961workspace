"use client"

import { Input } from "@/components/ui/input"
import { Pencil, Trash2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileHeader } from "@/components/mobile-header"
import { TeamMember } from "@/lib/redux/slices/teamSlice"

interface TeamMobilePageProps {
  members: TeamMember[]
  onEdit: (member: TeamMember) => void
  onRemove: (member: TeamMember) => void
  searchQuery?: string
  onSearchChange?: (value: string) => void
  onAdd?: () => void
}

export function TeamMobilePage({
  members,
  onEdit,
  onRemove,
  searchQuery = "",
  onSearchChange,
  onAdd,
}: TeamMobilePageProps) {
  return (
    <div className="md:hidden">
      <MobileHeader />
      
      <div className="pt-16">
        <div className="border-b bg-white sticky top-16 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-semibold">Team Members</h1>
            <Button variant="destructive" size="sm" className="flex items-center gap-1" onClick={onAdd}>
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="relative w-full mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-10 bg-gray-50 border-gray-200 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center text-brand-red">
                    {member.initial.toUpperCase()}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{member.name}</p>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.brands.map((brand, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {member.status}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-gray-500">Date Added: {member.dateAdded}</div>

                <div className="mt-2 flex justify-end space-x-2">
                  <button className="p-1 text-gray-500" onClick={() => onEdit(member)}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-500" onClick={() => onRemove(member)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            
            {members.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No team members found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

