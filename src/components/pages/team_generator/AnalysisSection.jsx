import { TrendingUp } from "lucide-react";

const AnalysisSection = ({ activeTab, teams }) => {

    return (

        <>
        {activeTab === 'analysis' && teams && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-zinc-200">
                <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Team Strengths
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Home Team Analysis */}
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                    <h4 className="text-xs font-black uppercase mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-[10px] font-black">1</div>
                      Home Team
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">Total Goals</span>
                        <span className="text-sm font-black">{Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.goals || 0), 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">Total Assists</span>
                        <span className="text-sm font-black">{Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.assists || 0), 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">Avg Apps</span>
                        <span className="text-sm font-black">{Math.round(Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.appearances || 0), 0) / Object.keys(teams.team1).length)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">MOTM</span>
                        <span className="text-sm font-black">{Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.motm || 0), 0)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Away Team Analysis */}
                  <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                    <h4 className="text-xs font-black uppercase mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 bg-zinc-400 rounded-lg flex items-center justify-center text-white text-[10px] font-black">2</div>
                      Away Team
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">Total Goals</span>
                        <span className="text-sm font-black">{Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.goals || 0), 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">Total Assists</span>
                        <span className="text-sm font-black">{Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.assists || 0), 0)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">Avg Apps</span>
                        <span className="text-sm font-black">{Math.round(Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.appearances || 0), 0) / Object.keys(teams.team2).length)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-zinc-500 uppercase">MOTM</span>
                        <span className="text-sm font-black">{Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.motm || 0), 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
    )
}

export default AnalysisSection;