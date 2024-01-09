import UserLoginForm from "@/components/user/UserLoginForm";
import { authOptions } from "@/helper/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div>
      <UserLoginForm />
    </div>
  );
};

export default LoginPage;
