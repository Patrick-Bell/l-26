const RadialChart = ({ value, max = 100, size = 80, strokeWidth = 6, color = '#10b981', label, icon: Icon }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = ((value / max) * circumference);
    const center = size / 2;

    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            {Icon && <Icon className="w-3.5 h-3.5 mb-0.5" style={{ color }} />}
            <span className="text-sm font-black leading-none">{value}</span>
          </div>
        </div>
        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide text-center">{label}</span>
      </div>
    );
  };

  export default RadialChart