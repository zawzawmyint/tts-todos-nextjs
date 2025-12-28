"use client";
import BaseContainer from "@/components/global/BaseContainer";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRightSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // const session = await auth();
  const { data: session } = authClient.useSession();
  return (
    <BaseContainer>
      <div className="max-w-5xl mx-auto h-125 p-2 flex flex-col justify-center items-center text-center gap-6">
        <h1 className="text-5xl sm:text-8xl font-bold opacity-75 tracking-wide">
          ClearMind, Progress Path, Momentum
        </h1>
        <p className="font-medium ">
          Transform overwhelming lists into achievable victories. Smart task
          management that adapts to your workflow, helping you focus on what
          truly matters.
        </p>
        {session ? (
          <Link href={`${"/todos"}`}>
            <Button className="w-30 rounded-4xl cursor-pointer">
              Todos <ArrowRightSquare />
            </Button>
          </Link>
        ) : (
          <Link href={`${"/sign-in"}`}>
            <Button className="w-30 rounded-4xl cursor-pointer">
              Sign in <ArrowRightSquare />
            </Button>
          </Link>
        )}
      </div>
    </BaseContainer>
  );
}
