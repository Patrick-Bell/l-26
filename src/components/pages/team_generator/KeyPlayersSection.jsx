import { Zap, Target, Trophy } from "lucide-react";

const KeyPlayersSection = ({ activeTab, getKeyPlayers, teams }) => {

    return (

        <>
        {activeTab === 'players' && teams && (
            <div className="space-y-4">
              {(() => {
                const keyPlayers = getKeyPlayers();
                return (
                  <>
                    {/* Top Scorer */}
                    {keyPlayers.topScorer && (
                      <div className="bg-white rounded-2xl p-5 border border-zinc-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-4 h-4 text-emerald-600" />
                          <h3 className="text-sm font-black uppercase">Top Scorer</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <img 
                            src={keyPlayers.topScorer.images[0]} 
                            className="w-20 h-24 object-cover rounded-xl border-2 border-zinc-100" 
                            alt={keyPlayers.topScorer.name}
                          />
                          <div className="flex-1">
                            <h4 className="text-base font-black uppercase mb-1">{keyPlayers.topScorer.name}</h4>
                            <p className="text-[9px] font-semibold text-zinc-400 uppercase mb-2">{keyPlayers.topScorer.position}</p>
                            <div className="flex gap-2">
                              <div className="bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                                <p className="text-[8px] font-bold text-emerald-600 uppercase">Goals</p>
                                <p className="text-lg font-black text-emerald-700">{keyPlayers.topScorer.monthlyData[0].goals}</p>
                              </div>
                              <div className="bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase">Assists</p>
                                <p className="text-lg font-black text-zinc-700">{keyPlayers.topScorer.monthlyData[0].assists}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Top Assister */}
                    {keyPlayers.topAssister && (
                      <div className="bg-white rounded-2xl p-5 border border-zinc-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <h3 className="text-sm font-black uppercase">Top Assister</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <img 
                            src={keyPlayers.topAssister.images[0]} 
                            className="w-20 h-24 object-cover rounded-xl border-2 border-zinc-100" 
                            alt={keyPlayers.topAssister.name}
                          />
                          <div className="flex-1">
                            <h4 className="text-base font-black uppercase mb-1">{keyPlayers.topAssister.name}</h4>
                            <p className="text-[9px] font-semibold text-zinc-400 uppercase mb-2">{keyPlayers.topAssister.position}</p>
                            <div className="flex gap-2">
                              <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                                <p className="text-[8px] font-bold text-blue-600 uppercase">Assists</p>
                                <p className="text-lg font-black text-blue-700">{keyPlayers.topAssister.monthlyData[0].assists}</p>
                              </div>
                              <div className="bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase">Goals</p>
                                <p className="text-lg font-black text-zinc-700">{keyPlayers.topAssister.monthlyData[0].goals}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Best Win Rate */}
                    {keyPlayers.topWinRate && (
                      <div className="bg-white rounded-2xl p-5 border border-zinc-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy className="w-4 h-4 text-amber-600" />
                          <h3 className="text-sm font-black uppercase">Best Win Rate</h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <img 
                            src={keyPlayers.topWinRate.images[0]} 
                            className="w-20 h-24 object-cover rounded-xl border-2 border-zinc-100" 
                            alt={keyPlayers.topWinRate.name}
                          />
                          <div className="flex-1">
                            <h4 className="text-base font-black uppercase mb-1">{keyPlayers.topWinRate.name}</h4>
                            <p className="text-[9px] font-semibold text-zinc-400 uppercase mb-2">{keyPlayers.topWinRate.position}</p>
                            <div className="flex gap-2">
                              <div className="bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                                <p className="text-[8px] font-bold text-amber-600 uppercase">Win Rate</p>
                                <p className="text-lg font-black text-amber-700">{keyPlayers.topWinRate.monthlyData[0].win_percentage.toFixed(2)}%</p>
                              </div>
                              <div className="bg-zinc-50 px-3 py-1.5 rounded-lg border border-zinc-100">
                                <p className="text-[8px] font-bold text-zinc-500 uppercase">Apps</p>
                                <p className="text-lg font-black text-zinc-700">{keyPlayers.topWinRate.monthlyData[0].appearances}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </>
    )
}

export default KeyPlayersSection