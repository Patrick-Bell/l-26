import React, { useState } from 'react';
import { Users, TrendingUp, Trophy, Target, Award, Shield, X, ChevronDown } from 'lucide-react';
import { allPlayers } from '../../api/Players';

const PlayerComparison = () => {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const getOverallStats = (player) => {
    return player.monthlyData.find(m => m.month === 'overall') || {};
  };

  const getWinRate = (stats) => {
    const total = stats.wins + stats.draws + stats.losses;
    return total > 0 ? ((stats.wins / total) * 100).toFixed(1) : '0.0';
  };

  const getPointsPerGame = (stats) => {
    const total = stats.wins + stats.draws + stats.losses;
    return total > 0 ? (stats.points / total).toFixed(2) : '0.00';
  };

  const getGoalsPerGame = (stats) => {
    const total = stats.wins + stats.draws + stats.losses;
    return total > 0 ? (stats.goals / total).toFixed(2) : '0.00';
  };

  const compareValue = (val1, val2) => {
    if (val1 > val2) return 'text-green-600';
    if (val1 < val2) return 'text-red-600';
    return 'text-zinc-900';
  };

  const PlayerSelector = ({ player, setPlayer, showDropdown, setShowDropdown, label }) => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full bg-white border border-zinc-200 rounded-lg p-2 flex items-center justify-between hover:border-zinc-900 transition-colors"
      >
        {player ? (
          <div className="flex items-center gap-2">
            <img src={player.images[0]} alt={player.name} className="w-7 h-7 rounded-full object-cover" />
            <div className="text-left">
              <div className="text-xs font-black italic text-zinc-900">{player.name}</div>
              <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{player.position}</div>
            </div>
          </div>
        ) : (
          <span className="text-xs font-bold text-zinc-400 italic">{label}</span>
        )}
        <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {showDropdown && (
        <div className="absolute top-full mt-1 w-full bg-white border border-zinc-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
          {allPlayers.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPlayer(p);
                setShowDropdown(false);
              }}
              className="w-full p-2 flex items-center gap-2 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0"
            >
              <img src={p.images[0]} alt={p.name} className="w-6 h-6 rounded-full object-cover" />
              <div className="text-left">
                <div className="text-[10px] font-bold italic text-zinc-900">{p.name}</div>
                <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{p.position}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const stats1 = player1 ? getOverallStats(player1) : null;
  const stats2 = player2 ? getOverallStats(player2) : null;

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Player Comparison</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>
        </div>
      </header>

      <div className="py-3">
        {/* Player Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <PlayerSelector
            player={player1}
            setPlayer={setPlayer1}
            showDropdown={showDropdown1}
            setShowDropdown={setShowDropdown1}
            label="Select Player 1"
          />
          <PlayerSelector
            player={player2}
            setPlayer={setPlayer2}
            showDropdown={showDropdown2}
            setShowDropdown={setShowDropdown2}
            label="Select Player 2"
          />
        </div>

        {player1 && player2 && (
          <>
            {/* Player Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {[player1, player2].map((player, idx) => {
                const stats = idx === 0 ? stats1 : stats2;
                return (
                  <div key={player.id} className="bg-zinc-50 rounded-xl border border-zinc-100 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={player.images[0]} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <h2 className="text-sm font-black italic text-zinc-900">{player.name}</h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <img src={player.nationality} alt="nationality" className="w-3 h-2.5 object-cover" />
                          <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">{player.position}</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Form */}
                    <div className="mb-2">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Recent Form</div>
                      <div className="flex gap-0.5">
                        {player.form.slice(-10).map((result, i) => (
                          <div
                            key={i}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-black ${
                              result === 'W' ? 'bg-green-500 text-white' :
                              result === 'D' ? 'bg-zinc-400 text-white' :
                              'bg-red-500 text-white'
                            }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-zinc-100">
                        <div className="text-base font-black italic text-zinc-900 tabular-nums">{stats.appearances}</div>
                        <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">Apps</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-zinc-100">
                        <div className="text-base font-black italic text-zinc-900 tabular-nums">{stats.goals}</div>
                        <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">Goals</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Comparison */}
            <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-3">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                Statistical Comparison
              </h3>

              {/* Comparison Rows */}
              <div className="space-y-2">
                {/* Appearances */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats1.appearances, stats2.appearances)}`}>
                      {stats1.appearances}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Appearances</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats2.appearances, stats1.appearances)}`}>
                      {stats2.appearances}
                    </div>
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats1.goals, stats2.goals)}`}>
                      {stats1.goals}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Goals</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats2.goals, stats1.goals)}`}>
                      {stats2.goals}
                    </div>
                  </div>
                </div>

                {/* Assists */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats1.assists, stats2.assists)}`}>
                      {stats1.assists}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Assists</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats2.assists, stats1.assists)}`}>
                      {stats2.assists}
                    </div>
                  </div>
                </div>

                {/* Win Rate */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(parseFloat(getWinRate(stats1)), parseFloat(getWinRate(stats2)))}`}>
                      {getWinRate(stats1)}%
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Win Rate</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(parseFloat(getWinRate(stats2)), parseFloat(getWinRate(stats1)))}`}>
                      {getWinRate(stats2)}%
                    </div>
                  </div>
                </div>

                {/* Goals Per Game */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(parseFloat(getGoalsPerGame(stats1)), parseFloat(getGoalsPerGame(stats2)))}`}>
                      {getGoalsPerGame(stats1)}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Goals/Game</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(parseFloat(getGoalsPerGame(stats2)), parseFloat(getGoalsPerGame(stats1)))}`}>
                      {getGoalsPerGame(stats2)}
                    </div>
                  </div>
                </div>

                {/* Clean Sheets (for GK) */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats1.clean_sheets, stats2.clean_sheets)}`}>
                      {stats1.clean_sheets}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Clean Sheets</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats2.clean_sheets, stats1.clean_sheets)}`}>
                      {stats2.clean_sheets}
                    </div>
                  </div>
                </div>

                {/* MOTM */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats1.motm, stats2.motm)}`}>
                      {stats1.motm}
                    </div>
                    <div className="text-center flex items-center justify-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-500" />
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">MOTM</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats2.motm, stats1.motm)}`}>
                      {stats2.motm}
                    </div>
                  </div>
                </div>

                {/* Yellow Cards */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats2.yellow_cards, stats1.yellow_cards)}`}>
                      {stats1.yellow_cards}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Yellow Cards</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats1.yellow_cards, stats2.yellow_cards)}`}>
                      {stats2.yellow_cards}
                    </div>
                  </div>
                </div>

                {/* Red Cards */}
                <div className="bg-white rounded-lg p-2 border border-zinc-100">
                  <div className="grid grid-cols-3 items-center gap-2">
                    <div className={`text-right text-base font-black italic tabular-nums ${compareValue(stats2.red_cards, stats1.red_cards)}`}>
                      {stats1.red_cards}
                    </div>
                    <div className="text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Red Cards</div>
                    </div>
                    <div className={`text-left text-base font-black italic tabular-nums ${compareValue(stats1.red_cards, stats2.red_cards)}`}>
                      {stats2.red_cards}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Record Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {[player1, player2].map((player, idx) => {
                const stats = idx === 0 ? stats1 : stats2;
                return (
                  <div key={player.id} className="bg-zinc-50 rounded-xl border border-zinc-100 p-3">
                    <div className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-2">
                      {player.name}'s Record
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-green-500 rounded-lg p-2 text-center">
                        <div className="text-lg font-black italic text-white tabular-nums">{stats.wins}</div>
                        <div className="text-[8px] font-bold text-white uppercase tracking-wider">Wins</div>
                      </div>
                      <div className="bg-zinc-400 rounded-lg p-2 text-center">
                        <div className="text-lg font-black italic text-white tabular-nums">{stats.draws}</div>
                        <div className="text-[8px] font-bold text-white uppercase tracking-wider">Draws</div>
                      </div>
                      <div className="bg-red-500 rounded-lg p-2 text-center">
                        <div className="text-lg font-black italic text-white tabular-nums">{stats.losses}</div>
                        <div className="text-[8px] font-bold text-white uppercase tracking-wider">Losses</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {(!player1 || !player2) && (
          <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-8 text-center">
            <Users className="w-10 h-10 text-zinc-300 mx-auto mb-2" />
            <p className="text-xs font-bold italic text-zinc-400">Select two players to compare</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerComparison;