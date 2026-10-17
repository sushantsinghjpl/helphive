import React from 'react';

export const RevenueAreaChart: React.FC = () => {
  // Demo monthly data: Jan to Jun
  const data = [
    { month: 'Jan', revenue: 14200 },
    { month: 'Feb', revenue: 21800 },
    { month: 'Mar', revenue: 32500 },
    { month: 'Apr', revenue: 41200 },
    { month: 'May', revenue: 58900 },
    { month: 'Jun', revenue: 74200 },
  ];

  const maxVal = 80000;
  const width = 500;
  const height = 180;
  const padX = 40;
  const padY = 20;

  // Calculate SVG points
  const points = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * (width - 2 * padX);
    const y = height - padY - (d.revenue / maxVal) * (height - 2 * padY);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
          const y = height - padY - ratio * (height - 2 * padY);
          return (
            <line
              key={idx}
              x1={padX}
              y1={y}
              x2={width - padX}
              y2={y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Gradient fill */}
        <path d={areaD} fill="url(#revenueGrad)" />

        {/* Stroke line */}
        <path d={pathD} fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />

        {/* Points & Labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#0d9488" className="hover:scale-150 transition" />
            <text
              x={p.x}
              y={height - 2}
              textAnchor="middle"
              className="text-[10px] fill-slate-400 font-semibold"
            >
              {p.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const ServiceDistributionBar: React.FC = () => {
  const distribution = [
    { name: 'Hospital Assistance', percentage: 42, color: 'bg-brand-500' },
    { name: 'Elderly Care', percentage: 26, color: 'bg-emerald-500' },
    { name: 'Driver for Own Car', percentage: 18, color: 'bg-amber-500' },
    { name: 'Personal Assistant', percentage: 9, color: 'bg-indigo-500' },
    { name: 'Urgent Help', percentage: 5, color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-3 pt-2">
      {/* Segmented bar */}
      <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
        {distribution.map((d, i) => (
          <div
            key={i}
            style={{ width: `${d.percentage}%` }}
            className={`${d.color} h-full transition-all`}
            title={`${d.name}: ${d.percentage}%`}
          />
        ))}
      </div>

      {/* Legend list */}
      <div className="space-y-1.5 pt-2">
        {distribution.map((d, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${d.color}`}></span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">{d.name}</span>
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
