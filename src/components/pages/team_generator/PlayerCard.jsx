import { Trophy, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlayerCard = ({ player, position, revealed, teamColor }) => {

  const navigate = useNavigate()

    if (!player) return (
      <div className="rounded-md p-2 border border-gray-200 border-dashed flex flex-col items-center justify-center h-full min-h-[160px] w-full">
        <p className="text-[7px] font-bold text-zinc-400 uppercase text-center">No Player</p>
      </div>
    );

    // Get last 5 form results
    const recentForm = player.form.slice(-5);

    return (
      <div 
        className={`cursor-pointer bg-white rounded-md p-2.5 border transition-all duration-500 relative overflow-hidden
          h-full w-full ${revealed ? `${teamColor} border-opacity-100 opacity-100` : 'border-zinc-100 opacity-20'}`}
        style={{ transitionDelay: revealed ? '0ms' : '500ms' }}
        onClick={() => navigate(`/players/${player.id}`)}
      >
        {player.suspended.isYellowSuspended && (
          <div className="absolute inset-0 bg-yellow-200 pointer-events-none rounded-2xl" />
        )}
        {player.suspended.isRedSuspended && (
          <div className="absolute inset-0 bg-red-200 pointer-events-none rounded-2xl" />
        )}
        {/* Gradient overlay */}
        <div className={`absolute inset-0 opacity-5`} />
        
        <div className="relative flex flex-col items-center h-full">
          <div className="relative shrink-0 mb-2">
            <img 
              src={player.images[0]} 
              className="w-16 h-20 object-cover rounded-xl border-2 border-white" 
              alt={player.name}
            />
            {player.potm && (
              <div className="absolute -top-1 -right-1 bg-amber-400 p-0.5 rounded-full border-2 border-white">
                <Trophy className="w-2 h-2 text-amber-900" />
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col items-center text-center w-full">
            <div className="flex items-center gap-1 mb-1">
              <position.icon className="w-2.5 h-2.5 text-zinc-400" />
              <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">{position.label}</span>
            </div>
            <h3 className="text-[10px] font-black uppercase tracking-tight leading-tight mb-1.5 line-clamp-2 px-1">
              {player.name}
            </h3>
            
            {/* Form Display */}
            <div className="flex gap-0.5 mb-2">
              {recentForm.map((result, i) => (
                <div 
                  key={i}
                  className={`w-4 h-4 rounded flex items-center justify-center text-[6px] font-black ${
                    result === 'W' ? 'bg-emerald-100 text-emerald-700' :
                    result === 'D' ? 'bg-zinc-100 text-zinc-500' :
                    'bg-red-100 text-red-700'
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 mt-auto">
              <div className="flex items-center gap-0.5 bg-zinc-100 px-1.5 py-0.5 rounded-md">
                <Target className="w-2 h-2 text-emerald-600" />
                <span className="text-[7px] font-black text-zinc-900">{player.monthlyData[0].goals}</span>
              </div>
              <div className="flex items-center gap-0.5 bg-zinc-100 px-1.5 py-0.5 rounded-md">
                <Zap className="w-2 h-2 text-blue-600" />
                <span className="text-[7px] font-black text-zinc-900">{player.monthlyData[0].assists}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default PlayerCard