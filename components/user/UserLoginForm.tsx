"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import OAuthLogin from "./OAuthLogin";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IUserRegister {
  password: string;
  email: string;
}

const UserLoginForm = () => {

  const router = useRouter();


  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IUserRegister>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  });

  register("password", {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[^ ]+[A-Za-z\d@$!%*?&]*$/,
      message: "Password must contain letter, number, and special character",
    },
  });

  register("email", {
    required: "Email address is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address format",
    },
  });

  const handleLogin = async (data: IUserRegister) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (response?.error) {
        toast.error(response.error);
      } else {
        router.push('/')
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login your account</CardTitle>
          <CardDescription>Enter your email below to login your account</CardDescription>
        </CardHeader>

        <OAuthLogin />
        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent className="grid gap-0">
            <div className="grid gap-2 relative pb-4">
              <Label htmlFor="email">Email</Label>
              <Input type="email" placeholder="m@example.com" {...register("email")} />
              <span className="text-xs text-red-400 absolute right-0 bottom-0">{errors?.email && errors?.email?.message}</span>
            </div>
            <div className="grid gap-2 relative pb-4">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} />
              <span className="text-xs text-red-400 absolute right-0 bottom-0">{errors?.password && errors?.password?.message}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">Login Now</Button>

            <Link href="/register" className="text-sm underline">
              New Here? Register Now
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserLoginForm;
