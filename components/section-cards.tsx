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
import clsx from "clsx";

const overviewData = [
  {
    label: "Tổng số bệnh nhân",
    value: 24,
    loading: false,
    trend: { icon: IconTrendingUp, value: "", color: "emerald" },
    icon: IconUserCheck,
    info: "Đã khám trong tháng",
    infoColor: "text-emerald-600",
    sub: "Số lượng bệnh nhân mới tăng nhẹ",
  },
  {
    label: "Lịch hẹn khám bệnh",
    value: 156,
    loading: false,
    trend: { icon: IconTrendingUp, value: "+5%", color: "blue" },
    icon: IconCalendar,
    info: "Tăng lịch hẹn",
    infoColor: "text-blue-600",
    sub: "Tỷ lệ hủy hẹn giảm",
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
    loading: true,
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

const trendColors = {
  emerald: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
  yellow: "bg-yellow-100 text-yellow-700",
  rose: "bg-rose-100 text-rose-700",
  gray: "bg-gray-100 text-gray-700",
};

export function SectionCards() {
  return (
    <div
      className="
        grid grid-cols-1 gap-5 px-4 py-2
        sm:grid-cols-2 xl:grid-cols-4
      "
    >
      {overviewData.map((item, idx) => (
        <Card
          key={idx}
          className={clsx(
            "group relative overflow-hidden transition shadow-md border border-gray-100 bg-gradient-to-t from-emerald-50/80 to-white",
            "hover:-translate-y-1 hover:shadow-xl"
          )}
        >
          <CardHeader>
            <CardDescription className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <item.icon className="w-5 h-5 text-emerald-500" />
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
                className={clsx(
                  "gap-1 text-xs px-2 py-1",
                  trendColors[item.trend.color as keyof typeof trendColors] ||
                    trendColors.gray
                )}
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
                  className={clsx(
                    "flex gap-2 items-center font-medium",
                    item.infoColor
                  )}
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
