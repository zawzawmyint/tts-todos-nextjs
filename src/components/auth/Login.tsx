"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { createLoginValidationSchema } from "@/utils/validation-schema/AuthValidationSchema";
import { AuthRenderArea } from "./AuthRenderArea";

import SubmitButton from "@/components/generic/SubmitButton";
import { authClient } from "@/lib/auth-client";
import { LoginFormValues } from "@/utils/types/validation-types/validation-types";

export function Login() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const LoginValidationSchema = createLoginValidationSchema();
  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    mode: "onTouched",
    defaultValues: {
      email: "zack@gmail.com",
      password: "11111111",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginValidationSchema>) {
    startTransition(async () => {
      const { email, password } = data;

      try {
        const result = await authClient.signIn.email({
          email,
          password,
        });
        if (result.data?.token) {
          toast.success("SUCCESS", {
            description: "Login successfully",
          });
          router.push("/"); // or your desired
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error);
        toast.error("Error", {
          description: "Login failed",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <AuthRenderArea<LoginFormValues> form={form} />
        </div>
        <SubmitButton isPending={isPending} fullWidth />
      </form>
    </Form>
  );
}
