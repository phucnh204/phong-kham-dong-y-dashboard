import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";

export default function DashboardDoctorPage() {
  return (
    <div className="flex flex-col min-h-svh bg-gradient-to-br from-white to-emerald-50/60">
      <div className="w-full  mx-auto flex-1 flex flex-col gap-2">
        <header className="px-4 lg:px-8 pt-8 pb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-1 tracking-tight">
            Cần Thơ Oriental Clinic Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            <span>
              Tổng quan{" "}
              <span className="font-bold text-emerald-700">
                hoạt động phòng khám
              </span>
              , quản lý lịch khám – doanh thu – tồn kho{" "}
              <span className="hidden md:inline">
                , nâng cao trải nghiệm bệnh nhân và tối ưu vận hành.
              </span>
            </span>
          </p>
        </header>
      </div>
    </div>
  );
}
