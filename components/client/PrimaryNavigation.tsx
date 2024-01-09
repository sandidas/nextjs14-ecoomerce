import React from "react";
import menuData from "./primaryMenuData.json";
import PrimaryMenuItem from "./PrimaryMenuItem";
import PrimaryNavSearchBar from "./PrimaryNavSearchBar";
import DarkLightSwitcher from "./DarkLightSwitcher";
import PrimaryNavDropDown from "./PrimaryNavDropDown";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { Button } from "../ui/button";
import Link from "next/link";

const PrimaryNavigation = () => {
  return (
    <div className="w-full flex flex-col border">
      <div className="grid grid-cols-12 gap-2 items-center py-3 px-5 border-b">
        <Link href={"/"} className="col-span-2 text-2xl font-black">
          Logo
        </Link>
        <div className="col-span-7">
          <PrimaryNavSearchBar />
        </div>
        <div className="col-span-3 flex gap-2 justify-end">
          <DarkLightSwitcher />
          <Button variant={"outline"} size={"icon"}>
            <ShoppingBagIcon className="h-7 w-7" />
          </Button>
          <PrimaryNavDropDown />
        </div>
      </div>

      <div className="flex gap-10 capitalize justify-end px-5">{menuData.length > 0 && menuData.map((menuItem: IPrimaryNavigation, index: number) => <PrimaryMenuItem menuItem={menuItem} key={index} />)}</div>
    </div>
  );
};

export default PrimaryNavigation;
