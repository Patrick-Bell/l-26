import { ChevronRight } from "lucide-react"
import { allMatches } from "../../api/Matches"
import { useNavigate } from "react-router-dom"

const PlayerMatches = ({ player }) => {

    const navigate = useNavigate()

  const findMatches = () => {
    const playerName = player?.name

    if (!playerName) return []

    return allMatches.filter(match =>
      match.team1.includes(playerName) ||
      match.team2.includes(playerName)
    )
  }

  const determineResult = (match, playerName) => {
    const isTeam1 = match.team1.includes(playerName)
    const team1Score = match.team1_score
    const team2Score = match.team2_score

    if (team1Score === team2Score) {
      return 'D' // Draw
    } else if ((isTeam1 && team1Score > team2Score) || (!isTeam1 && team2Score > team1Score)) {
      return 'W' // Win
    } else {
      return 'L' // Loss
    }
  }

  const playerMatches = findMatches()

  return (
    <>
      {playerMatches.length > 0 ? (
        <>
          <div className="bg-white rounded-md border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full border-collapse min-w-[850px] text-center">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 w-20">Match #</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 text-center">Date</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-400">Result</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-400">Points</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-400">MOTM</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {playerMatches.map((match, index) => (
                  <tr key={match.id} className={`group transition-all`}>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-2 py-4 text-xs font-black text-zinc-600">{match.date}</td>
                    <td className="px-2 py-4 text-xs font-black">{match.team1_score} - {match.team2_score}</td>
                    <td className="px-2 py-4 text-xs font-black">{determineResult(match, player.name)}</td>
                    <td className="px-2 py-4 text-xs font-black ">{match.motm}</td>
                    <td className="px-4 py-4 text-right">
                      <button onClick={() => navigate(`/matches/${match.id}`)} className="p-2 hover:bg-zinc-200/50 rounded-full transition-colors inline-block">
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
      ) : (
        <p className="text-xs text-gray-600 font-bold uppercase tracking-wide">{player.name} has played no matches.</p>
      )}
    </>
  )
}

export default PlayerMatches
