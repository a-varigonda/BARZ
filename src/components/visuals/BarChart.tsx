import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

//Needs sorted data
const data = [
  { name: "Cat A", spending_by_category: 1 },
  { name: "Cat B", spending_by_category: 2 },
  { name: "Cat C", spending_by_category: 3 },
  { name: "Cat D", spending_by_category: 4 },
  { name: "Cat E", spending_by_category: 5 },
];

export const SimpleBarChart = () => {
  return (
    <BarChart
      layout="vertical"
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="spending_by_category"
        fill="#8884d8"
        radius={[10, 10, 10, 10]}
      />
      <RechartsDevtools />
    </BarChart>
  );
};
