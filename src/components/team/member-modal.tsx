"use client"

import { useState, useEffect, useRef } from "react"
import { X, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addTeamMember, editTeamMember, TeamMember } from "@/lib/redux/slices/teamSlice"

interface TeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  member?: TeamMember | null
  mode: 'add' | 'edit'
}

export function TeamMemberModal({ isOpen, onClose, member, mode }: TeamMemberModalProps) {
  const dispatch = useAppDispatch()
  const [username, setUsername] = useState("")
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'Finance' | 'Staff'>("Admin")
  const [activeTab, setActiveTab] = useState("General")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false)
  const [newBrandInput, setNewBrandInput] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const brandFieldRef = useRef<HTMLDivElement>(null)

  const isEditMode = mode === 'edit'
  const title = isEditMode ? "Edit Team Member" : "Add Team Member"
  const actionText = isEditMode ? "Save Changes" : "Add Team Member"

  const availableBrands = [
    "Coffee House",
    "Urban Wear",
    "Tech Store",
    "Book Nook",
    "Fitness Club",
    "Food Market"
  ]

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      const timeout = setTimeout(() => setShouldRender(false), 350)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  useEffect(() => {
    if (isEditMode && member) {
      setUsername(member.name || "")
      setSelectedRole(member.role)
      setSelectedBrands(member.brands || [])
    } else if (!isEditMode) {
      setUsername("")
      setSelectedRole("Admin")
      setSelectedBrands([])
    }
  }, [isEditMode, member, isOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        brandFieldRef.current && 
        !brandFieldRef.current.contains(event.target as Node)
      ) {
        setIsBrandDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')
  
  useEffect(() => {
    if (isBrandDropdownOpen && brandFieldRef.current) {
      const fieldRect = brandFieldRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - fieldRect.bottom
      
      if (spaceBelow < 250) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }
    }
  }, [isBrandDropdownOpen])

  const roles = [
    {
      name: 'Admin' as const,
      description: "Full control over all features and settings",
    },
    {
      name: 'Finance' as const,
      description: "Manage wallet and finances",
    },
    {
      name: 'Staff' as const,
      description: "All tasks except wallet management",
    },
  ]

  const tabs = ["General", "Studio", "Wallet", "Advertising"]

  const handleSaveOrAdd = () => {
    if (!username) return

    if (isEditMode && member) {
      dispatch(editTeamMember({
        ...member,
        name: username,
        fullName: username,
        role: selectedRole,
        brands: selectedBrands.length > 0 ? selectedBrands : ["Coffee House"],
      }))
    } else {
      dispatch(addTeamMember({
        name: username,
        fullName: username,
        role: selectedRole,
        brands: selectedBrands.length > 0 ? selectedBrands : ["Coffee House"],
        status: 'Active' as const,
        dateAdded: new Date().toISOString().split("T")[0],
        initial: username.charAt(0).toLowerCase(),
      }))
    }

    onClose()
  }
  
  // Functions for brand management
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const handleAddCustomBrand = () => {
    if (newBrandInput.trim() && !selectedBrands.includes(newBrandInput.trim())) {
      setSelectedBrands(prev => [...prev, newBrandInput.trim()])
      setNewBrandInput("")
    }
  }

  const handleRemoveBrand = (brand: string) => {
    setSelectedBrands(prev => prev.filter(b => b !== brand))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newBrandInput.trim()) {
      handleAddCustomBrand();
    }
  }

  // Don't render if closed or in edit mode without a member
  if (!shouldRender || (isEditMode && !member)) return null

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-350 ease-in-out ${
        isAnimating ? "backdrop-blur-sm bg-black/40" : "backdrop-blur-none bg-black/0"
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg w-full max-w-md mx-4 overflow-visible shadow-2xl 
          transition-all duration-350 ease-cubic-bezier ${
          isAnimating 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform -translate-y-4 scale-95"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)"
        }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <Input
              type="text"
              placeholder="e.g., john.doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className={cn(
                    "border rounded-md p-3 cursor-pointer transition-all duration-150",
                    selectedRole === role.name 
                      ? "border-red-500 bg-red-50 shadow-sm" 
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                  )}
                  onClick={() => setSelectedRole(role.name as 'Admin' | 'Finance' | 'Staff')}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{role.name}</span>
                    {selectedRole === role.name && (
                      <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center transform scale-in-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex mb-4 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={cn(
                  "py-2 px-4 text-sm font-medium rounded-md transition-all duration-150",
                  activeTab === tab
                    ? "bg-gray-100 text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
                )}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-4 relative" style={{ zIndex: 100 }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Brands</label>
            <div 
              ref={brandFieldRef}
              className="flex flex-wrap items-center gap-2 border rounded-md p-3 hover:border-gray-300 transition-colors duration-150 cursor-pointer"
              onClick={() => setIsBrandDropdownOpen(true)}
            >
              {selectedBrands.length > 0 ? (
                <>
                  {selectedBrands.map((brand, index) => (
                    <div key={brand} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1 group">
                      <span>{brand}</span>
                      <button 
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBrand(brand);
                        }}
                        aria-label={`Remove ${brand}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <span className="text-gray-500">Select Brands</span>
              )}
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors duration-150 ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBrandDropdownOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Brands Dropdown */}
            {isBrandDropdownOpen && (
              <div
                ref={dropdownRef}
                className={`absolute ${dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'} left-0 right-0 bg-white border rounded-md shadow-xl z-[1000]`}
                style={{ 
                  width: brandFieldRef.current?.offsetWidth ? `${brandFieldRef.current.offsetWidth}px` : '100%',
                  maxHeight: "250px", 
                  overflowY: "auto",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="p-2 border-b sticky top-0 bg-white z-10">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Add new brand..."
                      value={newBrandInput}
                      onChange={(e) => setNewBrandInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 text-sm"
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs whitespace-nowrap"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleAddCustomBrand();
                      }}
                      disabled={!newBrandInput.trim()}
                    >
                      Add
                    </Button>
                    <button
                      className="text-gray-400 hover:text-gray-600 rounded-full h-6 w-6 flex items-center justify-center transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBrandDropdownOpen(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="py-1">
                  {availableBrands.map((brand, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100",
                        selectedBrands.includes(brand) && "bg-red-50"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBrand(brand);
                      }}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border mr-2 flex items-center justify-center transition-colors",
                        selectedBrands.includes(brand) ? "border-red-500 bg-red-500" : "border-gray-300"
                      )}>
                        {selectedBrands.includes(brand) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="transition-all duration-150 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleSaveOrAdd} 
            disabled={!username}
            className="transition-all duration-150 hover:opacity-90"
          >
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  )
}

