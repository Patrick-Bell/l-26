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
import Dashboard from "./dashboard/Dashboard"
import logo from '../../assets/image.png'
import PageNotFound from "./dashboard/PageNotFound"
import PlayerComparison from "./compare/PlayerComparison"
import Awards from "./awards/Awards"
import POTM from "./potm/POTM"
import TwentyFiveTable from "./2025/2025Table"
import TwentyFourTable from "./2024/2024Table"
import TwentyFiveAwards from "./2025/2025Awards"
import TwentyFourAwards from "./2024/2024Awards"


const Page = () => {
  const location = useLocation()
  const [section, setSection] = useState("Dashboard")


  // Map routes to section names
  useEffect(() => {
    const path = location.pathname

    switch (true) {
      case path === "/":
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
      case path === '/2024-table':
        setSection("2024 Table")
        break
      case path === '/2025-table':
        setSection("2025 Table")
        break
        case path === '/2025-awards':
        setSection("2025 Awards")
        break
        case path === '/2024-awards':
        setSection("2024 Awards")
        break
      default:
        setSection("Lego League")
    }
  }, [location.pathname])

  useEffect(() => {
    document.title = `${section} | Lego League - 26`
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
        <title>{`${section} | Lego League 2026`}</title>
        <link rel="icon" href={logo} />
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
                  <BreadcrumbLink href='/'>
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


        <div className="p-6 w-full">
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<DynamicPlayersPage />} />
              <Route path="/team-generator" element={<TeamGenerator />} />
              <Route path="/table" element={<Table />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:id" element={<DynamicMatchReport />} />
              <Route path="/leaderboard" element={<PlayerLeaderboard />} />
              <Route path="/referee" element={<RefereeLeaderboard />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="player-comparison" element={<PlayerComparison />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/potm" element={<POTM />} /> 

              <Route path="/2025-table" element={<TwentyFiveTable />} />
              <Route path="/2025-awards" element={<TwentyFiveAwards />} />


              <Route path="/2024-table" element={<TwentyFourTable />} />
              <Route path="/2024-awards" element={<TwentyFourAwards />} />

          </Routes>
            
        </div>
      </SidebarInset>
    </SidebarProvider>

    
    </>
  )
}

export default Page
