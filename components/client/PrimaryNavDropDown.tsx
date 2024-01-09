"use client";
import React from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowRightStartOnRectangleIcon, UserIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const PrimaryNavDropDown = () => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log("session", session);

  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"icon"}>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="text-xl hover:cursor-pointer">
                <UserIcon className="mr-2 h-5 w-5" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-xl hover:cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                <ArrowRightStartOnRectangleIcon className="mr-2 h-5 w-5" />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          size={"icon"}
          onClick={() => {
            router.push("/login");
          }}
        >
          <UserIcon className="h-7 w-7" />
        </Button>
      )}
    </>
  );
};

export default PrimaryNavDropDown;
