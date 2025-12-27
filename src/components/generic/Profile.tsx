"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { TooltipBox } from "./ToolTip";
import { LogOut } from "lucide-react";

export function AvatarProfile() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };
  return (
    <TooltipBox title={session ? "Logout" : "Login"}>
      <div
        className="flex flex-row flex-wrap items-center gap-4 hover:shadow-sm shadow-black/50 rounded-3xl p-1 px-2 cursor-pointer"
        onClick={handleLogout}
      >
        <Avatar>
          <AvatarImage
            src={`${
              session
                ? "https://github.com/shadcn.png"
                : "https://github.com/evilrabbit.png"
            }`}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {session && (
          <div className="flex items-center gap-2 text-lg">
            {session?.user.name} <LogOut size={18} />
          </div>
        )}
      </div>
    </TooltipBox>
  );
}
