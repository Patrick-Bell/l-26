import React, { useState, useMemo } from 'react';
import { Trophy, TrendingUp, Filter, Target, Zap, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allPlayers } from '../../api/Players';
import TableInfo from '../dialog/TableInfo';

const Table = () => {
  const [selectedMonth, setSelectedMonth] = useState('overall');
  const navigate = useNavigate();

  const availableMonths = useMemo(() => {
    if (allPlayers.length === 0) return [];
    const months = allPlayers[0].monthlyData.slice(1).map(m => m.month);
    return ['overall', ...months];
  }, []);

  const tableData = useMemo(() => {
    return allPlayers
      .map(player => {
        const monthData =
          selectedMonth === 'overall'
            ? player.monthlyData?.find(m => m.month === 'overall')
            : player.monthlyData?.find(m => m.month === selectedMonth);
  
        const safeMonthData = monthData ?? {};
  
        const wins = player.form.filter(r => r === 'W').length;
        const draws = player.form.filter(r => r === 'D').length;
        const losses = player.form.filter(r => r === 'L').length;
        const totalGames = wins + draws + losses;
  
        return {
          id: player.id,
          name: player.name,
          position: player.position,
          image: player.images?.[0] ?? null,
          nationality: player.nationality,
  
          gamesPlayed: safeMonthData.appearances ?? totalGames,
          wins: safeMonthData.wins ?? wins,
          draws: safeMonthData.draws ?? draws,
          losses: safeMonthData.losses ?? losses,
  
          points: safeMonthData.points ?? 0,
          goals: safeMonthData.goals ?? 0,
          assists: safeMonthData.assists ?? 0,
          winPercentage: safeMonthData.win_percentage ?? 0,
  
          form: player.form.slice(-5),
          potm: player.potm,
          cleanSheets: safeMonthData.clean_sheets ?? 0,
          motm: safeMonthData.motm ?? 0,
          yellowCards: safeMonthData.yellow_cards ?? 0,
        };
      })
      .sort((a, b) =>
        b.points - a.points ||
        a.gamesPlayed - b.gamesPlayed ||
        b.motm - a.motm ||
        b.cleanSheets - a.cleanSheets ||
        a.yellowCards - b.yellowCards
      );
  }, [allPlayers, selectedMonth]);
  

  // COLOR LOGIC FOR ROWS
  const getRowStyle = (index) => {
    const total = tableData.length;
    const pos = index + 1;

    if (pos === 1) return 'border-l-amber-400'; // Gold
    if (pos === 2) return 'border-l-zinc-400';   // Silver
    if (pos === 3) return 'border-l-orange-400'; // Bronze
    if (pos >= 4 && pos <= 10) return 'border-l-blue-400'; // Blue Zone
    if (pos >= 11 && pos <= 15) return 'border-l-emerald-400'; // Green Zone
    if (pos > total - 10) return 'border-l-red-400'; // Bottom 10
    return 'border-l-transparent';
  };

  const getRankBadge = (index) => {
    const pos = index + 1;
    if (pos === 1) return 'bg-amber-400 text-amber-950 ring-1 ring-amber-500/50';
    if (pos === 2) return 'bg-zinc-300 text-zinc-800 ring-1 ring-zinc-400/50';
    if (pos === 3) return 'bg-orange-400 text-orange-950 ring-1 ring-orange-500/50';
    if (pos >= 4 && pos <= 10) return 'bg-blue-400 text-blue-950 ring-1 ring-blue-500/50';
    if (pos >= 11 && pos <= 15) return 'bg-emerald-400 text-emerald-950 ring-1 ring-emerald-500/50';
    if (pos >= 63 && pos <= 72) return 'bg-red-400 text-red-950 ring-1 ring-red-500/50';

    return 'bg-zinc-100 text-zinc-500';
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b border-zinc-200 sticky top-2 z-40">
        <div className="mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Trophy className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">League Standings</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>
          <div className="flex-1 sm:flex-none flex items-center gap-2 bg-zinc-100 rounded-xl px-3 py-2 border border-zinc-200">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent text-[11px] font-black uppercase outline-none w-full cursor-pointer"
            >
              {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto py-6 space-y-4">
    
      <div className='flex w-full items-center justify-between'>
        {/* Status Key */}
        <div className="bg-white p-3 rounded-md border border-zinc-200 flex flex-wrap gap-4 items-center flex-1 overflow-scroll">
          <div className="text-[9px] font-black uppercase text-zinc-400 flex items-center gap-1">
            <Info className="w-3 h-3" /> Status Key:
          </div>
          {[
            { label: 'Champion', color: 'bg-amber-400' },
            { label: 'Runner Up', color: 'bg-zinc-300' },
            { label: 'Third', color: 'bg-orange-400' },
            { label: 'Top 10', color: 'bg-blue-400' },
            { label: '11-15', color: 'bg-emerald-400' },
            { label: 'Relegation', color: 'bg-red-400' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-[9px] font-black uppercase text-zinc-600">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Info button */}
        <div className="ml-4 flex-shrink-0">
          <TableInfo />
        </div>
      </div>


        <div className="bg-white rounded-md border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full border-collapse min-w-[850px] text-center">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 w-12">#</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 text-left sticky left-0 bg-zinc-50 z-30">Player</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-400">GP</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-emerald-600">W</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-500">D</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-rose-500">L</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-900">PTS</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400">Form</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400">G/A</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {tableData.map((player, index) => (
                  <tr key={player.id} className={`group transition-all border-l-[4px] ${getRowStyle(index)}`}>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black ${getRankBadge(index)}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-4 sticky left-0 z-10 text-left min-w-[180px] bg-white">
                      <div onClick={() => navigate(`/players/${player.id}`)} className="flex items-center gap-3 bg-white blur-10 cursor-pointer">
                        <img src={player.image} className="w-10 h-12 object-cover rounded-lg bg-zinc-100" alt="" />
                        <div className="min-w-0">
                          <h3 className="text-xs font-black uppercase truncate leading-none mb-1">{player.name}</h3>
                          <div className="flex items-center gap-1.5">
                            <img src={player.nationality} className="w-3 h-2 rounded-sm" alt="" />
                            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">{player.position}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 text-xs font-black text-zinc-600">{player.gamesPlayed}</td>
                    <td className="px-2 py-4 text-xs font-black text-emerald-600">{player.wins}</td>
                    <td className="px-2 py-4 text-xs font-black text-zinc-400">{player.draws}</td>
                    <td className="px-2 py-4 text-xs font-black text-rose-400">{player.losses}</td>
                    <td className="px-2 py-4">
                      <span className="inline-block bg-zinc-900 text-white text-xs font-black px-2 py-1 rounded-md min-w-[28px]">{player.points}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        {player.form.map((res, i) => (
                          <div key={i} className={`w-4 h-4 rounded-sm flex items-center justify-center text-[7px] font-black ${
                            res === 'W' ? 'bg-emerald-500 text-white' : res === 'D' ? 'bg-zinc-200 text-zinc-500' : 'bg-rose-500 text-white'
                          }`}>{res}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <div className="flex items-center gap-0.5 bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-black">
                          <Target className="w-2.5 h-2.5" /> {player.goals}
                        </div>
                        <div className="flex items-center gap-0.5 bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-black">
                          <Zap className="w-2.5 h-2.5" /> {player.assists}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button onClick={() => navigate(`/players/${player.id}`)} className="p-2 hover:bg-zinc-200/50 rounded-full transition-colors inline-block">
                        <ChevronRight className="w-4 h-4 text-zinc-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Table;