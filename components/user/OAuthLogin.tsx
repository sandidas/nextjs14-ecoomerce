"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const handleLogin = () => {
  signIn("google", {
    redirect: false,
    callbackUrl: "/",
  });
};

const OAuthLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button onClick={handleLogin} variant="outline" className="w-full text-xl">
        Google
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </div>
  );
};

export default OAuthLogin;
