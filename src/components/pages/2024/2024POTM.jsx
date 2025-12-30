import { Medal, Trophy, Target, Zap, Shield, Award } from "lucide-react"
import { potmWinners } from "../../api/2024/2024POTM"

const TwentyFourPOTM = () => {


  const StatBadge = ({ icon: Icon, value, color, label }) => (
    <div className="flex flex-col items-center gap-1">
      <div className={`flex items-center gap-1 ${color} px-2 py-1 rounded-md`}>
        <Icon className="w-3 h-3" />
        <span className="text-xs font-black">{value}</span>
      </div>
      <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">{label}</span>
    </div>
  )

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg">
              <Medal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Player of the Month</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 24</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {potmWinners.map((winner) => (
            <div
              key={winner.id}
              className="bg-white rounded-lg border border-zinc-200 overflow-hidden"
            >
              {/* Month Header */}
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-wider text-amber-900">
                    {winner.month}
                  </h2>
                  <Trophy className="w-4 h-4 text-amber-900" />
                </div>
              </div>

              {/* Player Info */}
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={winner.player.image}
                      className="w-20 h-24 object-cover rounded-lg border-2 border-amber-400"
                      alt={winner.player.name}
                    />
                    <div className="absolute -top-2 -right-2 bg-amber-400 p-1 rounded-full border-2 border-white">
                      <Trophy className="w-3 h-3 text-amber-900" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={winner.player.nationality} className="text-lg w-3.5 h-3.5" />
                      <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-100 px-2 py-0.5 rounded">
                        {winner.player.position}
                      </span>
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-tight leading-tight mb-3">
                      {winner.player.name}
                    </h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <StatBadge 
                        icon={Target} 
                        value={winner.stats.goals} 
                        color="bg-emerald-100 text-emerald-700"
                        label="Goals"
                      />
                      <StatBadge 
                        icon={Zap} 
                        value={winner.stats.assists} 
                        color="bg-blue-100 text-blue-700"
                        label="Assists"
                      />
                      {winner.stats.cleanSheets > 0 && (
                        <StatBadge 
                          icon={Shield} 
                          value={winner.stats.cleanSheets} 
                          color="bg-purple-100 text-purple-700"
                          label="Clean Sheets"
                        />
                      )}
                      <StatBadge 
                        icon={Award} 
                        value={winner.stats.motm} 
                        color="bg-amber-100 text-amber-700"
                        label="MOTM"
                      />
                    </div>
                  </div>
                </div>

                {/* Standings Table - Always Visible */}
                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-2">
                    Month Standings
                  </h4>
                  <div className="space-y-1">
                    {winner.standings.map((row) => (
                      <div
                        key={row.pos}
                        className={`flex items-center justify-between text-[10px] py-1.5 px-2 rounded ${
                          row.pos === 1 ? 'bg-amber-50 border border-amber-200' : 'bg-zinc-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <span className={`font-black w-4 ${
                            row.pos === 1 ? 'text-amber-600' : 'text-zinc-400'
                          }`}>
                            {row.pos}
                          </span>
                          <span className="font-bold uppercase tracking-tight truncate">
                            {row.player}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-black">
                          <span className="text-emerald-600">{row.record}</span>
                          <span className={row.pos === 1 ? 'text-amber-600' : 'text-zinc-900'}>
                            {row.points}P
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mt-3 text-center">{winner.message}.</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default TwentyFourPOTM