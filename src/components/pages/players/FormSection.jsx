import { useEffect, useState } from "react";

const FormSection = ({ player }) => {

  const [formStats, setFormStats] = useState({
    currentStreak: 0,
    bestStreak: 0,
    worstStreak: 0,
    tempStreak: 0
  })

  const getFormStats = () => {
    const form = player.form;
  
    let currentStreak = 0; // streak of W or D from last game
    let bestStreak = 0;    // longest W or D streak overall
    let worstStreak = 0;   // longest L streak overall
    let tempStreak = 0;    // temp counter for L streaks
  
    let tempCurrent = 0; 
  
    form.forEach((result, i) => {
      // Calculate W/D streaks
      if(result === 'W' || result === 'D') {
        tempCurrent += 1;
        if(tempCurrent > bestStreak) bestStreak = tempCurrent;
        // reset L counter
        tempStreak = 0;
      } 
      else if(result === 'L') {
        // L streak
        tempStreak += 1;
        if(tempStreak > worstStreak) worstStreak = tempStreak;
        // reset W/D counter
        tempCurrent = 0;
      }
    });
  
    // Current streak of W/D from last game
    currentStreak = 0;
    for(let i = form.length - 1; i >= 0; i--) {
      if(form[i] === 'W' || form[i] === 'D') {
        currentStreak += 1;
      } else break; // stop at first loss
    }
  
    setFormStats({
      currentStreak,
      bestStreak,
      worstStreak,
      tempStreak
    });
  }
  

  useEffect(() => {
    getFormStats()
  }, [player])

    return (

        <div className="bg-white rounded-3xl p-4 border border-zinc-100">
          <h3 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Last 30 games</h3>
          <div className="overflow-x-auto w-full max-w-full pb-1 scrollbar-hide">
  <div className="flex gap-1 min-w-max">
    {player.form.slice(0, 30).map((r, i) => (
      <div 
        key={i} 
        className={`flex-none w-8 h-8 rounded-xl flex items-center justify-center font-black text-[10px] transition-all hover:scale-110 ${
          r === 'W' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
          r === 'D' ? 'bg-zinc-100 text-zinc-500 border border-zinc-200' : 
          'bg-red-100 text-red-700 border border-red-200'
        }`}
      >
        {r}
      </div>
    ))}
  </div>
</div>

          <div className="mt-2">
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Best Unbeaten Run: {formStats.bestStreak}</p>
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Worst Run: {formStats.worstStreak}</p>
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Current Unbeaten Run: {formStats.currentStreak}</p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-zinc-100">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Win</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-zinc-400" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Draw</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[8px] font-bold text-zinc-500 uppercase">Loss</span>
            </div>
          </div>
        </div>
    )
}

export default FormSection;