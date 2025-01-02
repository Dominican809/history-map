"use client"

import * as React from "react"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { value: "saved-events", label: "Your Saved Historical Events" },
  { value: "explore", label: "Explore Menu" },
  { value: "mini-lessons", label: "Mini Lessons" },
]

export default function TimelineDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-10 h-10 p-0 justify-center bg-transparent border-stone-300 hover:bg-stone-100"
        >
          <Menu className="h-6 w-6 text-stone-800" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] z-50">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.value}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

