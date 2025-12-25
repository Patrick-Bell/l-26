"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { allPlayers } from "../../api/Players";
import { useState } from "react";

const metricColors = {
  goals: "#3b82f6",
  assists: "#10b981",
  clean_sheets: "#f59e0b",
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg border border-zinc-100 text-xs">
        <p className="font-bold text-zinc-800 mb-1">{label}</p>
        <p className="text-zinc-600">{payload[0].name}: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const ComparisonsSection = ({ comparisonData, player }) => {

    const [players, setPlayers] = useState(allPlayers)

  if (!comparisonData) return <p>No players to compare with.</p>;

  const retrieveStat = (player) => {
    
    if (player.position === 'GK') return 'clean_sheets';
    if (player.position === 'DEF') return 'clean_sheets';
    if (player.position === 'MID') return 'goals';
    if (player.position === 'LM') return 'assists';
    if (player.position === 'RM') return 'assists';
    if (player.position === 'ST') return 'goals';
  }


  const getAverageStat = (stat) => {
    const filteredPlayers = players.filter((p) => p.position === player.position && p.id !== player.id)
    const length = filteredPlayers.length;

    const total = filteredPlayers.reduce((acc, p) => {
      const statValue = p.monthlyData[0]?.[stat] || 0;
      return acc + statValue;
    }, 0)

    return (total / length).toFixed(2);
  }

const getPerformance = (stat) => {
    const playerValue = player?.monthlyData[0]?.[stat] || 0;
    const avgValue = parseFloat(getAverageStat(stat));
  
    if (playerValue > avgValue) return "Above Average";
    if (playerValue < avgValue) return "Below Average";
    return "Average";
  };
  


  const { metrics, chartData } = comparisonData;

  const stat = retrieveStat(player); // dynamically get stat for this player
  const playerValue = player?.monthlyData[0]?.[stat] || 0;
  const avgValue = parseFloat(getAverageStat(stat));

  return (
    <>

<div className="grid grid-cols-3 gap-2">

<div className="bg-white p-2.5 rounded-xl border border-zinc-100">
    <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5 truncate">{player.name} {stat}'s</p>
    <p className="text-sm font-black text-zinc-900">{playerValue}</p>
</div>   

<div className="bg-white p-2.5 rounded-xl border border-zinc-100">
    <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5 truncate">Average {stat}'s</p>
    <p className="text-sm font-black text-zinc-900">{avgValue}</p>
</div> 

<div className="bg-white p-2.5 rounded-xl border border-zinc-100">
  <p className="text-[7px] font-bold text-zinc-400 uppercase mb-0.5 truncate">Performance</p>
  <p className="text-sm font-black text-zinc-900">{getPerformance(stat)}</p>
</div>


</div>  

    <div>
      {metrics.map((metric) => (
        <div
          key={metric}
          className="bg-white rounded-xl p-4 border border-zinc-100"
        >
          {/* Header */}
          <h4 className="text-sm font-bold mb-1">{metric.replace("_", " ")}</h4>
          <p className="text-[10px] text-zinc-500 mb-3">
            Comparing players in the same position
          </p>

          {/* Bar Chart */}
          <BarChart
            width={'100%'}
            height={200}
            data={chartData}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey={metric}
              fill={metricColors[metric]}
              radius={[4, 4, 0, 0]}
              barSize={25}
            />
          </BarChart>

          {/* Footer trend note */}
          <p className="text-[10px] text-zinc-400 mt-2">
            Showing {metric.replace("_", " ")} for players in the last month
          </p>
        </div>
      ))}
    </div>
    </>
  );
};

export default ComparisonsSection;
