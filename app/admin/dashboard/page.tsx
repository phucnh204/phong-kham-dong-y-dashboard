import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <h1 className="text-2xl font-bold text-balance">
              Phòng khám Đông y Cần Thơ
            </h1>
            <p className="text-muted-foreground text-pretty">
              Quản lý hiệu quả hoạt động phòng khám và chăm sóc bệnh nhân
            </p>
          </div>

          <SectionCards />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>

          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
