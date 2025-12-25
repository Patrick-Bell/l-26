const FormSection = ({ player}) => {

    return (

        <div className="bg-white rounded-3xl p-4 border border-zinc-100">
          <h3 className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-3">Last 15 Matches</h3>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {player.form.slice(-15).map((r, i) => (
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