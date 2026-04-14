import { useAppSelector } from "../app/hooks";
import AssetTable from "../components/asset/table/AssetTable";
import StatusCard from "../components/dashboard/StatusCard";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import TypeBarChart from "../components/dashboard/TypeBarChart";
import { useDashBoardData } from "../features/dashboard/useDashboardData";

export default function DashBoardPage() {
  const { assets } = useAppSelector((status: any) => status.assets);
  const {
    total,
    assigned,
    available,
    repaired,
    returned,
    statusData,
    typeData,
  } = useDashBoardData(assets);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatusCard title="Total" value={total} />
        <StatusCard title="Assigned" value={assigned} />
        <StatusCard title="Available" value={available} />
        <StatusCard title="Repaired" value={repaired} />
        <StatusCard title="Returned" value={returned} />
      </div>
      <div className="flex justify-around gap-10">
        <StatusPieChart data={statusData} />
        <TypeBarChart data={typeData} />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Assets</h3>
        <AssetTable
          assets={assets.slice(0, 5)}
          handleDelete={() => {}}
          onEdit={() => {}}
        />
      </div>
    </div>
  );
}
