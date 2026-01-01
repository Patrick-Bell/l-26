import React, { useMemo } from 'react';
import { Shield, Scale, Target, Trophy, Layers, Activity, Hammer } from 'lucide-react';
import { allMatches } from '../../api/Matches';

const RefereeLeaderboard = () => {
  const mainReferees = ["Krusty", "Refil", "Headband"];

  const refereeStats = useMemo(() => {
    return mainReferees.map(refName => {
      const officiatedMatches = allMatches.filter(m => m.referee === refName);
      const appearances = officiatedMatches.length;

      // 1. Calculate Cards
      const yellowCount = officiatedMatches.reduce((sum, m) => sum + (m.yellows?.length || 0), 0);
      const redCount = officiatedMatches.reduce((sum, m) => sum + (m.reds?.length || 0), 0);
      const totalCards = yellowCount + redCount;

      // 2. Calculate Penalties Given
      const totalPens = officiatedMatches.reduce((sum, m) => {
        const scoredPens = m.goals?.filter(g => g.special === "Penalty").length || 0;
        const missedPens = m.penalties_missed?.length || 0;
        return sum + scoredPens + missedPens;
      }, 0);

      // 3. Goals Involved (Total goals scored in all their matches)
      const goalsInvolved = officiatedMatches.reduce((sum, m) => 
        sum + (m.team1_score || 0) + (m.team2_score || 0), 0
      );

      const getRatio = (val) => appearances > 0 ? (val / appearances).toFixed(2) : "0.00";

      return {
        name: refName,
        apps: appearances,
        yellows: yellowCount,
        reds: redCount,
        totalCards,
        pens: totalPens,
        goalsInvolved,
        yPg: getRatio(yellowCount),
        rPg: getRatio(redCount),
        pPg: getRatio(totalPens),
        gPg: getRatio(goalsInvolved),
        cPg: getRatio(totalCards)
      };
    }).sort((a, b) => b.apps - a.apps);
  }, [allMatches]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans pb-20 selection:bg-zinc-100">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 border-b border-zinc-100 pb-4">
      <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Hammer className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Match Officials</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>
        <Scale className="w-5 h-5 text-zinc-300" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {refereeStats.map((ref) => (
          <div key={ref.name} className="border border-zinc-100 rounded-2xl overflow-hidden bg-white transition-shadow">
            
            {/* Top Identity Bar */}
            <div className="px-5 py-4 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xs font-black uppercase tracking-tight">{ref.name}</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Layers className="w-2.5 h-2.5 text-zinc-400" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{ref.apps} Appearances</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Matrix */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <HighlightBox 
                  label="Total Cards" 
                  value={ref.totalCards} 
                  ratio={ref.cPg} 
                  icon={<Activity className="w-3 h-3 text-zinc-400" />} 
                />
                <HighlightBox 
                  label="Goals Involved" 
                  value={ref.goalsInvolved} 
                  ratio={ref.gPg} 
                  icon={<Trophy className="w-3 h-3 text-zinc-400" />} 
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <MiniStat label="Yellow" value={ref.yellows} ratio={ref.yPg} color="bg-amber-400" />
                <MiniStat label="Red" value={ref.reds} ratio={ref.rPg} color="bg-red-500" />
                <MiniStat label="Pens" value={ref.pens} ratio={ref.pPg} icon={<Target className="w-2.5 h-2.5 text-emerald-500" />} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MINI COMPONENTS
const HighlightBox = ({ label, value, ratio, icon }) => (
  <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
    <div className="flex items-center gap-2 mb-1.5">
      {icon}
      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{label}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-black italic tracking-tighter tabular-nums text-zinc-900">{value}</span>
      <span className="text-[9px] font-bold text-zinc-400 tabular-nums uppercase tracking-tighter">Avg: {ratio}</span>
    </div>
  </div>
);

const MiniStat = ({ label, value, ratio, color, icon }) => (
  <div className="flex flex-col items-center justify-center p-2 border border-zinc-50 rounded-lg">
    <div className="flex items-center gap-1.5 mb-1 text-[7px] font-black uppercase text-zinc-400 tracking-tighter">
      {color ? <div className={`w-1.5 h-2 ${color} rounded-[1px]`} /> : icon}
      {label}
    </div>
    <div className="text-xs font-black tabular-nums">{value}</div>
    <div className="text-[7px] font-bold text-zinc-300 tabular-nums">({ratio})</div>
  </div>
);

export default RefereeLeaderboard;