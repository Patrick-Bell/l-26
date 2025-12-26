"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useHotkeys } from "react-hotkeys-hook"
import { allPlayers } from "../api/Players"

const SearchBox = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [players, setPlayers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate API fetch
    setPlayers(allPlayers) // replace with real fetch if needed
    setLoading(false)
  }, [])

  const handleNavigate = (playerId) => {
    setOpen(false)
    navigate(`/players/${playerId}`) // or whatever route your player page uses
  }

  useHotkeys(
    "ctrl+k, meta+k",
    (e) => {
      e.preventDefault()
      setOpen(true)
    },
    { enableOnTags: ["INPUT", "TEXTAREA"] }
  )

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setOpen(true)}
            className="mt-3 lg:mt-0 lg:w-auto inline-flex items-center px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to search across the web application</p>
        </TooltipContent>
      </Tooltip>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for Players..." />
        <CommandList>
          {loading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading...</div>
          ) : players.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            players.map((player) => (
              <CommandItem
                key={player.id}
                onSelect={() => handleNavigate(player.id)}
                className="flex items-center justify-between gap-2 px-2 py-1 hover:bg-gray-100 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={player.images[0]}
                    alt={player.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{player.name}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </CommandItem>
            ))
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBox
