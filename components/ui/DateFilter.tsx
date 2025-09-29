import { Calendar as CalendarIcon, XCircle } from "lucide-react";
import clsx from "clsx";

export function DateFilter({
  dateFilter,
  setDateFilter,
  label = "Lọc theo ngày",
  clearLabel = "Xoá",
  className,
  ...props
}: any) {
  return (
    <div className={clsx("flex flex-col gap-1", className)} {...props}>
      <div className="relative w-[155px]">
        <CalendarIcon
          className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-auto cursor-pointer"
          onClick={() => document.getElementById("date-filter")?.focus()}
        />
        <input
          id="date-filter"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className={clsx(
            "pl-10 pr-8 py-2 w-full rounded-xl border border-gray-300 text-sm bg-white/90",
            "focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all",
            dateFilter && "border-emerald-400"
          )}
          placeholder="Chọn ngày"
        />
        {dateFilter && (
          <XCircle
            onClick={() => setDateFilter("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer transition-all"
            tabIndex={0}
            role="button"
            aria-label={clearLabel}
          />
        )}
      </div>
      {/* Gợi ý: Show ngày đã chọn rõ nét, dưới label */}
      {dateFilter && (
        <div className="pl-10 pt-1 text-xs text-emerald-600 font-semibold select-none animate-fade-in">
          Đã chọn: {new Date(dateFilter).toLocaleDateString("vi-VN")}
        </div>
      )}
    </div>
  );
}
