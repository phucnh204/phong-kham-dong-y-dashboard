import * as React from "react";

import { cn } from "@/app/utils/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        `
        bg-gradient-to-br from-white via-emerald-50/80 to-white
        dark:from-[#172921] dark:via-[#1b2e2c]/80 dark:to-[#141b1f]
        flex flex-col gap-5
        rounded-2xl border border-emerald-100/70 dark:border-[#283535]/50
        p-6 shadow-[0_2px_24px_0_rgba(16,185,129,0.10)]
        hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.17)]
        hover:-translate-y-1 transition-all duration-300
        min-h-[175px]
        `,
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-2 px-0 pt-0 pb-2", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-extrabold text-3xl xl:text-4xl leading-tight text-gray-900 dark:text-emerald-300 flex items-center gap-2 tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-gray-500 dark:text-gray-300 text-base font-medium",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "absolute top-4 right-6 flex items-center gap-1",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex flex-col items-start gap-2 pt-1 text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        `
        px-6 py-2
        text-base
        text-slate-800 dark:text-slate-200
        `,
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
