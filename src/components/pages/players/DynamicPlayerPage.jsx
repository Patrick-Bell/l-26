import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, Trophy, ShieldAlert, Target, Activity, Award, Star, Zap,
  AlertCircle, TrendingUp, TrendingDown, Minus, Medal, Users, Clock
} from 'lucide-react';
import { allPlayers } from '../../api/Players';
import RadialChart from './RadialChart';
import MiniStat from './MiniStat';
import DisciplineSection from './DisciplineSection';
import FormSection from './FormSection';
import ComparisonsSection from './ComparisonSection';

const DynamicPlayersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = allPlayers.find(p => p.id === id);

  if (!player) return <div className="h-screen flex items-center justify-center font-bold">Player Not Found</div>;

  // --- ANALYTICS CALCULATIONS ---
  const analytics = useMemo(() => {
    const recent = player.form.slice(-5);
    const pts = recent.reduce((acc, res) => acc + (res === 'W' ? 3 : res === 'D' ? 1 : 0), 0);
    
    const winRate = player.monthlyData[0].win_percentage.toFixed(2);
    const appearances = player.monthlyData[0].appearances;
    const goals = player.monthlyData[0].goals;
    const assists = player.monthlyData[0].assists;
    
    // Performance Score (0-100)
    const performanceScore = Math.min(100, Math.round(
      (goals * 8) + (assists * 5) + (winRate * 0.4) + (player.monthlyData[0].motm * 10)
    ));
    
    // Goals per game
    const goalsPerGame = appearances > 0 ? (goals / appearances).toFixed(2) : 0;
    const assistsPerGame = appearances > 0 ? (assists / appearances).toFixed(2) : 0;
    
    return { pts, recentCount: recent.length, performanceScore, goalsPerGame, assistsPerGame, winRate };
  }, [player]);

  // Suspension tracker
  const yellowCards = player.monthlyData[0].yellow_cards || 0;
  const cardsToSuspension = 5 - (yellowCards % 5);
  const suspensionProgress = (yellowCards % 5) * 20;

  const getStatus = () => {
    if (player.injured.isInjured) return { label: 'Injured', sub: player.injured.date_return || 'TBC', color: 'bg-red-500', icon: AlertCircle };
    if (player.suspended.isRedSuspended) return { label: 'Suspended', sub: 'Red Card', color: 'bg-red-600', icon: ShieldAlert };
    if (player.suspended.isYellowSuspended) return { label: 'Suspended', sub: 'Yellow Cards', color: 'bg-amber-500', icon: ShieldAlert };
    return null;
  };

  const status = getStatus();


// inside DynamicPlayersPage.js
const comparisonData = useMemo(() => {
  // Get all players in the same position except current player
  const samePositionPlayers = allPlayers.filter(
    (p) => p.position === player.position && p.id !== player.id
  );

  if (!samePositionPlayers.length) return null;

  // Decide which metrics to compare based on position
  const positionMetrics = {
    GK: ["clean_sheets"],
    DEF: ["clean_sheets"],

    MID: ["goals"],
    LM: ["assists"],
    RM: ["assists"],

    ST: ["goals"],
  };

  const metrics = positionMetrics[player.position] || [];

  // Create chart data: one object per player
  const chartData = [
    // Include current player first
    {
      name: player.name,
      ...metrics.reduce((acc, m) => {
        acc[m] = player.monthlyData[0][m] || 0;
        return acc;
      }, {}),
    },
    // Include others
    ...samePositionPlayers.map((p) => ({
      name: p.name,
      ...metrics.reduce((acc, m) => {
        acc[m] = p.monthlyData[0][m] || 0;
        return acc;
      }, {}),
    })),
  ];

  return { metrics, chartData };
}, [player]);

  
  
    

  return (
    <div className="min-h-screen font-sans text-zinc-900 pb-16">
      {/* Compact Sticky Header */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-zinc-200 z-50 px-3 py-2.5 sticky top-16">
        <div className="mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xs font-black uppercase tracking-tight">{player.name}</h1>
            <p className="text-[8px] font-semibold text-zinc-400 uppercase tracking-widest">{player.position}</p>
          </div>
          <div className="w-7" />
        </div>
      </nav>

      <main className="mx-auto px-3 mt-4 space-y-4">
        
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-3xl p-4 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          
          <div className="relative flex items-start gap-4">
            <div className="relative shrink-0">
              <img src={player.images[0]} className="w-20 h-28 object-cover rounded-2xl border-2 border-white/10" alt={player.name} />
              {player.potm && (
                <div className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-full border-2 border-white">
                  <Trophy className="w-3 h-3 text-amber-900" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <img src={player.nationality} className="w-5 h-3.5 rounded-sm" alt="flag" />
                <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{player.joined}</span>
              </div>
              
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">{player.name}</h2>
              
              {/* Status Badge */}
              {status && (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[8px] font-bold uppercase ${status.color} mb-2`}>
                  <status.icon className="w-2.5 h-2.5" />
                  <span>{status.label}</span>
                </div>
              )}
              
              {/* Quick Stats */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">Form</span>
                  <span className="text-xs font-black text-emerald-400">{analytics.pts} pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview - Radial Charts */}
        <div className="bg-white rounded-3xl p-4 border border-zinc-100">
          <h3 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3 px-1">Performance Metrics</h3>
          <div className="grid grid-cols-4 gap-3">
            <RadialChart 
              value={player.monthlyData[0].appearances} 
              max={38} 
              color="#18181b" 
              label="Apps" 
              icon={Activity}
            />
            <RadialChart 
              value={player.monthlyData[0].goals} 
              max={30} 
              color="#10b981" 
              label="Goals" 
              icon={Target}
            />
            <RadialChart 
              value={player.monthlyData[0].assists} 
              max={20} 
              color="#3b82f6" 
              label="Assists" 
              icon={Zap}
            />
            <RadialChart 
              value={player.monthlyData[0].motm} 
              max={10} 
              color="#f59e0b" 
              label="MOTM" 
              icon={Star}
            />
          </div>
        </div>

        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <MiniStat label="Win Rate" value={`${analytics.winRate}%`} icon={Trophy} color="text-emerald-600" />
          <MiniStat label="Unbeaten" value={`${player.monthlyData[0].unbeaten_percentage.toFixed(2)}%`} icon={ShieldAlert} color="text-blue-600"/>
          <MiniStat label="Points" value={player.monthlyData[0].points} icon={Medal} color="text-amber-600" />
          
          <MiniStat label="Goals/Game" value={analytics.goalsPerGame} icon={Target} color="text-emerald-600" />
          <MiniStat label="Assists/Game" value={analytics.assistsPerGame} icon={Zap} color="text-blue-600" />
          <MiniStat label="Clean Sheets" value={player.monthlyData[0].clean_sheets} icon={ShieldAlert} color="text-zinc-900" />
        </div>

        {/* Discipline & Availability */}
        <DisciplineSection player={player} yellowCards={yellowCards} cardsToSuspension={cardsToSuspension} suspensionProgress={suspensionProgress} />


        {/* Recent Form Visualization */}
        <FormSection player={player} />

        {/* Tabs Section */}
        <Tabs defaultValue="monthly" className="space-y-3">
          <TabsList className="bg-white p-1 h-10 rounded-2xl border border-zinc-100 flex w-full">
            <TabsTrigger value="monthly" className="rounded-xl px-3 font-bold text-[9px] uppercase flex-1">Monthly</TabsTrigger>
            <TabsTrigger value="previous" className="rounded-xl px-3 font-bold text-[9px] uppercase flex-1">History</TabsTrigger>
            <TabsTrigger value="awards" className="rounded-xl px-3 font-bold text-[9px] uppercase flex-1">Awards</TabsTrigger>
            <TabsTrigger value="comparison" className="rounded-xl px-3 font-bold text-[9px] uppercase flex-1">Compare</TabsTrigger>
          </TabsList>

          {/* Monthly Breakdown */}
          <TabsContent value="monthly" className="space-y-3">
            <Tabs defaultValue={player.monthlyData[1]?.month} className="w-full">
              <TabsList className="bg-zinc-100 p-0.5 rounded-xl mb-3 flex overflow-x-auto scrollbar-hide w-full border border-zinc-200">
                {player.monthlyData.slice(1).map(m => (
                  <TabsTrigger 
                    key={m.month} 
                    value={m.month} 
                    className="px-3 py-1.5 font-bold text-[8px] uppercase flex-1 min-w-[60px] rounded-lg"
                  >
                    {m.month.slice(0,3)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {player.monthlyData.slice(1).map(month => (
                <TabsContent key={month.month} value={month.month} className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(month).map(([key, val]) => (
                      key !== 'month' && (
                        <div key={key} className="bg-white p-2.5 rounded-xl border border-zinc-100">
                          <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5 truncate">{key.replace('_', ' ')}</p>
                          <p className="text-sm font-black text-zinc-900">{val}{key.includes('percent') ? '%' : ''}</p>
                        </div>
                      )
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          {/* Previous Season */}
          <TabsContent value="previous" className="space-y-3">
            {player.previousSeason?.[0] && (
              <div className="bg-white rounded-3xl p-4 border border-zinc-100">
                <h3 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> 2023 Season Stats
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(player.previousSeason[0]).map(([key, val]) => (
                    key !== 'awards' && typeof val !== 'object' && (
                      <div key={key} className="bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                        <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5 truncate">{key.replace('_', ' ')}</p>
                        <p className="text-sm font-black text-zinc-900">{val}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Awards/Honours */}
          <TabsContent value="awards" className="space-y-3">
            {player.previousSeason?.[0]?.awards.length > 0 ? (
              <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl p-4 text-amber-950">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4" />
                  <h3 className="text-sm font-black uppercase tracking-tight">Trophy Cabinet</h3>
                </div>
                <div className="space-y-2">
                  {player.previousSeason[0].awards.map((award, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2.5 rounded-xl border border-amber-600/20">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600 shrink-0" />
                      <p className="text-[9px] font-black uppercase tracking-wide">{award}</p>
                    </div>
                  ))}
                </div>
              </div>
            ): (
              <span className="text-xs text-gray-600 font-bold uppercase tracking-wide">
                Player has not received any awards yet.
              </span>
            )}
          </TabsContent>

          <TabsContent value='comparison' className='space-y-3'>
            <ComparisonsSection comparisonData={comparisonData} player={player} />
          </TabsContent>

        </Tabs>

       

      </main>
    </div>
  );
};

export default DynamicPlayersPage;