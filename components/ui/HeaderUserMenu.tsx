import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export function HeaderUserMenu() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full hover:ring-2 hover:ring-emerald-300/50 transition p-0">
          <Avatar className="h-9 w-9 rounded-xl shadow-sm">
            <AvatarImage src={"/default-avatar.png"} alt={user.username} />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-emerald-300 via-white to-cyan-200 text-xl font-bold text-emerald-800 border">
              {user.username?.slice(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-64 rounded-2xl border bg-white/90 shadow-2xl p-2 backdrop-blur-md"
        side="bottom"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 mb-2">
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar className="h-10 w-10 rounded-xl shadow border-2 border-emerald-200">
              <AvatarImage src={"/default-avatar.png"} alt={user.username} />
              <AvatarFallback className="rounded-xl bg-gradient-to-br from-emerald-300 via-white to-cyan-200 text-lg font-bold text-emerald-800 border">
                {user.username?.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="font-bold text-base text-gray-900 truncate">
                {user.username}
              </div>
              <div className="text-gray-400 text-xs truncate">{user.email}</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="group gap-2 rounded-lg hover:bg-emerald-50 transition">
            <IconUserCircle className="text-emerald-600 group-hover:text-emerald-700" />
            <span>Thông tin tài khoản</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 gap-2 rounded-lg hover:bg-red-50 transition font-semibold"
        >
          <IconLogout className="text-red-500" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
