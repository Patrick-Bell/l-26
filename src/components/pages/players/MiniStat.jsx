const MiniStat = ({ label, value, trend, icon: Icon, color = 'text-zinc-900' }) => (
    <div className="bg-white rounded-2xl p-3 border border-zinc-100 hover:border-zinc-200 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        {trend !== undefined && (
          <div className={`flex items-center gap-0.5 ${trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-red-600' : 'text-zinc-400'}`}>
            {trend > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : trend < 0 ? <TrendingDown className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
            <span className="text-[8px] font-bold">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p className={`text-xl font-black leading-none mb-0.5 ${color}`}>{value}</p>
      <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-wide">{label}</p>
    </div>
  );

  export default MiniStat;