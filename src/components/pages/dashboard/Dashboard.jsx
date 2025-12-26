import React from 'react';
import { Trophy, Target, Users, Award, Shield, TrendingUp, Clock, BarChart2, Laptop } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { allPlayers } from '../../api/Players';
import { allMatches } from '../../api/Matches';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate()
    const game = allMatches.slice(-1)[0];


    const recentGames = [
        {
          date: '22 Dec',
          team1: 'Team A',
          team2: 'Team B',
          score1: 3,
          score2: 2,
          result: 'W',
          motm: 'Ronaldo',
          goals: 2,
          assists: 1
        },
      ];


    const stats = [
        {
            title: 'Total Players',
            icon: <Users />,
            value: allPlayers.length,
            percentage: '100%'
        },
        {
            title: 'Total Matches',
            icon: <Target />,
            value: allMatches.length,
            percentage: '100%'
        },
        {
            title: 'Total Goals',
            icon: <Award />,
            value: allMatches.reduce((sum, m) => sum + (m.team1_score || 0) + (m.team2_score || 0), 0),
            percentage: '100%'
        },
        {
            title: 'Total Hours',
            icon: <Clock />,
            value: (allMatches.length * 0.75).toFixed(2) + ' hrs',
            percentage: '100%'
        },
        {
            title: 'Home Goals',
            icon: <Shield />,
            value: allMatches.reduce((sum, m) => sum + (m.team1_score || 0), 0),
            percentage: '100%'
        },
        {
            title: 'Away Goals',
            icon: <TrendingUp />,
            value: allMatches.reduce((sum, m) => sum + (m.team2_score || 0), 0),
            percentage: '100%'
        },
        {
            title: 'Avg Goals per Match',
            icon: <BarChart2 />,
            value: (allMatches.reduce((sum, m) => sum + (m.team1_score || 0) + (m.team2_score || 0), 0) / allMatches.length).toFixed(2),
            percentage: '100%'
        },
        {
            title: 'Last Updated',
            icon: <Laptop />,
            value: game.date
        }
        
    ]

    const getCurrentDayOfYear = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = now - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
      };
    
      const currentDayOfYear = getCurrentDayOfYear();
      const daysInYear = 365; // Can adjust for leap years
      const seasonProgress = ((currentDayOfYear / daysInYear) * 100).toFixed(1);
    
      // Month boundaries (cumulative days)
      const months = [
        { name: 'Jan', short: 'J', days: 31, startDay: 0 },
        { name: 'Feb', short: 'F', days: 28, startDay: 31 },
        { name: 'Mar', short: 'M', days: 31, startDay: 59 },
        { name: 'Apr', short: 'A', days: 30, startDay: 90 },
        { name: 'May', short: 'M', days: 31, startDay: 120 },
        { name: 'Jun', short: 'J', days: 30, startDay: 151 },
        { name: 'Jul', short: 'J', days: 31, startDay: 181 },
        { name: 'Aug', short: 'A', days: 31, startDay: 212 },
        { name: 'Sep', short: 'S', days: 30, startDay: 243 },
        { name: 'Oct', short: 'O', days: 31, startDay: 273 },
        { name: 'Nov', short: 'N', days: 30, startDay: 304 },
        { name: 'Dec', short: 'D', days: 31, startDay: 334 }
      ];
    
      const getCurrentMonth = () => {
        return months.findIndex(m => currentDayOfYear >= m.startDay && currentDayOfYear < m.startDay + m.days);
      };
    
      const currentMonthIndex = getCurrentMonth();
      const daysRemaining = daysInYear - currentDayOfYear;


    return (
        <>
        <div className="min-h-screen pb-20">
        <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Trophy className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Dashboard</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 26</p>
            </div>
          </div>
        </div>
      </header>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
        {stats.map((stat) => (
        <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
        <div className="flex items-center gap-2 mb-1.5">
        {stat.icon}
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{stat.title}</span>
        </div>
        <div className="flex items-baseline gap-2">
        <span className="text-xl font-black italic tracking-tighter tabular-nums text-zinc-900">{stat.value}</span>
        <span className="text-[9px] font-bold text-zinc-400 tabular-nums uppercase tracking-tighter">{stat.percentage}</span>
        </div>
        </div>
        ))}
      
        </div>


        <div className="bg-zinc-50 rounded-xl border border-zinc-100 p-4 mb-4 mt-4">
  <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-3">
    Last Game
  </h3>
  <div className="space-y-2.5">
    {game && (
      <div className="bg-white rounded-lg p-3 border border-zinc-100">
        {/* Date and Score */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
            {game.date}
          </span>
          <div className="w-10 h-5 rounded flex items-center justify-center font-black text-[9px] text-white italic bg-zinc-900">
            {game.team1_score}-{game.team2_score}
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-zinc-900 font-bold italic truncate">
              Home Team: <span className='text-xs text-zinc-400'>{game.team1.join(", ")}</span>
            </div>
            <div className="text-xs text-zinc-900 italic font-bold truncate">
            Away Team: <span className='text-xs text-zinc-400'>{game.team2.join(", ")}</span>
            </div>
          </div>
        </div>

        {/* MOTM and Goals */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3 h-3 text-amber-500" />
            <span className="text-[9px] font-bold text-zinc-600 italic">{game.motm}</span>
          </div>
          <div className="flex items-center gap-2 text-[9px]">
            <div onClick={() => navigate(`/matches/${game.id}`)} className="flex items-center gap-1">
              <span className="font-black text-zinc-900 italic tabular-nums cursor-pointer">View</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>



<div className="bg-zinc-50 rounded-xl border border-zinc-100 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Season Progress
            </h3>
            <div className="text-right">
              <div className="text-sm font-black italic text-zinc-900 tabular-nums">{seasonProgress}%</div>
              <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">Complete</div>
            </div>
          </div>

          {/* Month labels */}
          <div className="flex justify-between mb-2 px-0.5">
            {months.map((month, index) => (
              <div key={index} className="text-center flex-1">
                <div 
                  className={`text-[9px] font-black uppercase ${
                    index <= currentMonthIndex ? 'text-zinc-900' : 'text-zinc-300'
                  }`}
                >
                  {month.short}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative h-3 bg-white rounded-full border border-zinc-100 overflow-hidden mb-3">
            <div 
              className="absolute left-0 top-0 h-full bg-zinc-900 rounded-full transition-all duration-500"
              style={{ width: `${seasonProgress}%` }}
            />
            {/* Month dividers */}
            <div className="absolute inset-0 flex">
              {months.map((month, index) => (
                <div 
                  key={index}
                  className="border-r border-zinc-200 last:border-r-0"
                  style={{ width: `${(month.days / daysInYear) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Timeline with tick marks */}
          <div className="relative h-6 mb-3">
            {/* Tick marks for each month */}
            <div className="absolute inset-0 flex">
              {months.map((month, index) => {
                const leftPosition = (month.startDay / daysInYear) * 100;
                const isPast = index <= currentMonthIndex;
                
                return (
                  <div 
                    key={index}
                    className="absolute"
                    style={{ left: `${leftPosition}%` }}
                  >
                    <div className={`w-0.5 h-4 ${isPast ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
                  </div>
                );
              })}
              {/* Current day marker */}
              <div 
                className="absolute top-0 flex flex-col items-center"
                style={{ left: `${seasonProgress}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-1 h-6 bg-red-500 rounded-full" />
                <div className="text-[8px] font-black text-red-500 mt-0.5 uppercase tracking-wider">Now</div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-black italic text-zinc-900 tabular-nums">{currentDayOfYear}</div>
              <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">Days Passed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black italic text-zinc-900 tabular-nums">{daysRemaining}</div>
              <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">Days Left</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-black italic text-zinc-900 tabular-nums">{daysInYear}</div>
              <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">Total Days</div>
            </div>
          </div>
        </div>




        </div>
        </>
    )
  
}
export default Dashboard;