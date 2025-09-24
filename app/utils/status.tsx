import { Loader2, CheckCircle2, Clock, XCircle, Zap } from "lucide-react";

export function getStatusBadge(status: string) {
  switch (status) {
    // case "dang_cho":
    //   return {
    //     label: "Đang chờ",
    //     color: "border-yellow-200 bg-yellow-50 text-yellow-700",
    //     icon: <Clock className="w-4 h-4 mr-1 inline" />,
    //   };
    case "cho_xu_ly":
      return {
        label: "Chờ xử lý",
        color: "border-blue-200 bg-blue-50 text-blue-700",
        icon: <Loader2 className="w-4 h-4 mr-1 inline animate-spin" />,
      };
    case "da_hoan_thanh":
      return {
        label: "Đã hoàn thành",
        color: "border-emerald-200 bg-emerald-50 text-emerald-700",
        icon: <CheckCircle2 className="w-4 h-4 mr-1 inline text-emerald-600" />,
      };
    case "da_huy":
      return {
        label: "Đã huỷ",
        color: "border-rose-200 bg-rose-50 text-rose-700",
        icon: <XCircle className="w-4 h-4 mr-1 inline text-rose-600" />,
      };
    default:
      return {
        label: "Không xác định",
        color: "border-gray-200 bg-gray-50 text-gray-600",
        icon: <Zap className="w-4 h-4 mr-1 inline" />,
      };
  }
}
