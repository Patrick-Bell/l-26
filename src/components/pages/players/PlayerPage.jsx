import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Activity, Calendar, X, AlertCircle, Info, 
  ShieldAlert, Target, Star, BarChart3,
  Eye
} from 'lucide-react';
import { 
  Drawer, DrawerContent, DrawerClose 
} from '@/components/ui/drawer'; 
import { allPlayers } from '../../api/Players';
import { useNavigate } from 'react-router-dom';
import SuspensionsModal from '../dialog/SuspensionsModal';

const PlayersPage = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [positionFilter, setPositionFilter] = useState('ALL');
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const positions = ['ALL', 'GK', 'DEF', 'MID', 'LM', 'RM', 'ST'];

  const filteredPlayers = useMemo(() => {
    return allPlayers.filter(player => 
      positionFilter === 'ALL' || player.position === positionFilter
    );
  }, [positionFilter]);

  const getStatus = (player) => {
    if (player.injured.isInjured) return { label: 'Injured', color: 'bg-rose-50 text-rose-600 border-rose-100' };
    if (player.suspended.isRedSuspended) return { label: 'Suspended (Red)', color: 'bg-red-600 text-white border-red-700' };
    if (player.suspended.isYellowSuspended) return { label: 'Suspended (Yellow)', color: 'bg-amber-400 text-black border-amber-500' };
    if (player.banned?.ban_status) return { label: 'Banned', color: 'bg-zinc-900 text-white border-black' };
    return null;
  };

  <button 
        variant="outline" className="px-3 py-1 rounded-md text-[10px] font-bold transition-all shrink-0 bg-yellow-400 font-sans uppercase cursor-pointer">Suspensions
        </button>

  return (
    <div className="text-zinc-900 pb-24 font-sans">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-4 py-4">
        <div className="mx-auto flex flex-col gap-4">
          <div className="block md:flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Trophy className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Players</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>            
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mt-4 md:mt-0">
              {positions.map(pos => (
                <button
                  key={pos}
                  onClick={() => setPositionFilter(pos)}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all shrink-0 ${
                    positionFilter === pos 
                    ? 'bg-zinc-950 text-white shadow-md' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  {pos}
                </button>
              ))}
              <div className='h-5 w-[0.4px] mx-2 bg-zinc-500 flex items-center align-middle'></div>
              <SuspensionsModal players={allPlayers} />
            </div>
          </div>
        </div>
      </header>

      {/* GRID (Existing Card Design) */}
      <main className="py-3 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mx-auto">
        {filteredPlayers.map((player) => (
         <div 
         key={player.id}
         className="bg-white border-none overflow-hidden shadow-sm ring-1 ring-zinc-100 active:scale-[0.98] transition-all flex flex-col cursor-pointer group rounded-md"
         onClick={() => setSelectedPlayer(player)}
       >
         {/* Image Container */}
         <div className="relative aspect-square overflow-hidden bg-zinc-50">
           <img 
             src={player.images[0]} 
             className="w-full h-full object-fit object-top group-hover:scale-105 transition-transform duration-500" 
             alt={player.name} 
           />
           {/* Minimalist Position Badge */}
           <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
             <p className="text-[7px] font-black text-white uppercase italic tracking-widest leading-none">
               {player.position}
             </p>
           </div>
           <div onClick={() => navigate(`/players/${player.id}`)} className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-sm">
             <p className="text-[7px] font-black text-white uppercase italic tracking-widest leading-none">
               View
             </p>
           </div>
         </div>
       
         {/* Info Content */}
         <div className="p-3 flex flex-col flex-1">
           <div className="flex items-center justify-between mb-2 gap-2">
             <h3 className="text-[10px] font-black truncate text-zinc-900 uppercase tracking-tighter leading-none">
               {player.name}
             </h3>
             <img 
               src={player.nationality} 
               className="w-auto h-4 object-cover rounded-[1px] shadow-sm border border-zinc-100 shrink-0" 
               alt="flag"
             /> 
           </div>
       
           {/* Quick Stats Grid */}
           <div className="grid grid-cols-3 gap-1 border-t border-zinc-50 pt-2.5 mt-auto">
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-0.5">App</span>
               <span className="text-[11px] font-black tabular-nums">{player.monthlyData[0].appearances}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-0.5">Gls</span>
               <span className="text-[11px] font-black tabular-nums text-emerald-600">{player.monthlyData[0].goals}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest mb-0.5">Ast</span>
               <span className="text-[11px] font-black tabular-nums text-blue-600">{player.monthlyData[0].assists}</span>
             </div>
           </div>
         </div>
       </div>
        ))}
      </main>

      {/* DETAILED MODAL */}
      <Drawer open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DrawerContent className="bg-white border-none rounded-t-[32px] max-h-[96vh] outline-none">
          {selectedPlayer && (
            <div className="mx-auto w-full max-w-lg flex flex-col p-6 overflow-y-auto scrollbar-hide">
              
              {/* TOP PROFILE SNAPSHOT */}
              <div className="flex gap-5 items-stretch mb-6 relative">
                <div className="relative">
                  <div onClick={() => navigate(`/players/${selectedPlayer.id}`)} className="w-24 h-28 rounded-2xl overflow-hidden shadow-sm ring-1 ring-zinc-200 bg-zinc-50 cursor-pointer">
                    <img src={selectedPlayer.images[0]} className="w-full h-full object-cover object-top" alt={selectedPlayer.name} />
                  </div>
                  {selectedPlayer.potm && (
                    <div className="absolute -top-2 -left-2 bg-amber-400 p-1.5 rounded-full shadow-lg ring-4 ring-white">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <img src={selectedPlayer.nationality} className="w-5 h-3.5 object-cover rounded-sm border border-zinc-100 shadow-sm" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none">{selectedPlayer.position}</span>
                    </div>
                    <h2 className="text-xl font-black text-zinc-950 leading-[0.9] uppercase italic tracking-tighter mb-3 truncate">
                      {selectedPlayer.name}
                    </h2>
                    
                    {getStatus(selectedPlayer) && (
                      <div className={`inline-flex items-center text-[8px] font-black px-2 py-0.5 rounded-sm uppercase border ${getStatus(selectedPlayer).color}`}>
                        <ShieldAlert className="w-2.5 h-2.5 mr-1" />
                        {getStatus(selectedPlayer).label}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[9px] font-bold uppercase">Joined {selectedPlayer.joined}</span>
                  </div>
                </div>

                <DrawerClose className="absolute -top-2 -right-2 bg-zinc-100 p-2 rounded-full">
                  <X className="w-4 h-4 text-zinc-500" />
                </DrawerClose>
              </div>

              {/* SECTION: FULL SEASON STATS (EVERYTHING) */}
              <div className="mb-8">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 px-1 mb-3">
                  <BarChart3 className="w-3.5 h-3.5" /> Full Career Stats
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { l: 'Apps', v: selectedPlayer.monthlyData[0].appearances, c: 'text-zinc-900' },
                    { l: 'Goals', v: selectedPlayer.monthlyData[0].goals, c: 'text-emerald-600' },
                    { l: 'Assists', v: selectedPlayer.monthlyData[0].assists, c: 'text-blue-600' },
                    { l: 'Clean Sheets', v: selectedPlayer.monthlyData[0].clean_sheets || 0, c: 'text-zinc-900' },
                    { l: 'Own Goals', v: selectedPlayer.monthlyData[0].own_goals || 0, c: 'text-rose-600' },
                    { l: 'Yellows', v: selectedPlayer.monthlyData[0].yellow_cards || 0, c: 'text-amber-500' },
                    { l: 'Reds', v: selectedPlayer.monthlyData[0].red_cards || 0, c: 'text-rose-600' },
                    { l: 'MOTM', v: selectedPlayer.monthlyData[0].motm || 0, c: 'text-amber-500' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white border border-zinc-100 p-2.5 rounded-xl text-center shadow-sm">
                      <p className="text-[7px] font-black text-zinc-400 uppercase mb-0.5">{stat.l}</p>
                      <p className={`text-xs font-black ${stat.c}`}>{stat.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: MONTHLY PERFORMANCE (ALL MONTHS) */}
              <div className="mb-8">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2 px-1 mb-3">
                  <Target className="w-3.5 h-3.5" /> Monthly Logs
                </h3>
                <Tabs defaultValue={selectedPlayer.monthlyData[1]?.month} className="w-full">
                  <TabsList className="w-full bg-zinc-50 p-1 h-10 rounded-xl border border-zinc-100 flex overflow-x-auto scrollbar-hide justify-start">
                    {selectedPlayer.monthlyData.slice(1).map(m => (
                      <TabsTrigger 
                        key={m.month} 
                        value={m.month} 
                        className="px-4 text-[9px] font-extrabold uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm text-zinc-400 shrink-0"
                      >
                        {m.month.slice(0, 3)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {selectedPlayer.monthlyData.slice(1).map(month => (
                    <TabsContent key={month.month} value={month.month} className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-zinc-50/50 border border-zinc-100 p-4 rounded-2xl grid grid-cols-4 gap-3">
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Goals</p><p className="text-sm font-black text-emerald-600">{month.goals}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Assists</p><p className="text-sm font-black text-blue-600">{month.assists}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Wins</p><p className="text-sm font-black">{month.wins}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">MOTM</p><p className="text-sm font-black text-amber-500">{month.motm}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Apps</p><p className="text-sm font-black text-emerald-600">{month.appearances}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Points</p><p className="text-sm font-black text-blue-600">{month.points}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Draws</p><p className="text-sm font-black">{month.draws}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Losses</p><p className="text-sm font-black text-amber-500">{month.losses}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Win %</p><p className="text-sm font-black text-emerald-600">{month.win_percentage}%</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Unbeaten %</p><p className="text-sm font-black text-blue-600">{month.unbeaten_percentage}%</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Slingers</p><p className="text-sm font-black">{month.slingers}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Penalties</p><p className="text-sm font-black text-amber-500">{month.penalties}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Own Goals</p><p className="text-sm font-black text-emerald-600">{month.own_goals}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Hatricks</p><p className="text-sm font-black text-blue-600">{month.hatricks}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Yellow Cards</p><p className="text-sm font-black">{month.yellow_cards}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Red Cards</p><p className="text-sm font-black text-amber-500">{month.red_cards}</p></div>
                        <div className="text-center"><p className="text-[7px] font-black text-zinc-400 uppercase">Clean Sheets</p><p className="text-sm font-black text-amber-500">{month.clean_sheets}</p></div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              {/* SECTION: MOMENTUM (FORM) */}
              <div className="p-5 rounded-[24px]">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">Current Momentum</span>
                    <span className="text-[8px] font-bold text-zinc-600 uppercase">Season Trend</span>
                  </div>
                  <Activity className="w-4 h-4 text-zinc-700" />
                </div>
                <div className="flex gap-2">
                  {selectedPlayer.form.slice(-5).map((r, i) => (
                    <div key={i} className={`flex-1 h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-black border transition-all ${
                      r === 'W' ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30' : 
                      r === 'D' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                      'bg-rose-600/20 text-rose-400 border-rose-500/30'
                    }`}>
                      {r}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PlayersPage;