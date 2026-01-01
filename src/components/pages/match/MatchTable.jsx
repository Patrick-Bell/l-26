import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allPlayers } from '../../api/Players';

const MatchTable = ({ match }) => {
  const [selectedMonth, setSelectedMonth] = useState('overall');
  const navigate = useNavigate();

  // 🛡 Guard: prevent crash if match is not ready
  const matchPlayers = useMemo(() => {
    if (!match?.team1 || !match?.team2) return new Set();
    return new Set([...match.team1, ...match.team2]);
  }, [match]);

  const isInMatch = (playerName) => matchPlayers.has(playerName);

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
  }, [selectedMonth]);
  

  // 🎨 Row color logic
  const getRowStyle = (index) => {
    const pos = index + 1;
    const total = tableData.length;

    if (pos === 1) return 'border-l-amber-400';
    if (pos === 2) return 'border-l-zinc-400';
    if (pos === 3) return 'border-l-orange-400';
    if (pos >= 4 && pos <= 10) return 'border-l-blue-400';
    if (pos >= 11 && pos <= 15) return 'border-l-emerald-400';
    if (pos > total - 10) return 'border-l-rose-400';
    return 'border-l-transparent';
  };

  return (
    <div className="min-h-screen pb-20">
      <main className="mx-auto">
        <div className="bg-white rounded-md border border-zinc-200 overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full border-collapse min-w-[850px] text-center">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50">
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 w-12">#</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400 text-left sticky left-0 bg-zinc-50 z-30">
                    Player
                  </th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-400">GP</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-emerald-600">W</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-500">D</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-rose-500">L</th>
                  <th className="px-2 py-4 text-[9px] font-black uppercase text-zinc-900">PTS</th>
                  <th className="px-4 py-4 text-[9px] font-black uppercase text-zinc-400">Form</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-50">
                {tableData.map((player, index) => {
                  const featured = isInMatch(player.name);

                  return (
                    <tr
                      key={player.id}
                      className={`
                        transition-all border-l-[4px]
                        ${getRowStyle(index)}
                        ${featured ? 'bg-gray-50 ring-1 ring-gray-200' : 'opacity-30'}
                      `}
                    >
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black">
                          {index + 1}
                        </span>
                      </td>

                      <td 
                      className={`px-4 py-4 sticky left-0 z-10 text-left min-w-[180px] ${featured ? 'bg-gray-50 ring-1 ring-gray-200' : 'bg-white'}`}>
                        <div 
                        onClick={() => navigate(`/players/${player.id}`)}
                        className="flex items-center gap-3 cursor-pointer ">
                          <img
                            src={player.image}
                            className="w-10 h-12 object-cover rounded-lg bg-zinc-100"
                            alt=""
                          />
                          <div className="min-w-0">
                            <h3 className="text-xs font-black uppercase truncate leading-none mb-1">
                              {player.name}
                            </h3>
                            <div className="flex items-center gap-1.5">
                              <img
                                src={player.nationality}
                                className="w-3 h-2 rounded-sm"
                                alt=""
                              />
                              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">
                                {player.position}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-4 text-xs font-black text-zinc-600">
                        {player.gamesPlayed}
                      </td>
                      <td className="px-2 py-4 text-xs font-black text-emerald-600">
                        {player.wins}
                      </td>
                      <td className="px-2 py-4 text-xs font-black text-zinc-400">
                        {player.draws}
                      </td>
                      <td className="px-2 py-4 text-xs font-black text-rose-400">
                        {player.losses}
                      </td>
                      <td className="px-2 py-4">
                        <span className="inline-block bg-zinc-900 text-white text-xs font-black px-2 py-1 rounded-md min-w-[28px]">
                          {player.points}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {player.form.map((res, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-sm flex items-center justify-center text-[7px] font-black ${
                                res === 'W'
                                  ? 'bg-emerald-500 text-white'
                                  : res === 'D'
                                  ? 'bg-zinc-200 text-zinc-500'
                                  : 'bg-rose-500 text-white'
                              }`}
                            >
                              {res}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MatchTable;
