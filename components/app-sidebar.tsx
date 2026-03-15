"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import { PlusIcon, TrashIcon } from "@/components/icons";
import { Smile } from "lucide-react";
import {
  getChatHistoryPaginationKey,
  SidebarHistory,
} from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar() {
  const router = useRouter();
  const user = useUser();
  const { setOpenMobile } = useSidebar();
  const { mutate } = useSWRConfig();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);


  return (
    <Sidebar className="group-data-[side=left]:border-r-0 bg-transparent" variant="inset">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <Link
          href="/"
          onClick={() => setOpenMobile(false)}
          className="flex items-center justify-center w-12 h-12 rounded-2xl glass shadow-soft transition-transform hover:scale-105 active:scale-95"
        >
          <Smile size={24} className="text-primary" />
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex flex-col items-center gap-4 py-4 px-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-2xl glass shadow-soft hover:bg-white/50"
              onClick={() => router.push("/")}
            >
              <PlusIcon size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">New Chat</TooltipContent>
        </Tooltip>

        <SidebarHistory />
      </SidebarContent>

      <SidebarFooter className="p-4 flex flex-col items-center gap-4">
        {user && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-2xl glass shadow-soft hover:bg-white/50 text-destructive"
                onClick={() => setShowDeleteAllDialog(true)}
              >
                <TrashIcon size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Delete All</TooltipContent>
          </Tooltip>
        )}
        <SidebarUserNav />
      </SidebarFooter>

      <AlertDialog open={showDeleteAllDialog} onOpenChange={setShowDeleteAllDialog}>
        <AlertDialogContent className="rounded-3xl border-0 glass overflow-hidden p-0">
          <div className="p-8 space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">Clear all memories?</AlertDialogTitle>
              <AlertDialogDescription className="text-base text-muted-foreground">
                This will permanently delete all your chat history and saved memories. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-3 pt-4">
              <AlertDialogCancel className="rounded-2xl border-0 bg-secondary/50 hover:bg-secondary h-12 px-6 font-semibold">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  const deletePromise = fetch("/api/history", { method: "DELETE" });
                  toast.promise(deletePromise, {
                    loading: "Deleting history...",
                    success: () => {
                      mutate(
                        (key) =>
                          Array.isArray(key) && key[0] === "api/history",
                        undefined,
                        { revalidate: false }
                      );
                      setShowDeleteAllDialog(false);
                      router.push("/");
                      return "History cleared successfully";
                    },
                    error: "Failed to delete history",
                  });
                }}
                className="rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90 h-12 px-6 font-semibold"
              >
                Delete Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}
