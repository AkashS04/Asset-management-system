import { Cell, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
export default function StatusPieChart({ data }: any) {
  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100} label>
        {data.map((_: any, index: number) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
