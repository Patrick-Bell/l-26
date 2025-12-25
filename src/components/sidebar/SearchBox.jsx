"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Play,
  SearchCheckIcon,
  ArrowRight,
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Search,
  HelpCircle,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useHotkeys } from "react-hotkeys-hook"


const SearchBox = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
     
  const handleNavigate = (path) => {
    setOpen(false)
    navigate(path)
  }

  const otherNav = [
    { name: "Analytics", link: "/analytics", icon: BarChart3 },
    { name: "Fixtures", link: "/fixtures", icon: CalendarDays },
    { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
    { name: 'My Account', link: '/account', icon: User },
    { name: 'Support', link: '/support', icon: HelpCircle }
  ]

  useHotkeys("ctrl+k, meta+k", (e) => {
      e.preventDefault()
      setOpen(true)
    },
    { enableOnTags: ["INPUT", "TEXTAREA"] } // optional: allow shortcuts in inputs if needed
  )

  return (
    <>
              <Tooltip>
                <TooltipTrigger asChild>
                <button 
                id="search-btn"
                  onClick={() => setOpen(true)}
                  className="mt-3 lg:mt-0 lg:w-auto inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors">
                <Search className="h-4 w-4" />
              </button>               
               </TooltipTrigger>
                <TooltipContent>
                  <p>Click to search across the web application</p>
                </TooltipContent>
              </Tooltip>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for Workers, Games, or Managers..." />
        <CommandList>
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading...</div>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>

              
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBox
