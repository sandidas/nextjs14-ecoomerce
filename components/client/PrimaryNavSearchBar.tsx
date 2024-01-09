import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const PrimaryNavSearchBar = () => {
  return (
    <div className="flex w-full relative">
      <Input placeholder="Search...." className="w-full text-xl" />

      <Button className="absolute right-0" variant={"outline"} size={"icon"}>
        <MagnifyingGlassIcon className="h-7 w-7" />
      </Button>
    </div>
  );
};

export default PrimaryNavSearchBar;
