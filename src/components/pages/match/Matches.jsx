import React, { useState, useMemo } from 'react';
import { 
  Calendar, Clock, Cloud, Sun, User, 
  ChevronRight, Goal, Users, Star, 
  Search, Filter, MapPin 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { allMatches } from '../../api/Matches';


const Matches = () => {
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState(allMatches)
  const [monthFilter, setMonthFilter] = useState('february');

  const months = ['overall', 'january', 'february', 'march', 'arpil', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  const filteredMatches = useMemo(() => {
    if (monthFilter === 'overall') return matchData;
  
    return matchData.filter(
      match => match.month.toUpperCase() === monthFilter.toUpperCase()
    );
  }, [monthFilter, matchData]);

  return (
    <div className="min-h-screen pb-20">
      {/* 1. HEADER (Consistent with Standings) */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Calendar className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Fixtures</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide mt-4 md:mt-0 max-w-150 scrollbar-hide">
              {months.map(month => (
                <button
                  onClick={() => setMonthFilter(month)}
                  key={month}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all shrink-0 uppercase ${
                    monthFilter === month 
                    ? 'bg-zinc-950 text-white shadow-md' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
        </div>
      </header>

      <div className='mt-8 text-right px-4 text-xs text-gray-600 font-bold uppercase tracking-wide'>{filteredMatches.length} matches</div>

      <main className="mx-auto py-8 space-y-4">        
        {filteredMatches.map((match) => (
          <div key={match.id} className="bg-white rounded-[32px] border border-zinc-200 overflow-hidden transition-all">
            
            {/* MATCH TOP BAR (Meta Info) */}
            <div className="px-6 py-4 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-black uppercase tracking-tight">{match.date}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-black uppercase tracking-tight">{match.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {match.condition === "Clear" ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Cloud className="w-3.5 h-3.5 text-zinc-400" />}
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{match.condition}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <User className="w-3 h-3 text-zinc-400" />
                 <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Ref: {match.referee}</span>
              </div>
            </div>

            {/* MATCH CORE SECTION (Score & Teams) */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Team 1 Lineup (Condensed) */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="flex flex-col gap-1 items-end md:items-start">
                   <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-2">Home Team</p>
                   <div className="flex flex-wrap justify-end lg:justify-start gap-1">
                     {match.team1.map(name => (
                       <span key={name} className="px-2 py-0.5 bg-zinc-100 rounded text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{name}</span>
                     ))}
                   </div>
                </div>
              </div>

              {/* Scoreboard */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center justify-center py-4">
                <div className="flex items-center gap-8">
                  <h2 className={`text-6xl font-black italic tracking-tighter ${match.team1_score > match.team2_score ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {match.team1_score}
                  </h2>
                  <div className="h-10 w-[2px] bg-zinc-200 rotate-[20deg]" />
                  <h2 className={`text-6xl font-black italic tracking-tighter ${match.team2_score > match.team1_score ? 'text-zinc-900' : 'text-zinc-400'}`}>
                    {match.team2_score}
                  </h2>
                </div>
                
              </div>

              {/* Team 2 Lineup (Condensed) */}
              <div className="lg:col-span-3 order-3">
                <div className="flex flex-col gap-1 items-start lg:items-end">
                   <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-2">Away Team</p>
                   <div className="flex flex-wrap lg:justify-end gap-1">
                     {match.team2.map(name => (
                       <span key={name} className="px-2 py-0.5 bg-zinc-100 rounded text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{name}</span>
                     ))}
                   </div>
                </div>
              </div>

            </div>

            {/* MATCH FOOTER (MOTM & Action) */}
            <div className="px-8 py-4 bg-zinc-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-400 p-1.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em] leading-none">Man of the Match</p>
                  <p className="text-xs font-black uppercase italic tracking-widest text-white mt-1">{match.motm}</p>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/matches/${match.id}`)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-xl group"
              >
                <span className="text-[10px] font-black uppercase italic tracking-widest">Full Analysis</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        ))}
      </main>
    </div>
  );
};

export default Matches;