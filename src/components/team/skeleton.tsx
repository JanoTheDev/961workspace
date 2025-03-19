"use client"

import { cn } from "@/lib/utils"

interface TeamSkeletonProps {
  className?: string
}

export function TeamTableSkeleton({ className }: TeamSkeletonProps) {
  return (
    <div className={cn("overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg", className)}>
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
          {Array(5).fill(0).map((_, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200 animate-pulse mr-3"></div>
                  <div className="h-4 w-36 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  <div className="h-5 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                  <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                  <div className="h-5 w-24 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TeamMobileSkeleton({ className }: TeamSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array(5).fill(0).map((_, index) => (
        <div key={index} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse mr-3"></div>
              <div>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                  <div className="h-4 w-1 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="h-3 w-10 bg-gray-200 animate-pulse rounded mb-2"></div>
              <div className="flex flex-wrap gap-1">
                <div className="h-5 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-5 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="h-5 w-24 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="h-3 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 