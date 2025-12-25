const DisciplineSection = ({ player, yellowCards, cardsToSuspension, suspensionProgress }) => {

    return (

        <div className="grid grid-cols-2 gap-2.5">
          {/* Yellow Card Tracker */}
          <div className="bg-white rounded-2xl p-3 border border-zinc-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wide">Yellow Cards</span>
              <span className="text-xs font-black text-amber-600">{yellowCards}</span>
            </div>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden mb-1.5">
              <div 
                className={`h-full transition-all duration-700 ${cardsToSuspension === 1 ? 'bg-red-500' : 'bg-amber-500'}`} 
                style={{ width: `${suspensionProgress}%` }}
              />
            </div>
            <p className="text-[7px] font-semibold text-zinc-400 uppercase leading-tight">
              {cardsToSuspension} to suspension
            </p>
          </div>

          {/* Red Cards */}
          <div className="bg-white rounded-2xl p-3 border border-zinc-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-zinc-400 uppercase tracking-wide">Red Cards</span>
              <span className="text-xs font-black text-red-600">{player.monthlyData[0].red_cards || 0}</span>
            </div>
            <div className="h-2 bg-zinc-100 rounded-full mb-1.5">
              <div className="h-full bg-red-600 rounded-full" style={{ width: `${(player.monthlyData[0].red_cards || 0)}%` }} />
            </div>
            <p className="text-[7px] font-semibold text-zinc-400 uppercase leading-tight">
              Disciplinary record
            </p>
          </div>
        </div>
    )};

export default DisciplineSection