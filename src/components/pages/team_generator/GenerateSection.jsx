import PlayerCard from "./PlayerCard"
import { Shuffle, Users } from "lucide-react"

const GenerateSection = ({ activeTab, showTeams, isGenerating, positions, teams, revealedPositions }) => {

    return (
        <>
        {activeTab === 'generate' && (
            <>
              {!showTeams && !isGenerating && (
                <div className="bg-white rounded-2xl p-8 border border-zinc-200 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-2xl mb-4">
                    <Shuffle className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h2 className="text-lg font-black uppercase mb-2">Ready to Generate</h2>
                  <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide leading-relaxed max-w-md mx-auto mb-6">
                    Click the button to generate the teams.
                  </p>
                  
                  {/* Position legend */}
                  <div className="pt-6 border-t border-zinc-100">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-3">Positions</p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {positions.map(pos => (
                        <div key={pos.key} className="flex items-center gap-1.5 bg-zinc-50 px-3 py-2 rounded-lg border border-zinc-100">
                          <pos.icon className="w-3 h-3 text-zinc-400" />
                          <span className="text-[9px] font-bold text-zinc-600 uppercase">{pos.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {showTeams && teams && (
                <div className="space-y-4">
                  {/* Home Team */}
                  <div className="rounded-2xl border border-zinc-200 p-4 bg-white">
                    <div className="bg-zinc-100 rounded-xl p-3 mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-200">
                          <span className="text-sm font-black">1</span>
                        </div>
                        <h2 className="text-base font-black uppercase tracking-tight">Home Team</h2>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900">
                        <Users className="w-3 h-3 text-white"/>
                        <span className="text-[9px] font-black text-white">{Object.keys(teams.team1).length}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {positions.map((pos, index) => (
                        <div key={`team1-${pos.key}`} className="flex-1 min-w-[90px]">
                          <PlayerCard
                            player={teams.team1[pos.key]}
                            position={pos}
                            revealed={revealedPositions.has(index)}
                            teamColor="border border-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VS Divider */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-zinc-200" />
                    </div>
                    <div className="relative bg-zinc-50 px-4">
                      <div className="bg-zinc-900 rounded-xl px-6 py-2 shadow-sm">
                        <span className="text-xs font-black text-white uppercase tracking-wider">VS</span>
                      </div>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="rounded-2xl border border-zinc-200 p-4 bg-white">
                    <div className="bg-zinc-100 rounded-xl p-3 mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-200">
                          <span className="text-sm font-black">2</span>
                        </div>
                        <h2 className="text-base font-black uppercase tracking-tight">Away Team</h2>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900">
                        <Users className="w-3 h-3 text-white" />
                        <span className="text-[9px] font-black text-white">{Object.keys(teams.team2).length}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {positions.map((pos, index) => (
                        <div key={`team2-${pos.key}`} className="flex-1 min-w-[90px]">
                          <PlayerCard
                            player={teams.team2[pos.key]}
                            position={pos}
                            revealed={revealedPositions.has(index)}
                            teamColor="border-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
    )
}

export default GenerateSection