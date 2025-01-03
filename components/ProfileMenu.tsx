"use client"

import * as React from "react"
import { User } from 'lucide-react'
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

const menuItems = [
  { value: "profile-info", label: "Profile Info", href: "/profile", description: "View and edit your profile" },
  { value: "friends", label: "Friends", href: "/friends", description: "Connect with other historians" },
  { value: "puzzle-games", label: "Puzzle Games", href: "/puzzle-games", description: "Test your leadership skills in historical scenarios" },
]

export default function ProfileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="button-primary p-2 rounded-lg hover:opacity-80 transition-all"
          title="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent className="glass-effect border-l border-emerald-900/20">
        <SheetHeader>
          <SheetTitle className="gradient-text text-xl">Profile Menu</SheetTitle>
        </SheetHeader>
        <div className="py-6">
          {menuItems.map((item) => (
            <SheetClose asChild key={item.value}>
              <Link href={item.href}>
                <div
                  className="mb-4 p-4 rounded-lg glass-effect hover:bg-emerald-900/20 transition-all cursor-pointer"
                >
                  <span className="block text-base font-medium text-emerald-400">{item.label}</span>
                  {item.description && (
                    <span className="block text-sm text-gray-400 mt-1">{item.description}</span>
                  )}
                </div>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

