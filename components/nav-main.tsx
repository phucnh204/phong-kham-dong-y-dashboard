"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    badge?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1 px-2 py-2">
        <SidebarMenu>
          {items.map((item) => {
            let cleanUrl = item.url.startsWith("/") ? item.url : "/" + item.url;
            const fullUrl = "/admin" + cleanUrl;

            const isActive =
              pathname === fullUrl || pathname.startsWith(fullUrl + "/");

            const IconComp = item.icon;

            return (
              <SidebarMenuItem key={item.title} className="group">
                <SidebarMenuButton
                  href={fullUrl}
                  tooltip={item.title}
                  isActive={isActive}
                  aria-label={item.title}
                  className={clsx(
                    ` flex items-center gap-3 w-full px-4 py-5 rounded-md shadow
            font-medium transition-all duration-200 text-green-200
            focus:outline-none focus:ring-2 focus:ring-primary/50 select-none group
          `,
                    isActive
                      ? "bg-gradient-to-r  text-white shadow-lg"
                      : "hover:bg-primary/5 hover:text-primary/95 text-muted-foreground"
                  )}
                  style={{
                    boxShadow: isActive
                      ? "0 2px 16px 0 rgba(16,185,129,0.08)"
                      : undefined,
                  }}
                >
                  {IconComp && (
                    <motion.span
                      initial={false}
                      animate={
                        isActive
                          ? { scale: 1.2, rotate: 4, color: "#10b981" }
                          : { scale: 1, rotate: 0, color: "#6b7280" }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                        mass: 0.45,
                      }}
                      className={clsx(
                        "flex items-center justify-center transition-all",
                        isActive
                          ? "text-primary drop-shadow-md"
                          : "text-slate-400 group-hover:text-primary"
                      )}
                    >
                      <IconComp size={22} stroke={1.7} />
                    </motion.span>
                  )}
                  <span
                    className={clsx(
                      "truncate transition-all",
                      isActive
                        ? "font-bold text-base tracking-wide"
                        : "text-base font-medium"
                    )}
                  >
                    {item.title}
                  </span>
                  {/* Badge animate */}
                  <AnimatePresence>
                    {item.badge && (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0, y: 3 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.6, opacity: 0, y: 6 }}
                        transition={{ type: "spring", stiffness: 320 }}
                        className="ml-auto text-xs bg-rose-500 text-white px-2 py-0.5 rounded-full shadow"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
