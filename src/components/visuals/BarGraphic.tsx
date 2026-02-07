import { BarChart, Bar, XAxis, YAxis } from "recharts";

const data = [{ name: "Progress", completed: 60, remaining: 40 }];

export const BarGraphic = () => {
  return (
    <BarChart width={400} height={40} data={data} layout="vertical">
      <XAxis type="number" hide />
      <YAxis type="category" dataKey="name" hide />

      <Bar
        dataKey="completed"
        stackId="a"
        fill="#82ca9d"
        radius={[10, 0, 0, 10]}
      />
      <Bar
        dataKey="remaining"
        stackId="a"
        fill="#e0e0e0"
        radius={[0, 10, 10, 0]}
      />
    </BarChart>
  );
};
