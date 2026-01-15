import { allMatches } from "../../api/Matches";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Check, X as Cross } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerPlayModal = ({ positions, revealPlayers, players }) => {

    const [stats, setStats] = useState({
        totalPlayed: 0,
        percentagePlaying: 0
    })

    console.log('the players', players)
    const navigate = useNavigate()

    const findPlayerPercentage = (player) => {
        const apps = player?.monthlyData[0]?.appearances
        const totalGames = allMatches?.length

        setStats({
            totalPlayed: apps,
            percentagePlaying: ((apps / totalGames) * 100).toFixed(2)
        })
    }

    return (

        <>
        <Dialog>
      <DialogTrigger asChild>
      <div className="pt-6 border-t border-zinc-100">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-3">Positions</p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {positions.map(pos => (
                        <div onClick={() => revealPlayers(pos)} key={pos.key} className="flex items-center gap-1.5 bg-zinc-50 px-3 py-2 rounded-lg border border-zinc-100 hover:border-zinc-200 cursor-pointer transition:colors">
                          <pos.icon className="w-3 h-3 text-zinc-400" />
                          <span className="text-[9px] font-bold text-zinc-600 uppercase">{pos.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle>Players Appearance %</DialogTitle>
          <DialogDescription>
            How many times each player has played
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-6">
        <table className="w-full border-collapse min-w-[200px] text-center">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50 sticky top-0 z-40">
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 w-10 text-left">Name</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 text-right sticky left-0 bg-zinc-50 z-30">Appearances | Play %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {players
                .sort((a, b) => b.monthlyData[0].appearances - a.monthlyData[0].appearances)
                .map((player, index) => (
                  <tr key={player.id} className={`group transition-all`}>
                    <td className="px-4 py-4 sticky left-0 z-10 text-left min-w-[180px] bg-white">
                      <div onClick={() => navigate(`/players/${player.id}`)} className="flex items-center gap-3 bg-white blur-10 cursor-pointer">
                        <img src={player.images[0]} className="w-10 h-12 object-cover rounded-lg bg-zinc-100" alt="" />
                        <div className="min-w-0">
                          <h3 className="text-xs font-black uppercase truncate leading-none mb-1">{player.name}</h3>
                          <div className="flex items-center gap-1.5">
                            <img src={player.nationality} className="w-3 h-2 rounded-sm" alt="" />
                            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">{player.position}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">{player?.monthlyData[0].appearances} | {((player?.monthlyData[0].appearances / allMatches.length) * 100).toFixed(2)}%</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>


        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
        </>
    )
}

export default PlayerPlayModal