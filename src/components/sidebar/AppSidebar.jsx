"use client"
import React, { useEffect, useState } from "react"
import {
  Bot,
  Frame,
  Hammer,
  LayoutDashboard,
  Table,
  User,
  Users,
  Volleyball,
} from "lucide-react"

import NavMain from './NavMain'
import NavUser from './NavUser'
import NavProjects from "./NavProjects"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import "driver.js/dist/driver.css";
import { useHotkeys } from "react-hotkeys-hook"
import { allPlayers } from "../api/Players"
import { allMatches } from "../api/Matches"

const AppSidebar = () => { 
    
  const data = {
    user: {
      name: "Guest",
      email: "guest@example.com",
      avatar: "/avatars/default.jpg",
    },
    
    navMain: [
      {
        title: "Players",
        url: "#",
        icon: Users,
        isActive: true,
        items: [
          {
            title: "All Players",
            url: "/players", // Link to the page showing all workers
          },
          ...allPlayers.map((player) => ({
            title: player.name,
            url: `/players/${player.id}`, // Link to the individual worker's page
          })
          )
        ]
        
      },
      {
        title: "Matches",
        url: "#",
        icon: Volleyball,
        items: [
          {
            title: "All Matches",
            url: "/matches", // Link to the page showing all workers
          },
          ...allMatches.map((match) => ({
            title: match.date,
            url: `/matches/${match.id}`, // Link to the individual worker's page
          })
          )
        ]
      },
    ],
    projects: [
      {
        name: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
      },
      {
        name: "Generator",
        url: "/team-generator",
        icon: Bot,
      },
      {
        name: "Leaderboard",
        url: "/leaderboard",
        icon: Frame,
      },
      {
        name: "Table",
        url: "/table",
        icon: Table,
      },
      {
        name: "Referee",
        url: "/referee",
        icon: Hammer,
      },
    ],
    account: [
      {
        name: "Profile",
        url: "/account",
        icon: User,
      },
      ]
  }

  useHotkeys("ctrl+h, meta+h", (e) => {
    e.preventDefault()
    playTutorial()
  },
)


  return (
    <Sidebar>
      <SidebarContent>
        <div id="projects">
        <NavProjects projects={data.projects} name={'Main'} />
        </div>
        <div id="main">
        <NavMain items={data.navMain} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
