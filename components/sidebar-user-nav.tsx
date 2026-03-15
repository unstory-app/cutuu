import { ChevronUp, LogOut, User as UserIcon, Palette } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStackApp, useUser } from "@stackframe/stack";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarUserNav() {
  const router = useRouter();
  const user = useUser();
  const stackApp = useStackApp();
  const { setTheme, resolvedTheme } = useTheme();

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="h-12 rounded-3xl bg-secondary/50 text-secondary-foreground"
            onClick={() => router.push("/handler/sign-in")}
          >
            <UserIcon size={20} />
            <span className="font-semibold">Sign In</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="h-12 rounded-3xl bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 shadow-sm data-[state=open]:bg-white dark:data-[state=open]:bg-zinc-900 border border-border/50"
              data-testid="user-nav-button"
            >
              <Image
                alt={user.displayName || user.primaryEmail || "User Avatar"}
                className="rounded-full border-2 border-primary/20"
                height={28}
                src={user.profileImageUrl || `https://avatar.vercel.sh/${user.primaryEmail}`}
                width={28}
              />
              <span className="truncate font-medium text-foreground/80" data-testid="user-email">
                {user.displayName || user.primaryEmail?.split("@")[0]}
              </span>
              <ChevronUp className="ml-auto opacity-40" size={18} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-popper-anchor-width) rounded-4xl p-2 border-border/50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl"
            data-testid="user-nav-menu"
            side="top"
          >
            <DropdownMenuItem
              className="cursor-pointer rounded-2xl gap-2 font-medium"
              data-testid="user-nav-item-theme"
              onSelect={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              <Palette size={16} className="text-primary" />
              {`${resolvedTheme === "light" ? "Dark" : "Light"} mode`}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/30 my-1" />
            <DropdownMenuItem
              className="cursor-pointer rounded-2xl gap-2 font-medium text-destructive focus:text-destructive focus:bg-destructive/5"
              data-testid="user-nav-item-auth"
              onSelect={() => stackApp.signOut()}
            >
              <LogOut size={16} />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
