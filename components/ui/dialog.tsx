"use client";

import * as React from "react";
import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogTitle as RadixDialogTitle,
  DialogTrigger as RadixDialogTrigger,
  DialogOverlay as RadixDialogOverlay,
  DialogPortal,
  DialogClose as RadixDialogClose,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export function Dialog({
  open,
  onOpenChange,
  children,
}: React.PropsWithChildren<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}>) {
  return (
    <RadixDialog open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog>
  );
}

export function DialogTrigger({
  asChild = false,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  return <RadixDialogTrigger asChild={asChild}>{children}</RadixDialogTrigger>;
}

export function DialogContent({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <DialogPortal>
      <RadixDialogOverlay className="fixed inset-0 bg-black/30 z-40" />
      <div
        className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 max-w-full w-[90vw] md:w-[400px] ${className}`}
        tabIndex={-1}
      >
        {children}
        <RadixDialogClose asChild>
          <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </RadixDialogClose>
      </div>
    </DialogPortal>
  );
}

export function DialogHeader({ children }: React.PropsWithChildren) {
  return <div className="mb-2">{children}</div>;
}

export function DialogTitle({ children }: React.PropsWithChildren) {
  return (
    <RadixDialogTitle className="text-lg font-bold">
      {children}
    </RadixDialogTitle>
  );
}

export function DialogFooter({ children }: React.PropsWithChildren) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}

export function DialogClose({
  children,
  asChild = false,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  return <RadixDialogClose asChild={asChild}>{children}</RadixDialogClose>;
}
