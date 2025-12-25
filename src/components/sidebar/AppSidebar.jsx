"use client"
import React, { useEffect, useState } from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Briefcase,
  ChartArea,
  Command,
  Frame,
  GalleryVerticalEnd,
  Hammer,
  HelpCircle,
  LayoutDashboard,
  Map,
  PieChart,
  Send,
  Settings2,
  ShoppingCart,
  SquareTerminal,
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
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useHotkeys } from "react-hotkeys-hook"
import { allPlayers } from "../api/Players"
import { allMatches } from "../api/Matches"

const AppSidebar = () => {

 
    const playTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      allowClose: false,
      popoverClass: 'driverjs-theme',
      steps: [
        { popover: { title: 'Welcome to the Application!', description: 'Please take 2 mins to have a quick tour. This tutorial will explain what each page does.' } },
        { element: '#projects-0', popover: { title: 'Dashboard', description: 'This page will provide you a summary of key details such as upcoming games, workers, recent games and overall stats.' } },
        { element: '#projects-1', popover: { title: 'Fixtures', description: 'This page will show you all past and upcoming fixtures. You can add events to your calendar.' } },
        { element: '#projects-2', popover: { title: 'Analytics', description: 'This page provides key stats into best and worst performers, as well as global stats such as programmes sold. You will find a breakdown of units sold per month and can view more into the last 3-6 months performances.' } },
        { element: '#main-0', popover: { title: 'Workers', description: 'Click here to see all workers where you can click "Add Worker" to add a new worker. You can also select an individual worker to view all their games and performace levels since they have started working. You can mark workers as "watched" to easily track them across events and the application.' } },
        { element: '#main-1', popover: { title: 'Games', description: 'Click here to see all events where you can click "Add Game" to add a new game. Here, you can click add carts to begin populating the event. When you add a cart, this will automatically associate the chosen worker to the cart and create the profile. You can download a summary of the event once you have added all carts in a PDF format.' } },
        { element: '#main-2', popover: { title: 'Managers', description: 'Click to see all managers, you can add a manager and view the events they have managed.' } },
        { element: '#search-btn', popover: { title: 'Search Button', description: 'A powerful search feature that allows you search for workers, games and managers all in one place.' } },
        { popover: { title: 'Completed!', description: 'Thank you for completing the tutorial. Click "Done" to continue.' } },
      ],
    });
  
    driverObj.drive();

    tutorialComplete()
  
  }

  const tutorialComplete = () => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 30);
    document.cookie = `tutorialCompleted=true; expires=${expires.toUTCString()}; path=/`;
  };
  
  useEffect(() => {
  const hasCompletedTutorial = document.cookie
  .split('; ')
  .some((row) => row.startsWith('tutorialCompleted='));

  if (!hasCompletedTutorial) playTutorial()
  }, [])
  
    
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
        name: "Generator",
        url: "/team-generator",
        icon: LayoutDashboard,
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
