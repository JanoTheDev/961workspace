"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/team/dashboard-layout"
import { UserPlus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TeamMobilePage } from "./mobile-page"
import { TeamMemberModal } from "@/components/team/member-modal"
import { RemoveTeamMemberModal } from "@/components/team/remove-member-modal"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { selectTeamMembers, selectTeamLoading, setTeamMembers, setLoading, TeamMember } from "@/lib/redux/slices/teamSlice"
import { TeamTableSkeleton, TeamMobileSkeleton } from "@/components/team/skeleton"
import { SearchBar } from "@/components/ui/search-bar"
import { MobileHeader } from "@/components/mobile-header"

export default function TeamPage() {
  const dispatch = useAppDispatch();
  const teamMembers = useAppSelector(selectTeamMembers);
  const loading = useAppSelector(selectTeamLoading);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const loadSampleData = async () => {
    // Set loading state
    dispatch(setLoading(true));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    dispatch(setTeamMembers([
      {
        id: "1",
        name: "john.doe",
        fullName: "john.doe",
        role: "Admin",
        brands: ["Coffee House", "Urban Wear", "Tech Store"],
        status: "Active",
        dateAdded: "2024-03-15",
        initial: "j",
      },
      {
        id: "2",
        name: "sarah.smith",
        fullName: "sarah.smith",
        role: "Finance",
        brands: ["Coffee House"],
        status: "Active",
        dateAdded: "2024-03-14",
        initial: "s",
      },
    ]));
    
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (teamMembers.length === 0) {
      loadSampleData();
    }
  }, [dispatch, teamMembers.length]);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.brands.some((brand) => brand.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const openEditModal = (member: TeamMember) => {
    setSelectedMember(member)
    setIsEditModalOpen(true)
  }

  const openRemoveModal = (member: TeamMember) => {
    setMemberToRemove(member)
    setIsRemoveModalOpen(true)
  }

  // Handle search query changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      {loading ? (
        <div className="md:hidden pt-16">
          <MobileHeader />
          <div className="p-4">
            <TeamMobileSkeleton />
          </div>
        </div>
      ) : (
        <TeamMobilePage 
          members={filteredMembers} 
          onEdit={openEditModal} 
          onRemove={openRemoveModal}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAdd={() => setIsAddModalOpen(true)}
        />
      )}

      <div className="hidden md:block">
        <DashboardLayout className="py-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex gap-1 whitespace-nowrap"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Team Member</span>
              </Button>
            </div>
            <div className="mt-4">
              <SearchBar
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {loading ? (
            <TeamTableSkeleton />
          ) : filteredMembers.length > 0 ? (
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Brands
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date Added
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-red-500 text-white font-medium flex items-center justify-center mr-3">
                            {member.initial.toUpperCase()}
                          </div>
                          {member.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.role}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {member.brands.map((brand) => (
                            <span key={brand} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                              {brand}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {member.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.dateAdded}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openEditModal(member)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openRemoveModal(member)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white shadow sm:rounded-lg p-6 text-center">
              <p className="text-gray-500">No team members found</p>
            </div>
          )}
        </DashboardLayout>
      </div>

      <TeamMemberModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        mode="add"
      />
      
      <TeamMemberModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedMember(null)
        }}
        member={selectedMember}
        mode="edit"
      />
      
      {memberToRemove && (
        <RemoveTeamMemberModal 
          isOpen={isRemoveModalOpen} 
          onClose={() => {
            setIsRemoveModalOpen(false)
            setMemberToRemove(null)
          }}
          memberId={memberToRemove.id}
          memberName={memberToRemove.name}
        />
      )}
    </>
  )
}

