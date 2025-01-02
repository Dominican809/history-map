"use client"

import * as React from "react"
import { User } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const menuItems = [
  { value: "profile-info", label: "Profile Info" },
  { value: "friends", label: "Friends" },
  { value: "puzzle-games", label: "Puzzle Games" },
]

export default function ProfileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 p-0 justify-center bg-transparent border-stone-300 hover:bg-stone-100"
        >
          <User className="h-6 w-6 text-stone-800" />
          <span className="sr-only">Open profile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="z-50">
        <SheetHeader>
          <SheetTitle>Profile Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {menuItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              className="w-full justify-start text-left mb-2"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

