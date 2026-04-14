interface Props {
  title: string;
  value: number;
}

export default function StatusCard({ title, value }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <h4 className="text-gray-500">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
