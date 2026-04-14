import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

export default function ({ data }: any) {
  return (
    <BarChart width={400} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
}
