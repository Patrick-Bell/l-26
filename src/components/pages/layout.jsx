import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"
import AppSidebar from "../sidebar/AppSidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Routes, Route } from "react-router-dom"
import SearchBox from "../sidebar/SearchBox"
import { useHotkeys } from "react-hotkeys-hook"
import PlayersPage from "./players/PlayerPage"
import DynamicPlayersPage from "./players/DynamicPlayerPage"
import TeamGenerator from "./team_generator/TeamGenerator"
import Table from "./table/Table"
import Matches from "./match/Matches"
import DynamicMatchReport from "./match/DynamicMatchReport"
import PlayerLeaderboard from "./leaderboard/Leaderboard"
import RefereeLeaderboard from "./referee/RefereeStats"


const Page = () => {
  const location = useLocation()
  const [section, setSection] = useState("Table")


  // Map routes to section names
  useEffect(() => {
    const path = location.pathname

    switch (true) {
      case path === "/dashboard":
        setSection("Dashboard")
        break
      case path === "/players":
        setSection("Players")
        break
      case path.startsWith("/players/"):
        setSection("Player")
        break
      case path === "/matches":
        setSection("Matches")
        break
      case path.startsWith("/matches/"):
        setSection("Match")
        break
      case path === "/table":
        setSection("Table")
        break
      case path === "/team-generator":
        setSection("Generator")
        break
      case path === "/referee":
        setSection("Referees")
        break
      case path === '/leaderboard':
        setSection("Leaderboards")
        break
      default:
        setSection("Bandstand Merchandise Services")
    }
  }, [location.pathname])

  useEffect(() => {
    document.title = `${section} | Lego League - 25/26`
  }, [section])



  useHotkeys("ctrl+r, meta+r", (e) => {
    e.preventDefault()
    window.location.href = '/account'
  },
)

  return (
    <>
    <Helmet>
        <meta name="description" content={`View the ${section} section`} />
        <title>{`${section} | Lego League 25/26`}</title>
      </Helmet>


      <SidebarProvider>
      
      <AppSidebar />

      <SidebarInset>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-4 bg-white/80 backdrop-blur-sm border-b">
      {/* Left side: sidebar trigger + breadcrumb */}
          <div className="flex items-center gap-3">
            <SidebarTrigger className="ml-1" />
            <Separator orientation="vertical" className="h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/dashboard'>
                    Lego League
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{section}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side: Search in corner */}
          <div className="flex items-center">
            <SearchBox />
          </div>
        </header>


        <div className="flex-1 p-6 w-full">
          <Routes>
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<DynamicPlayersPage />} />
              <Route path="/team-generator" element={<TeamGenerator />} />
              <Route path="/table" element={<Table />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:id" element={<DynamicMatchReport />} />
              <Route path="/leaderboard" element={<PlayerLeaderboard />} />
              <Route path="/referee" element={<RefereeLeaderboard />} />
          </Routes>
            
        </div>
      </SidebarInset>
    </SidebarProvider>

    
    </>
  )
}

export default Page
