import {
  IconTrendingDown,
  IconTrendingUp,
  IconUserCheck,
  IconCalendar,
  IconMedicineSyrup,
  IconCash,
  IconLoader,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const overviewData = [
  {
    label: "Tổng số bệnh nhân",
    value: 24,
    loading: false,
    trend: { icon: IconTrendingUp, value: "", color: "" },
    icon: IconUserCheck,
    info: "",
    infoColor: "text-emerald-600",
    sub: "",
  },
  {
    label: "Lịch hẹn khám bệnh",
    value: 156,
    loading: false,
    trend: { icon: IconTrendingUp, value: " ", color: " " },
    icon: IconCalendar,
    info: " ",
    infoColor: "text-blue-600",
    sub: " ",
  },
  {
    label: "Doanh thu tháng",
    value: "45.2M",
    loading: true,
    trend: { icon: IconTrendingUp, value: "+12%", color: "yellow" },
    icon: IconCash,
    info: "Tăng trưởng ổn định",
    infoColor: "text-yellow-700",
    sub: "Đạt mục tiêu đề ra",
    loadingText: "Đang cập nhật…",
    loadingInfo: "Vui lòng chờ cập nhật doanh thu…",
    loaderColor: "text-yellow-400",
  },
  {
    label: "Thuốc đông y",
    value: "89%",
    loading: true, // Đang cập nhật
    trend: { icon: IconTrendingDown, value: "-5%", color: "rose" },
    icon: IconMedicineSyrup,
    info: "Tồn kho còn đủ",
    infoColor: "text-rose-600",
    sub: "Cần bổ sung một số vị thuốc",
    loadingText: "Đang cập nhật…",
    loadingInfo: "Vui lòng chờ cập nhật tồn kho…",
    loaderColor: "text-emerald-400",
  },
];

export function SectionCards() {
  return (
    <div
      className="
        grid grid-cols-1 gap-5 px-4 py-2
        sm:grid-cols-2 xl:grid-cols-4
        *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-emerald-50/80 *:data-[slot=card]:to-white
        dark:*:data-[slot=card]:from-[#1f2e24]/70 dark:*:data-[slot=card]:to-[#1e2329]
        *:data-[slot=card]:shadow-md *:data-[slot=card]:border
        *:data-[slot=card]:hover:-translate-y-1 *:data-[slot=card]:hover:shadow-xl
        transition-all duration-300
      "
    >
      {overviewData.map((item, idx) => (
        <Card key={idx} className="group relative overflow-hidden transition">
          <CardHeader>
            <CardDescription className="text-slate-600 dark:text-slate-300">
              {item.label}
            </CardDescription>
            <CardTitle className="text-3xl font-bold tabular-nums flex items-center gap-2">
              {item.loading ? (
                <>
                  <IconLoader
                    className={`animate-spin ${
                      item.loaderColor || "text-emerald-400"
                    }`}
                  />
                  <span>{item.loadingText || "Đang cập nhật…"}</span>
                </>
              ) : (
                item.value
              )}
            </CardTitle>
            <CardAction>
              <Badge
                // variant={item.loading ? "outline" : "success"}
                className={
                  item.loading
                    ? `gap-1 text-xs px-2 py-1 bg-${item.trend.color}-50 text-${item.trend.color}-600`
                    : `gap-1 text-xs px-2 py-1 bg-${item.trend.color}-100 text-${item.trend.color}-700`
                }
              >
                {item.loading ? (
                  <>Đang cập nhật</>
                ) : (
                  <>
                    <item.trend.icon className="size-4" />
                    {item.trend.value}
                  </>
                )}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            {item.loading ? (
              <div className="text-muted-foreground">
                {item.loadingInfo || "Vui lòng chờ cập nhật…"}
              </div>
            ) : (
              <>
                <div
                  className={`flex gap-2 items-center font-medium ${item.infoColor}`}
                >
                  <item.icon className="size-4" />
                  {item.info}
                </div>
                <div className="text-muted-foreground">{item.sub}</div>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
