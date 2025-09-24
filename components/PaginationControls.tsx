import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import * as React from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalItems: number;
  pageSizeOptions?: number[];
  className?: string;
}

export function PaginationControls({
  page,
  totalPages,
  setPage,
  pageSize,
  setPageSize,
  totalItems,
  pageSizeOptions = [9, 12, 24, 36, 48],
  className = "",
}: PaginationControlsProps) {
  // Range hiển thị
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  // Không render nếu chỉ có 1 trang và không đủ để phân trang
  if (totalPages <= 1 && totalItems <= pageSize) return null;

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-2 ${className}`}
    >
      {/* Thông tin range */}
      <div className="flex items-center gap-2 text-[15px] text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground">{from}</span>
          {"-"}
          <span className="font-semibold text-foreground">{to}</span>
          <span className="mx-1">/</span>
          <span className="font-semibold text-foreground">{totalItems}</span>
          <span className="ml-1 text-muted-foreground hidden sm:inline">
            lịch hẹn
          </span>
        </span>
        <span className="text-xs text-muted-foreground font-medium hidden md:inline">
          ({totalPages} trang)
        </span>
      </div>
      {/* Nút và dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="select-page-size" className="sr-only">
          Dòng/trang
        </label>
        <select
          id="select-page-size"
          className="border border-muted rounded-md px-2 py-1 text-sm bg-background shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition min-w-[65px] hover:border-primary"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}/trang
            </option>
          ))}
        </select>
        <Button
          aria-label="Trang trước"
          size="icon"
          variant="ghost"
          className="rounded-full border border-muted shadow-sm bg-white transition-all
                     hover:bg-primary/10 hover:border-primary active:scale-90"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          <IconChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          aria-label="Trang sau"
          size="icon"
          variant="ghost"
          className="rounded-full border border-muted shadow-sm bg-white transition-all
                     hover:bg-primary/10 hover:border-primary active:scale-90"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          <IconChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
