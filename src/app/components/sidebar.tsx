"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  FileBadge2,
  Wallet,
  WalletMinimal,
  FileSearch,
  LockKeyhole,
  LockKeyholeOpen,
  icons,
  Layers,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { EditProfile } from "./editProfile";
import { get_user } from "../utils/auth";
import LogOut from "./logOut";

const items = [
  {
    name: "Home",
    href: "/home",
    icon: Home,
  },
  {
    name: "Search",
    href: "/",
    icon: Search,
  },
  {
    name: "Inbox",
    href: "/inbox",
    icon: Inbox,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileBadge2,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: Wallet,
  },
  {
    name: "Passwords",
    href: "/passwords",
    icon: LockKeyhole,
  },
  {
    name: "Tasks",
    href: "/task",
    icon: Check,
  },
  {
    name: "Watch/Read List",
    href: "/watch",
    icon: Layers,
  },
  {
    name: "Settings",
    href: "/",
    icon: Settings,
  },
];
interface User {
  email: string;
  first_name?: string;
  last_name?: string;
  last_login?: string;
}
export function AppSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       setUser(JSON.parse(storedUser));
  //     } catch (e) {
  //       console.error("Error parsing user data:", e);
  //     }
  //   }
  // }, []);
  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await get_user(); // Assume this fetches the logged-in user
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  const getDisplayName = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`.trim().toUpperCase();
    } else {
      return user?.email || "ALLSet";
    }
  };
  const getFirstChar = () => {
    if (user?.first_name) {
      return user.first_name.charAt(0).toUpperCase();
    } else if (user?.last_name) {
      return user.last_name.charAt(0).toUpperCase();
    } else {
      return user?.email.charAt(0).toUpperCase() || "A";
    }
  };
  return (
    <Sidebar className="pl-3">
      <SidebarHeader />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="hover:bg-gray-100 outline-none">
                <div className="flex flex-row items-center ">
                  <div className="pl-1 pr-1 text-sm font-bold text-gray-600 border border-gray-200 rounded-sm bg-gray-100">
                    {getFirstChar()}
                  </div>
                  <div className="pl-2 font-semibold w-40 truncate">
                    {getDisplayName()}
                  </div>
                </div>
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
              <DropdownMenuItem>
                <span>Acme Inc</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Acme Corp.</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Applications</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActive
                        ? "bg-gray-200 hover:bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Link href={item.href}>
                      {(() => {
                        if (item.name === "Passwords" && isActive) {
                          return <LockKeyholeOpen />;
                        } else if (item.name === "Tasks" && isActive) {
                          return <CheckCheck />;
                        } else if (item.name === "Finance" && isActive) {
                          return <WalletMinimal />;
                        } else {
                          return <item.icon />;
                        }
                      })()}
                      <span className="text-sm font-semibold ">
                        {item.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hover:bg-gray-100">
                <SidebarMenuButton>
                  <div>Username</div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div className="block w-full cursor-pointer">
                    <EditProfile />
                    {/* Here Edit Profile is a component */}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Change Password</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <div>
                    <LogOut />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarFooter />
    </Sidebar>
  );
}
