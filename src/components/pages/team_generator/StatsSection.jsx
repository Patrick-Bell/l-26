import { BarChart3, Hammer, Target, Zap, Trophy } from "lucide-react";

const StatsSection = ({ getMatchStats, getPredictedWinner, activeTab, teams, matches }) => {

    return (

        <>
         {activeTab === 'stats' && teams && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Team Comparison
                </h3>
                
                <div className="space-y-4">
                  {(() => {
                    const stats = getMatchStats();
                    return (
                      <>
                        {/* Total Goals */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Target className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-[10px] font-bold text-zinc-600 uppercase">Total Goals</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-zinc-900">{stats.team1Goals}</span>
                              <span className="text-[9px] text-zinc-400">-</span>
                              <span className="text-sm font-black text-zinc-900">{stats.team2Goals}</span>
                            </div>
                          </div>
                          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden flex">
                            <div 
                              className="bg-zinc-900 transition-all duration-1000" 
                              style={{ 
                                width: `${(stats.team1Goals / (stats.team1Goals + stats.team2Goals)) * 100}%` 
                              }}
                            />
                            <div className="bg-zinc-400 flex-1" />
                          </div>
                        </div>

                        {/* Total Assists */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Zap className="w-3.5 h-3.5 text-amber-600" />
                              <span className="text-[10px] font-bold text-zinc-600 uppercase">Total Assists</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-zinc-900">{stats.team1Assists}</span>
                              <span className="text-[9px] text-zinc-400">-</span>
                              <span className="text-sm font-black text-zinc-900">{stats.team2Assists}</span>
                            </div>
                          </div>
                          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden flex">
                            <div 
                              className="bg-zinc-900 transition-all duration-1000" 
                              style={{ 
                                width: `${(stats.team1Assists / (stats.team1Assists + stats.team2Assists)) * 100}%` 
                              }}
                            />
                            <div className="bg-zinc-400 flex-1" />
                          </div>
                        </div>

                        {/* Avg Win Rate */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Trophy className="w-3.5 h-3.5 text-amber-500" />
                              <span className="text-[10px] font-bold text-zinc-600 uppercase">Average Win Rate</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-zinc-900">{stats.team1WinRate}%</span>
                              <span className="text-[9px] text-zinc-400">-</span>
                              <span className="text-sm font-black text-zinc-900">{stats.team2WinRate}%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden flex">
                            <div className="bg-zinc-900 transition-all duration-1000" style={{ width: '50%' }} />
                            <div className="bg-zinc-400 flex-1" />
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Predicted Winner
                </h3>
                {(() => {
                  const prediction = getPredictedWinner();

                  if (!prediction) return null;

            return (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-bold uppercase tracking-wide">
                  The Generator predicts a win for the {prediction.winner}.
                </span>

                {prediction.winner !== 'Draw' && (
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">
                    +{prediction.confidence}% win rate
                  </span>
                    )}
                  </div>
                );
                })()}

                </div>

                <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
                  <Hammer className="w-4 h-4" />
                  Referee
                </h3>
                <span className="text-xs text-gray-600 font-bold uppercase tracking-wide">
                  {matches.length % 2 === 0 ? 'The referee for this game is Headband.' : 'The referee for this game is Refil.'}
                </span>
                </div>


            </div>
          )}
        </>
    )
}

export default StatsSection