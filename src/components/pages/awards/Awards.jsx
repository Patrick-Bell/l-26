import React from 'react';
import { Trophy, Award, Target, Crown, Star, Medal, Zap, Shield, Calendar, AlertCircle } from 'lucide-react';
import { allPlayers } from '../../api/Players';
import { allMatches } from '../../api/Matches';

const Awards = () => {

  // Calculate milestone achievements
  const getMilestoneAchievements = () => {
    const achievements = [];

    allPlayers.forEach(player => {
      const overallStats = player.monthlyData.find(m => m.month === 'overall');
      
      // Appearance milestones
      if (overallStats.appearances === 1) {
        achievements.push({
          player,
          title: '1st Game',
          description: 'First appearance',
          icon: <Star className="w-4 h-4" />,
          type: 'milestone'
        });
      }
      if (overallStats.appearances === 10) {
        achievements.push({
          player,
          title: '10th Game',
          description: '10 appearances reached',
          icon: <Star className="w-4 h-4" />,
          type: 'milestone'
        });
      }
      if (overallStats.appearances === 50) {
        achievements.push({
          player,
          title: '50th Game',
          description: '50 appearances milestone',
          icon: <Medal className="w-4 h-4" />,
          type: 'milestone'
        });
      }
      if (overallStats.appearances === 100) {
        achievements.push({
          player,
          title: '100th Game',
          description: 'Century of appearances',
          icon: <Trophy className="w-4 h-4" />,
          type: 'milestone'
        });
      }
    });

    return achievements;
  };

  // Get record holders
  const getRecordHolders = () => {
    const records = [];

    // Most goals overall
    const topScorer = [...allPlayers]
      .map(p => ({
        ...p,
        goals: p.monthlyData.find(m => m.month === 'overall')?.goals || 0
      }))
      .sort((a, b) => b.goals - a.goals)[0];
    
    if (topScorer.goals > 0) {
      records.push({
        title: 'Most Goals',
        subtitle: 'All-time record',
        player: topScorer,
        value: topScorer.goals,
        label: 'Goals',
        icon: <Target className="w-5 h-5" />,
        color: 'amber'
      });
    }

    // Most goals in a month
    let mostGoalsInMonth = { player: null, goals: 0, month: '' };
    allPlayers.forEach(player => {
      player.monthlyData.forEach(month => {
        if (month.month !== 'overall' && month.goals > mostGoalsInMonth.goals) {
          mostGoalsInMonth = { player, goals: month.goals, month: month.month };
        }
      });
    });
    
    if (mostGoalsInMonth.player) {
      records.push({
        title: 'Most Goals in a Month',
        subtitle: mostGoalsInMonth.month.charAt(0).toUpperCase() + mostGoalsInMonth.month.slice(1),
        player: mostGoalsInMonth.player,
        value: mostGoalsInMonth.goals,
        label: 'Goals',
        icon: <Zap className="w-5 h-5" />,
        color: 'blue'
      });
    }

    // Most appearances
    const mostAppearances = [...allPlayers]
      .map(p => ({
        ...p,
        appearances: p.monthlyData.find(m => m.month === 'overall')?.appearances || 0
      }))
      .sort((a, b) => b.appearances - a.appearances)[0];
    
    if (mostAppearances.appearances > 0) {
      records.push({
        title: 'Most Appearances',
        subtitle: 'All-time record',
        player: mostAppearances,
        value: mostAppearances.appearances,
        label: 'Games',
        icon: <Award className="w-5 h-5" />,
        color: 'green'
      });
    }

    // Most clean sheets
    const mostCleanSheets = [...allPlayers]
      .filter(p => p.position === 'GK')
      .map(p => ({
        ...p,
        clean_sheets: p.monthlyData.find(m => m.month === 'overall')?.clean_sheets || 0
      }))
      .sort((a, b) => b.clean_sheets - a.clean_sheets)[0];
    
    if (mostCleanSheets && mostCleanSheets.clean_sheets > 0) {
      records.push({
        title: 'Most Clean Sheets',
        subtitle: 'Goalkeeper record',
        player: mostCleanSheets,
        value: mostCleanSheets.clean_sheets,
        label: 'Sheets',
        icon: <Shield className="w-5 h-5" />,
        color: 'cyan'
      });
    }

    // Most wins
    const mostWins = [...allPlayers]
      .map(p => ({
        ...p,
        wins: p.monthlyData.find(m => m.month === 'overall')?.wins || 0
      }))
      .sort((a, b) => b.wins - a.wins)[0];
    
    if (mostWins.wins > 0) {
      records.push({
        title: 'Most Wins',
        subtitle: 'All-time record',
        player: mostWins,
        value: mostWins.wins,
        label: 'Wins',
        icon: <Trophy className="w-5 h-5" />,
        color: 'emerald'
      });
    }

    // Most wins in a month
    let mostWinsInMonth = { player: null, wins: 0, month: '' };
    allPlayers.forEach(player => {
      player.monthlyData.forEach(month => {
        if (month.month !== 'overall' && month.wins > mostWinsInMonth.wins) {
          mostWinsInMonth = { player, wins: month.wins, month: month.month };
        }
      });
    });
    
    if (mostWinsInMonth.player) {
      records.push({
        title: 'Most Wins in a Month',
        subtitle: mostWinsInMonth.month.charAt(0).toUpperCase() + mostWinsInMonth.month.slice(1),
        player: mostWinsInMonth.player,
        value: mostWinsInMonth.wins,
        label: 'Wins',
        icon: <Crown className="w-5 h-5" />,
        color: 'purple'
      });
    }

    // Most yellow cards
    const mostYellows = [...allPlayers]
      .map(p => ({
        ...p,
        yellow_cards: p.monthlyData.find(m => m.month === 'overall')?.yellow_cards || 0
      }))
      .sort((a, b) => b.yellow_cards - a.yellow_cards)[0];
    
    if (mostYellows.yellow_cards > 0) {
      records.push({
        title: 'Most Yellow Cards',
        subtitle: 'Discipline record',
        player: mostYellows,
        value: mostYellows.yellow_cards,
        label: 'Yellows',
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'yellow'
      });
    }

    // Most yellows in a month
    let mostYellowsInMonth = { player: null, yellows: 0, month: '' };
    allPlayers.forEach(player => {
      player.monthlyData.forEach(month => {
        if (month.month !== 'overall' && month.yellow_cards > mostYellowsInMonth.yellows) {
          mostYellowsInMonth = { player, yellows: month.yellow_cards, month: month.month };
        }
      });
    });
    
    if (mostYellowsInMonth.player) {
      records.push({
        title: 'Most Yellows in a Month',
        subtitle: mostYellowsInMonth.month.charAt(0).toUpperCase() + mostYellowsInMonth.month.slice(1),
        player: mostYellowsInMonth.player,
        value: mostYellowsInMonth.yellows,
        label: 'Cards',
        icon: <AlertCircle className="w-5 h-5" />,
        color: 'orange'
      });
    }

    // Most assists
    const mostAssists = [...allPlayers]
      .map(p => ({
        ...p,
        assists: p.monthlyData.find(m => m.month === 'overall')?.assists || 0
      }))
      .sort((a, b) => b.assists - a.assists)[0];
    
    if (mostAssists.assists > 0) {
      records.push({
        title: 'Most Assists',
        subtitle: 'All-time record',
        player: mostAssists,
        value: mostAssists.assists,
        label: 'Assists',
        icon: <Zap className="w-5 h-5" />,
        color: 'indigo'
      });
    }

    // Most MOTM
    const mostMOTM = [...allPlayers]
      .map(p => ({
        ...p,
        motm: p.monthlyData.find(m => m.month === 'overall')?.motm || 0
      }))
      .sort((a, b) => b.motm - a.motm)[0];
    
    if (mostMOTM.motm > 0) {
      records.push({
        title: 'Most MOTM Awards',
        subtitle: 'All-time record',
        player: mostMOTM,
        value: mostMOTM.motm,
        label: 'Awards',
        icon: <Star className="w-5 h-5" />,
        color: 'pink'
      });
    }

    return records;
  };

  const milestones = getMilestoneAchievements();
  const records = getRecordHolders();

  const getColorClasses = (color) => {
    const colors = {
      amber: 'bg-amber-500 border-amber-400',
      blue: 'bg-blue-500 border-blue-400',
      green: 'bg-green-500 border-green-400',
      cyan: 'bg-cyan-500 border-cyan-400',
      emerald: 'bg-emerald-500 border-emerald-400',
      purple: 'bg-purple-500 border-purple-400',
      yellow: 'bg-yellow-500 border-yellow-400',
      orange: 'bg-orange-500 border-orange-400',
      indigo: 'bg-indigo-500 border-indigo-400',
      pink: 'bg-pink-500 border-pink-400'
    };
    return colors[color] || colors.amber;
  };

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

      <div className="px-4 py-3">
      <h1 className="text-[10px] font-black uppercase tracking-tighter">Coming Soon...</h1>
      </div>
    </div>
  );
};

export default Awards;