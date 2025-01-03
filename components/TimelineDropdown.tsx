"use client"

import * as React from "react"
import { Menu, HelpCircle, Users, Share2, Twitter, Youtube, Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { value: "saved-events", label: "Your Saved Historical Events", icon: null },
  { value: "explore", label: "Explore Menu", icon: null },
  { value: "mini-lessons", label: "Mini Lessons", icon: null },
]

const infoItems = [
  { 
    value: "faq", 
    label: "FAQ", 
    icon: HelpCircle,
    href: "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk"
  },
  { 
    value: "about", 
    label: "About Us", 
    icon: Users,
    href: "https://www.joerogan.com/about"
  },
]

const socialItems = [
  { 
    value: "twitter", 
    label: "Twitter", 
    icon: Twitter,
    href: "https://twitter.com/joerogan"
  },
  { 
    value: "youtube", 
    label: "YouTube", 
    icon: Youtube,
    href: "https://www.youtube.com/@joerogan"
  },
  { 
    value: "facebook", 
    label: "Facebook", 
    icon: Facebook,
    href: "https://www.facebook.com/JOEROGAN"
  },
  { 
    value: "instagram", 
    label: "Instagram", 
    icon: Instagram,
    href: "https://www.instagram.com/joerogan"
  },
]

export default function TimelineDropdown() {
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="button-primary p-2 rounded-lg hover:opacity-80 transition-all"
            title="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px] glass-effect border-emerald-900/20">
          <DropdownMenuGroup>
            {menuItems.map((item) => (
              <DropdownMenuItem 
                key={item.value}
                className="hover:bg-emerald-900/20 focus:bg-emerald-900/20 cursor-pointer"
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-emerald-900/20" />
          
          <DropdownMenuGroup>
            {infoItems.map((item) => (
              <DropdownMenuItem key={item.value} asChild>
                <Link 
                  href={item.href}
                  className="flex items-center gap-2 hover:bg-emerald-900/20 focus:bg-emerald-900/20 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon && <item.icon className="h-4 w-4 text-emerald-400" />}
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2">
        {socialItems.map((item) => (
          <Link
            key={item.value}
            href={item.href}
            className="button-primary p-2 rounded-lg hover:opacity-80 transition-all"
            title={item.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </div>
  )
}

