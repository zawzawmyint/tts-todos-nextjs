"use client";
import { Register } from "@/components/auth/Register";
import BaseContainer from "@/components/global/BaseContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <BaseContainer>
      <div className="max-w-md m-auto border p-8 rounded-2xl space-y-2 mt-20">
        <h1 className="text-3xl font-bold mb-5">Sign up</h1>
        <h1 className="text-sm font-medium mb-5">
          Please register to join community.
        </h1>
        <Separator className="mb-5" />
        <Register />
        <div className=" text-center mt-4">
          <Button variant={"link"} asChild>
            <Link href={`/sign-in`}>Login</Link>
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Page;
