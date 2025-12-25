import React, { useState, useEffect } from 'react';
import { Shuffle, Users, Trophy, Zap, Target, Shield, ArrowRight, BarChart3, Star, Activity, TrendingUp, User, Bot, Hammer } from 'lucide-react';
import { allPlayers } from '../../api/Players';
import { allMatches } from '../../api/Matches';
import PlayerCard from './PlayerCard';
import GenerateSection from './GenerateSection';
import StatsSection from './StatsSection';
import KeyPlayersSection from './KeyPlayersSection';
import AnalysisSection from './AnalysisSection';

const TeamGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [teams, setTeams] = useState(null);
  const [revealedPositions, setRevealedPositions] = useState(new Set());
  const [showTeams, setShowTeams] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [matches, setMatches] = useState(allMatches)

  const positions = [
    { key: 'GK', label: 'GK', icon: Shield, color: 'from-purple-500 to-purple-600' },
    { key: 'DEF', label: 'DEF', icon: Shield, color: 'from-blue-500 to-blue-600' },
    { key: 'LM', label: 'LM', icon: Zap, color: 'from-emerald-500 to-emerald-600' },
    { key: 'MID', label: 'MID', icon: Users, color: 'from-amber-500 to-amber-600' },
    { key: 'RM', label: 'RM', icon: Zap, color: 'from-teal-500 to-teal-600' },
    { key: 'ST', label: 'ST', icon: Target, color: 'from-red-500 to-red-600' }
  ];

  const tabs = [
    { id: 'generate', label: 'Generate Teams', icon: Shuffle },
    { id: 'stats', label: 'Match Stats', icon: BarChart3 },
    { id: 'players', label: 'Key Players', icon: Star },
    { id: 'analysis', label: 'Team Analysis', icon: TrendingUp }
  ];

  const generateTeams = () => {
    setIsGenerating(true);
    setShowTeams(false);
    setRevealedPositions(new Set());
    setTeams(null);

   
   // Shuffle players
    const shuffled = [...allPlayers].sort(() => Math.random() - 0.5);
    
    const team1 = {};
    const team2 = {};
    const usedPlayers = new Set();

    positions.forEach(pos => {
      // Get players for this position
      const positionPlayers = shuffled.filter(p => 
        p.position.includes(pos.key) && !usedPlayers.has(p.id)
      );

      // Assign to team 1
      if (positionPlayers[0]) {
        team1[pos.key] = positionPlayers[0];
        usedPlayers.add(positionPlayers[0].id);
      }

      // Assign to team 2
      if (positionPlayers[1]) {
        team2[pos.key] = positionPlayers[1];
        usedPlayers.add(positionPlayers[1].id);
      }
    });

    // Simulate generation delay
    setTimeout(() => {
      setTeams({ team1, team2 });
      setIsGenerating(false);
      setShowTeams(true);
      setActiveTab('generate');
      
      // Reveal positions one by one from left to right
      positions.forEach((_, index) => {
        setTimeout(() => {
          setRevealedPositions(prev => new Set([...prev, index]));
        }, index * 200);
      });
    }, 1500);
  };

  // Calculate match stats
  const getMatchStats = () => {
    if (!teams) return null;

    const team1Goals = Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.goals || 0), 0);
    const team2Goals = Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.goals || 0), 0);
    const team1Assists = Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.assists || 0), 0);
    const team2Assists = Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.assists || 0), 0);
    const team1WinRate = Math.round(Object.values(teams.team1).reduce((sum, p) => sum + (p?.monthlyData[0]?.win_percentage || 0), 0) / Object.keys(teams.team1).length);
    const team2WinRate = Math.round(Object.values(teams.team2).reduce((sum, p) => sum + (p?.monthlyData[0]?.win_percentage || 0), 0) / Object.keys(teams.team2).length);

    return { team1Goals, team2Goals, team1Assists, team2Assists, team1WinRate, team2WinRate };
  };

  const getPredictedWinner = () => {
    if (!teams) return null;
  
    const { team1WinRate, team2WinRate } = getMatchStats();
  
    if (team1WinRate > team2WinRate) {
      return { winner: 'Home Team', confidence: team1WinRate - team2WinRate };
    }
  
    if (team2WinRate > team1WinRate) {
      return { winner: 'Away Team', confidence: team2WinRate - team1WinRate };
    }
  
    return { winner: 'Draw', confidence: 0 };
  };
  

  // Get top players
  const getKeyPlayers = () => {
    if (!teams) return null;

    const allTeamPlayers = [...Object.values(teams.team1), ...Object.values(teams.team2)].filter(p => p);
    
    const topScorer = allTeamPlayers.reduce((max, p) => 
      (p.monthlyData[0].goals > (max?.monthlyData[0]?.goals || 0)) ? p : max
    , null);
    
    const topAssister = allTeamPlayers.reduce((max, p) => 
      (p.monthlyData[0].assists > (max?.monthlyData[0]?.assists || 0)) ? p : max
    , null);

    const topWinRate = allTeamPlayers.reduce((max, p) => 
      (p.monthlyData[0].win_percentage > (max?.monthlyData[0]?.win_percentage || 0)) ? p : max
    , null);

    return { topScorer, topAssister, topWinRate };
  };

  return (
    <div className="min-h-screen font-sans text-zinc-900">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Bot className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Team Generator</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 25/26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row + Generate Button */}
      <div className="bg-white border-b border-zinc-200 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Tabs */}
            <div className="flex items-center gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  disabled={!teams && tab.id !== 'generate'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-left transition-all ${
                    activeTab === tab.id 
                      ? 'bg-zinc-900 text-white' 
                      : 'text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Right - Generate Button */}
            <button
              onClick={generateTeams}
              disabled={isGenerating}
              className={`bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 text-white font-black uppercase tracking-tight rounded-xl px-6 py-2 flex items-center gap-2 shadow-sm transition-all duration-300 ${
                isGenerating ? 'scale-95' : 'hover:scale-[1.02]'
              }`}
            >
              <Shuffle className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span className="text-xs">
                {isGenerating ? 'Generating...' : 'Generate'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Main Content Area */}
        <div className="space-y-4">
          
          {/* Generate Teams Tab */}
          <GenerateSection activeTab={activeTab} showTeams={showTeams} isGenerating={isGenerating} positions={positions} teams={teams} revealedPositions={revealedPositions}/>

          {/* Match Stats Tab */}
         <StatsSection activeTab={activeTab} teams={teams} matches={matches} getMatchStats={getMatchStats} getPredictedWinner={getPredictedWinner} />

          {/* Key Players Tab */}
          <KeyPlayersSection activeTab={activeTab} getKeyPlayers={getKeyPlayers} teams={teams} />

          {/* Team Analysis Tab */}
          <AnalysisSection activeTab={activeTab} teams={teams} />

        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TeamGenerator;