"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronsUpDown, Check, Search } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Chọn...",
  searchable = true,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Click outside để đóng dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // ESC để đóng
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Focus search khi mở
  useEffect(() => {
    if (open && searchable) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open, searchable]);

  const selected = options.find((o) => o.value === value);
  const filtered =
    query.trim() === ""
      ? options
      : options.filter((o) =>
          o.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={`relative w-full ${className}`} ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`
          flex items-center justify-between w-full px-3 py-2 rounded border bg-white
          focus:outline-none focus:ring-2 focus:ring-primary/50
          transition text-base
          ${!selected ? "text-gray-400" : ""}
        `}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronsUpDown className="w-4 h-4 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`
            absolute z-20 left-0 w-full mt-2 bg-white border rounded-lg shadow-lg py-2
            animate-fadein
          `}
        >
          {searchable && (
            <div className="flex items-center px-3 mb-2">
              <Search className="w-4 h-4 mr-2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent outline-none py-1 text-base"
                placeholder="Tìm kiếm..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}
          <ul tabIndex={-1} className="max-h-60 overflow-auto" role="listbox">
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400 select-none">
                Không tìm thấy
              </li>
            )}
            {filtered.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                className={`
                  flex items-center gap-2 px-4 py-2 text-base cursor-pointer select-none
                  hover:bg-primary/10
                  ${value === option.value ? "font-bold text-primary" : ""}
                `}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={`w-4 h-4 mr-2 ${
                    value === option.value ? "opacity-100" : "opacity-0"
                  } text-primary`}
                />
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Animation keyframes */}
      <style jsx>{`
        .animate-fadein {
          animation: fadein 0.16s;
        }
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
