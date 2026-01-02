import React from 'react';
import { Trophy, Award, Target, Crown, Star, Medal, Zap, Shield, Calendar, AlertCircle, TrendingUp, Home, Plane } from 'lucide-react';
import { allPlayers } from '../../api/Players';
import { allMatches } from '../../api/Matches';

const Awards = () => {

  // Helper function to find all record holders (handles ties)
  const findRecordHolders = (players, getValue) => {
    if (players.length === 0) return [];
    
    const playersWithValues = players.map(p => ({
      player: p,
      value: getValue(p)
    })).filter(p => p.value > 0);

    if (playersWithValues.length === 0) return [];

    const maxValue = Math.max(...playersWithValues.map(p => p.value));
    return playersWithValues.filter(p => p.value === maxValue);
  };

  // Helper function to find monthly record holders (handles ties)
  const findMonthlyRecordHolders = (getValue) => {
    let maxValue = 0;
    let holders = [];
    let month = '';

    allPlayers.forEach(player => {
      player.monthlyData.forEach(monthData => {
        if (monthData.month !== 'overall') {
          const value = getValue(monthData);
          if (value > maxValue) {
            maxValue = value;
            holders = [{ player, month: monthData.month }];
          } else if (value === maxValue && value > 0) {
            holders.push({ player, month: monthData.month });
          }
        }
      });
    });

    return holders.length > 0 ? { holders, value: maxValue } : null;
  };

  // Get disciplinary records
  const getDisciplinaryRecords = () => {
    const records = [];

    // Most yellow cards
    const yellowHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.yellow_cards || 0
    );
    
    if (yellowHolders.length > 0) {
      records.push({
        title: 'Most Yellow Cards',
        subtitle: 'All-time',
        holders: yellowHolders,
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }

    // Most yellows in a month
    const monthlyYellows = findMonthlyRecordHolders(month => month.yellow_cards);
    if (monthlyYellows) {
      records.push({
        title: 'Most Yellows in a Month',
        subtitle: 'Monthly record',
        holders: monthlyYellows.holders.map(h => ({
          player: h.player,
          value: monthlyYellows.value,
          extra: h.month.charAt(0).toUpperCase() + h.month.slice(1)
        })),
        icon: <Calendar className="w-4 h-4" />,
      });
    }

    // Most red cards
    const redHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.red_cards || 0
    );
    
    if (redHolders.length > 0) {
      records.push({
        title: 'Most Red Cards',
        subtitle: 'All-time',
        holders: redHolders,
        icon: <AlertCircle className="w-4 h-4" />,
      });
    }

    return records;
  };

  // Get goal records
  const getGoalRecords = () => {
    const records = [];

    // Most goals overall
    const goalHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.goals || 0
    );
    
    if (goalHolders.length > 0) {
      records.push({
        title: 'Most Goals',
        subtitle: 'All-time',
        holders: goalHolders,
        icon: <Target className="w-4 h-4" />,
      });
    }

    // Most goals in a month
    const monthlyGoals = findMonthlyRecordHolders(month => month.goals);
    if (monthlyGoals) {
      records.push({
        title: 'Most Goals in a Month',
        subtitle: 'Monthly record',
        holders: monthlyGoals.holders.map(h => ({
          player: h.player,
          value: monthlyGoals.value,
          extra: h.month.charAt(0).toUpperCase() + h.month.slice(1)
        })),
        icon: <Calendar className="w-4 h-4" />,
      });
    }

    // Most slingers
    const slingerHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.slingers || 0
    );
    
    if (slingerHolders.length > 0) {
      records.push({
        title: 'Most Slingers',
        subtitle: 'All-time',
        holders: slingerHolders,
        icon: <Zap className="w-4 h-4" />,
      });
    }

    // Most hat-tricks
    const hatrickHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.hatricks || 0
    );
    
    if (hatrickHolders.length > 0) {
      records.push({
        title: 'Most Hat-tricks',
        subtitle: 'All-time',
        holders: hatrickHolders,
        icon: <Crown className="w-4 h-4" />,
      });
    }

    // Most penalties
    const penaltyHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.penalties || 0
    );
    
    if (penaltyHolders.length > 0) {
      records.push({
        title: 'Most Penalties',
        subtitle: 'All-time',
        holders: penaltyHolders,
        icon: <Target className="w-4 h-4" />,
      });
    }

    return records;
  };

  // Get assist records
  const getAssistRecords = () => {
    const records = [];

    // Most assists overall
    const assistHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.assists || 0
    );
    
    if (assistHolders.length > 0) {
      records.push({
        title: 'Most Assists',
        subtitle: 'All-time',
        holders: assistHolders,
        icon: <Zap className="w-4 h-4" />,
      });
    }

    // Most assists in a month
    const monthlyAssists = findMonthlyRecordHolders(month => month.assists);
    if (monthlyAssists) {
      records.push({
        title: 'Most Assists in a Month',
        subtitle: 'Monthly record',
        holders: monthlyAssists.holders.map(h => ({
          player: h.player,
          value: monthlyAssists.value,
          extra: h.month.charAt(0).toUpperCase() + h.month.slice(1)
        })),
        icon: <Calendar className="w-4 h-4" />,
      });
    }

    return records;
  };

  // Get POTM records
  const getPOTMRecords = () => {
    const records = [];

    // Most MOTM
    const motmHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.motm || 0
    );
    
    if (motmHolders.length > 0) {
      records.push({
        title: 'Most MOTM Awards',
        subtitle: 'All-time',
        holders: motmHolders,
        icon: <Star className="w-4 h-4" />,
      });
    }

    return records;
  };

  // Get game statistics records
  const getGameStatRecords = () => {
    const records = [];

    // Most appearances
    const appearanceHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.appearances || 0
    );
    
    if (appearanceHolders.length > 0) {
      records.push({
        title: 'Most Appearances',
        subtitle: 'All-time',
        holders: appearanceHolders,
        icon: <Award className="w-4 h-4" />,
      });
    }

    // Most appearances in a month
    const monthlyAppearances = findMonthlyRecordHolders(month => month.appearances);
    if (monthlyAppearances) {
      records.push({
        title: 'Most Games in a Month',
        subtitle: 'Monthly record',
        holders: monthlyAppearances.holders.map(h => ({
          player: h.player,
          value: monthlyAppearances.value,
          extra: h.month.charAt(0).toUpperCase() + h.month.slice(1)
        })),
        icon: <Calendar className="w-4 h-4" />,
      });
    }

    // Most wins
    const winHolders = findRecordHolders(
      allPlayers,
      p => p.monthlyData.find(m => m.month === 'overall')?.wins || 0
    );
    
    if (winHolders.length > 0) {
      records.push({
        title: 'Most Wins',
        subtitle: 'All-time',
        holders: winHolders,
        icon: <Trophy className="w-4 h-4" />,
      });
    }

    // Most wins in a month
    const monthlyWins = findMonthlyRecordHolders(month => month.wins);
    if (monthlyWins) {
      records.push({
        title: 'Most Wins in a Month',
        subtitle: 'Monthly record',
        holders: monthlyWins.holders.map(h => ({
          player: h.player,
          value: monthlyWins.value,
          extra: h.month.charAt(0).toUpperCase() + h.month.slice(1)
        })),
        icon: <Crown className="w-4 h-4" />,
      });
    }

    // Most clean sheets
    const cleanSheetHolders = findRecordHolders(
      allPlayers.filter(p => p.position === 'GK'),
      p => p.monthlyData.find(m => m.month === 'overall')?.clean_sheets || 0
    );
    
    if (cleanSheetHolders.length > 0) {
      records.push({
        title: 'Most Clean Sheets',
        subtitle: 'Goalkeeper',
        holders: cleanSheetHolders,
        icon: <Shield className="w-4 h-4" />,
      });
    }

    return records;
  };

  const disciplinaryRecords = getDisciplinaryRecords();
  const goalRecords = getGoalRecords();
  const assistRecords = getAssistRecords();
  const potmRecords = getPOTMRecords();
  const gameStatRecords = getGameStatRecords();

  // Table section component
  const Section = ({ title, icon, records, emptyMessage = "No records yet" }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3 px-4">
        <div className="p-2 bg-zinc-900 rounded-lg">
          {icon}
        </div>
        <h2 className="text-base font-black uppercase tracking-tighter italic">{title}</h2>
      </div>
      {records.length > 0 ? (
        <div className="px-4">
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">Record</th>
                  <th className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">Player(s)</th>
                  <th className="text-right px-4 py-3 text-[10px] font-black uppercase tracking-wider text-zinc-600">Value</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index} className="border-b border-zinc-100 last:border-b-0 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-zinc-600">
                          {record.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-900">{record.title}</div>
                          <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-semibold">{record.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-2">
                        {record.holders.map((holder, hIndex) => (
                          <div key={hIndex} className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-700 flex-shrink-0">
                              <img src={holder.player.images[0]} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold text-zinc-900 truncate">{holder.player.name}</div>
                              <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-semibold">
                                {holder.player.position}
                                {holder.extra && ` • ${holder.extra}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="text-2xl font-black text-zinc-900">{record.holders[0].value}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="px-4">
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-8 text-center">
            <p className="text-sm text-zinc-400 font-semibold">{emptyMessage}</p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Awards & Records</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>
        </div>
      </header>

      <div className="py-6 max-w-7xl mx-auto">
        <Section 
          title="Goals" 
          icon={<Target className="w-5 h-5 text-white" />}
          records={goalRecords}
          emptyMessage="No goals scored yet"
        />

        <Section 
          title="Assists" 
          icon={<Zap className="w-5 h-5 text-white" />}
          records={assistRecords}
          emptyMessage="No assists recorded yet"
        />

        <Section 
          title="Player of the Match" 
          icon={<Star className="w-5 h-5 text-white" />}
          records={potmRecords}
          emptyMessage="No MOTM awards yet"
        />

        <Section 
          title="Game Statistics" 
          icon={<Award className="w-5 h-5 text-white" />}
          records={gameStatRecords}
          emptyMessage="No games played yet"
        />

        <Section 
          title="Disciplinary" 
          icon={<AlertCircle className="w-5 h-5 text-white" />}
          records={disciplinaryRecords}
          emptyMessage="No disciplinary records yet"
        />
      </div>
    </div>
  );
};

export default Awards;