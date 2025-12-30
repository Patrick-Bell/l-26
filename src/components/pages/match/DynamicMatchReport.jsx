import React from 'react';
import { 
  ChevronLeft, Goal, Star, Clock, Calendar, Shield, 
  Zap, Award, Target, Flame 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useNavigate } from 'react-router-dom';
import { allMatches } from '../../api/Matches';
import MatchTable from './MatchTable';

const DynamicMatchReport = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const match = allMatches.find((m) => String(m.id) === String(id));
  console.log('match', match)
  
 

  return (
    <div className="min-h-screen w-full text-[#121212] font-sans pb-10 antialiased">
      
      {/* HEADER */}
      <nav className="bg-white border-b border-zinc-100 px-4 py-3 sticky top-16 z-50 flex items-center justify-between">
        <button onClick={() => navigate('/matches')} className="p-1"><ChevronLeft className="w-4 h-4" /></button>
        <div className="text-center">
          <h1 className="text-[10px] font-black uppercase tracking-tighter">Match Center</h1>
          <p className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Match #{match?.id}</p>
        </div>
        <div className="w-6" />
      </nav>

      <main className="mt-4 space-y-4">
        {/* HERO SCORE CARD */}
        <div className="bg-[#121212] rounded-[32px] p-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="text-center w-20 text-[10px] font-black uppercase tracking-tight leading-tight">Home Team</div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 text-5xl font-black italic tracking-tighter tabular-nums">
              <span>{match.team1_score}</span>
              <span className="text-zinc-800 font-light">-</span>
              <span className="text-zinc-600">{match.team2_score}</span>
            </div>
          </div>
          <div className="text-center w-20 text-[10px] font-black uppercase tracking-tight opacity-40 leading-tight">Away Team</div>
        </div>

        {/* INFO STRIP */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2.5 rounded-2xl border border-zinc-100 flex items-center gap-2 ">
            <Calendar className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase">{match.date}</span>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-zinc-100 flex items-center gap-2 ">
            <Clock className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase">{match.time}</span>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-zinc-100 flex items-center gap-2 ">
            <Shield className="w-3 h-3 text-zinc-300" />
            <span className="text-[8px] font-black uppercase truncate">{match.referee}</span>
          </div>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="bg-white p-1 h-11 rounded-2xl border border-zinc-200 flex w-full mb-4">
            <TabsTrigger value="summary" className="flex-1 rounded-xl text-[9px] font-black uppercase">Summary</TabsTrigger>
            <TabsTrigger value="lineups" className="flex-1 rounded-xl text-[9px] font-black uppercase">Lineups</TabsTrigger>
            <TabsTrigger value="table" className="flex-1 rounded-xl text-[9px] font-black uppercase">Table</TabsTrigger>
          </TabsList>

          {/* TAB: SUMMARY */}
          <TabsContent value="summary" className="space-y-3 outline-none pb-8">
            <div className="bg-white rounded-[28px] p-5 border border-zinc-100 relative overflow-hidden">
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-zinc-100 -translate-x-1/2" />
              <div className="space-y-6 relative">
                {/* Render Goals from array */}
                {match.goals.map((goal, idx) => (
                  <TimelineItem key={`g-${idx}`} type="goal" p={goal.p} a={goal.a} t={goal.t} special={goal.special} side={goal.side === 'team1' ? 'home' : 'away'} />
                ))}
                {/* Render Yellow Cards from array */}
                {match.yellows.map((name, idx) => (
                  <TimelineItem key={`y-${idx}`} type="yellow" p={name} t="Card" side={match.team1.includes(name) ? 'home' : 'away'} />
                ))}
                {/* Render Red Cards from array */}
                {match.reds.map((name, idx) => (
                  <TimelineItem key={`r-${idx}`} type="red" p={name} t="Card" side={match.team1.includes(name) ? 'home' : 'away'} />
                ))}
              </div>
            </div>
            <MOTMCard name={match.motm} rating="10.0" />
          </TabsContent>

          {/* TAB: LINEUPS */}
          <TabsContent value="lineups" className="space-y-3 outline-none pb-8">
            <div className="relative aspect-[16/9] w-full bg-[#5D6B35] rounded-[24px] overflow-hidden border border-zinc-300">
              <div className="absolute inset-0 flex">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-black/5' : 'bg-transparent'}`} />
                ))}
              </div>
              <div className="absolute inset-2 border border-white/20 rounded-xl pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20" />

              <div className="relative h-full w-full flex z-10 py-2">
                {/* TEAM 1 - Left Side */}
                <div className="flex-1 flex items-center justify-between px-4 pr-6">
                  <PlayerBadge pos="GK" name={match.team1[0]} />
                  <PlayerBadge pos="DEF" name={match.team1[1]} />
                  <div className="flex flex-col justify-around h-full py-1">
                    <PlayerBadge pos="LW" name={match.team1[2]} />
                    <PlayerBadge pos="MID" name={match.team1[3]} />
                    <PlayerBadge pos="RW" name={match.team1[4]} />
                  </div>
                  <PlayerBadge pos="ST" name={match.team1[5]} goal={match.goals.some(g => g.p === match.team1[5])} />
                </div>
                {/* TEAM 2 - Right Side */}
                <div className="flex-1 flex flex-row-reverse items-center justify-between px-4 pl-6">
                  <PlayerBadge pos="GK" name={match.team2[0]} light />
                  <PlayerBadge pos="DEF" name={match.team2[1]} light />
                  <div className="flex flex-col justify-around h-full py-1">
                    <PlayerBadge pos="RW" name={match.team2[2]} light />
                    <PlayerBadge pos="MID" name={match.team2[3]} light />
                    <PlayerBadge pos="LW" name={match.team2[4]} light />
                  </div>
                  <PlayerBadge pos="ST" name={match.team2[5]} light goal={match.goals.some(g => g.p === match.team2[5])} />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-[10px] font-black uppercase tracking-tighter'>Home Team</p>
                <p className='text-[10px] font-black uppercase tracking-tighter'>Away Team</p>
            </div>
          </TabsContent>

          {/* TAB: TABLE */}
          <TabsContent value='table'>
          {match && <MatchTable match={match} />}
          </TabsContent>


        </Tabs>
      </main>
    </div>
  );
};

// HELPER COMPONENTS
const PlayerBadge = ({ pos, name, light, goal }) => (
  <div className="flex flex-col items-center gap-0.5">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black  border ${
      light ? 'bg-white text-zinc-900 border-zinc-200' : 'bg-zinc-950 text-white border-white/10'
    }`}>
      {pos}
      {goal && <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-zinc-100"><Goal className="w-2.5 h-2.5 text-black" /></div>}
    </div>
    <span className="text-[7px] font-black text-white uppercase tracking-tighter text-center max-w-[45px] truncate leading-none">
      {name}
    </span>
  </div>
);

const TimelineItem = ({ type, p, a, t, special, side }) => (
  <div className={`flex items-center gap-3 ${side === 'home' ? 'flex-row' : 'flex-row-reverse'}`}>
    <div className={`flex-1 ${side === 'home' ? 'text-right' : 'text-left'}`}>
      <p className="text-[10px] font-black uppercase italic leading-none">{p}</p>
      {a && <p className="text-[7px] font-bold text-zinc-400 uppercase mt-0.5">Ast: {a}</p>}
      {special && <span className="text-[6px] font-black uppercase bg-zinc-100 px-1 py-0.5 rounded-full inline-block mt-1">{special}</span>}
    </div>
    <div className="z-10 bg-white border border-zinc-100 p-1.5 rounded-full min-w-[32px] flex justify-center">
      {type === 'goal' ? <Goal className="w-4 h-4 text-emerald-500" /> : <div className={`w-2.5 h-3.5 rounded-sm ${type === 'yellow' ? 'bg-amber-400' : 'bg-red-500'}`} />}
    </div>
    <div className={`flex-1 text-[10px] font-black italic text-zinc-300 ${side === 'home' ? 'text-left' : 'text-right'}`}>{t}</div>
  </div>
);

const MOTMCard = ({ name, rating }) => (
  <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-[28px] p-4 text-amber-950 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Star className="w-5 h-5 fill-amber-950" />
      <div>
        <p className="text-[7px] font-black uppercase opacity-70 tracking-widest leading-none">Man of the Match</p>
        <p className="text-sm font-black uppercase italic mt-1 leading-none tracking-tight">{name} ({rating})</p>
      </div>
    </div>
  </div>
);

export default DynamicMatchReport;