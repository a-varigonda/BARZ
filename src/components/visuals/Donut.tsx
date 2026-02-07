import { useState } from "react";
import { Pie, PieChart, Sector, Tooltip, Cell } from "recharts";
import type { PieSectorDataItem } from "recharts";

const data = [
  { name: "Available", value: 300 },
  { name: "Spent", value: 400 },
];

const COLORS = ["#00C49F", "#FF8042"];

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
}: PieSectorDataItem) => {
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
    </g>
  );
};

export default function Donut() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const preselectedIndex = 0; // "Spent" slice preselected

  const total = data.reduce((sum, d) => sum + d.value, 0);

  // Determine center text
  const centerIndex = hoveredIndex !== null ? hoveredIndex : preselectedIndex;

  const centerPercent = ((data[centerIndex].value / total) * 100).toFixed(1);
  const centerLabel = data[centerIndex].name;

  return (
    <PieChart style={{ width: "100%", maxWidth: "300px", aspectRatio: 1 }}>
      <g>
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={40}
          fontWeight={700}
          fill={COLORS[centerIndex]}
        >
          {centerPercent}%
        </text>
        <text
          x="50%"
          y="52%"
          dy={24}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={24}
          fill="#888"
        >
          {centerLabel}
        </text>
      </g>

      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        activeShape={renderActiveShape}
        onMouseEnter={(_, index) => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index]}
            stroke={
              index === (hoveredIndex ?? preselectedIndex) ? "#ffffff" : ""
            }
            strokeWidth={index === (hoveredIndex ?? preselectedIndex) ? 2 : 0}
          />
        ))}
      </Pie>

      <Tooltip content={() => null} />
    </PieChart>
  );
}
