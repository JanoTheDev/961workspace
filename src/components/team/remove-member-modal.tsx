"use client"

import { useEffect, useState } from "react"
import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/redux/hooks"
import { removeTeamMember } from "@/lib/redux/slices/teamSlice"

interface RemoveTeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  memberId: string
  memberName: string
}

export function RemoveTeamMemberModal({ isOpen, onClose, memberId, memberName }: RemoveTeamMemberModalProps) {
  const dispatch = useAppDispatch()
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

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

  const handleRemove = () => {
    dispatch(removeTeamMember(memberId))
    onClose()
  }

  if (!shouldRender) return null

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-350 ease-in-out ${
        isAnimating ? "backdrop-blur-sm bg-black/40" : "backdrop-blur-none bg-black/0"
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden shadow-2xl
          transition-all duration-350 ease-cubic-bezier ${
          isAnimating 
            ? "opacity-100 transform translate-y-0 scale-100" 
            : "opacity-0 transform -translate-y-4 scale-95"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4">
          <div className="flex items-start mb-2">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Remove Team Member</h2>
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="text-gray-600">
                Are you sure you want to remove <span className="font-medium">{memberName}</span> from the team? This
                action cannot be undone.
              </p>
            </div>
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
            onClick={handleRemove}
            className="transition-all duration-150 hover:opacity-90"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

