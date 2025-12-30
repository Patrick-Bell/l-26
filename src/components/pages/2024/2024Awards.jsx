import React, { useState, useEffect } from 'react';
import { Shuffle, Users, Trophy, Zap, Target, Shield, ArrowRight, BarChart3, Star, Activity, TrendingUp, User, Bot, Hammer, Medal } from 'lucide-react';
import TwentyFourPOTM from './2024POTM';
import TwentyFourLeaderboard from './2024Leaderboard';


const TwentyFourAwards = () => {

    const [activeTab, setActiveTab] = useState('potm');

    const tabs = [
        { id: 'potm', label: 'POTM', icon: Medal },
        { id: 'awards', label: 'Awards', icon: Star },
        { id: 'leaderboards', label: 'Leaderboards', icon: BarChart3 },
      ];
    
    return (

        <>

    <div className="min-h-screen font-sans text-zinc-900">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg"><Bot className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-tighter italic">Awards</h1>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Season 24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row + Generate Button */}
      <div className="bg-white border-b border-zinc-200 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Tabs */}
            <div className="flex items-center gap-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-left transition-all ${
                    activeTab === tab.id 
                      ? 'bg-zinc-900 text-white' 
                      : 'text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto py-6">
        {/* Main Content Area */}
        <div className="space-y-4">

           {activeTab === 'potm' && (
            <TwentyFourPOTM />
           )}

           {activeTab === 'leaderboards' && (
            <TwentyFourLeaderboard />
           )}

            {activeTab === 'awards' && (
                <p className='text-xs text-gray-600 font-bold uppercase tracking-wide'>Coming Soon...</p>
            )}
   

        </div>
      </div>


    </div>
        
        </>
    )
}

export default TwentyFourAwards