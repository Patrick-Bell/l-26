import React, { useState, useMemo } from 'react';
import { 
  Goal, Star, ShieldCheck, Flame, Medal, 
  User, CheckCircle, XCircle, TrendingUp, 
  ChartArea
} from 'lucide-react';
import { allPlayers } from '../../api/Players';

const PlayerLeaderboard = () => {
  const [activeMonth, setActiveMonth] = useState('overall');

  const months = ["overall", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

  const categories = [
    { label: "Contributors (G+A)", key: "contribution", icon: <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> },
    { label: "Goals", key: "goals", icon: <Goal className="w-3.5 h-3.5" /> },
    { label: "Assists", key: "assists", icon: <Medal className="w-3.5 h-3.5" /> },
    { label: "Appearances", key: "appearances", icon: <User className="w-3.5 h-3.5" /> },
    { label: "Wins", key: "wins", icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: "Defeats", key: "losses", icon: <XCircle className="w-3.5 h-3.5 text-red-500" /> },
    { label: "MOTM", key: "motm", icon: <Star className="w-3.5 h-3.5" /> },
    { label: "Clean Sheets", key: "clean_sheets", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  const getSortedData = (key) => {
    return [...allPlayers]
      .map(p => {
        const stats = p.monthlyData.find(m => m.month === activeMonth) || {};
        const apps = stats.appearances || 0;
        
        // 1. Calculate main value
        const value = key === 'contribution' 
          ? (stats.goals || 0) + (stats.assists || 0)
          : (stats[key] || 0);

        // 2. Calculate Ratio (Value / Appearances)
        // If apps is 0, ratio is 0 to avoid division by zero
        const ratio = apps > 0 ? (value / apps) : 0;

        return {
          name: p.name,
          flag: p.nationality,
          val: value,
          ratio: ratio.toFixed(2), // Format to 2 decimal places
          apps: apps
        };
      })
      .filter(p => p.val > 0)
      .sort((a, b) => {
        // Primary sort: Main Value
        if (b.val !== a.val) return b.val - a.val;
        // Secondary sort: Ratio (Appearances efficiency)
        return b.ratio - a.ratio;
      });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans p-4 pb-20 selection:bg-zinc-100">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
      <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><ChartArea className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Leaderboards</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">{activeMonth}</p>
            </div>
          </div>
        
        <select 
          value={activeMonth} 
          onChange={(e) => setActiveMonth(e.target.value)}
          className="text-[10px] font-black uppercase border border-zinc-200 rounded-lg px-3 py-1.5 bg-zinc-50 outline-none appearance-none cursor-pointer"
        >
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.key} className="border border-zinc-100 rounded-xl overflow-hidden bg-white shadow-sm">
            
            <div className="flex items-center justify-between px-3 py-2.5 bg-zinc-50/50 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="opacity-60">{cat.icon}</span>
                <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{cat.label}</h2>
              </div>
            </div>

            <div className="max-h-[220px] overflow-y-auto no-scrollbar">
              {getSortedData(cat.key).length > 0 ? (
                getSortedData(cat.key).map((player, idx) => (
                  <div key={`${cat.key}-${player.name}`} className="flex items-center justify-between px-3 py-2 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/80 transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold text-zinc-300 w-3 tracking-tighter">
                        {idx + 1}
                      </span>
                      <div className="w-4 h-3 rounded-[1px] overflow-hidden border border-zinc-100 shadow-sm">
                        <img src={player.flag} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="text-[10px] font-bold uppercase truncate max-w-[100px] group-hover:text-black transition-colors">
                        {player.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black tabular-nums tracking-tight">
                        {player.val}
                      </span>
                      {/* Only show ratio for performance stats, not for appearances themselves */}
                      {cat.key !== 'appearances' && (
                        <span className="text-[8px] font-bold text-zinc-400 tabular-nums">
                          ({player.ratio})
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-[9px] font-bold text-zinc-300 uppercase italic tracking-widest">
                  No Records
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerLeaderboard;