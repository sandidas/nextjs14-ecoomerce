"use client";

import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { ArrowSmallUpIcon } from "@heroicons/react/20/solid";
import { ArrowSmallDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const SidebarItem: React.FC<ISidebarItemProps> = ({ item, level, activeItemId, setOpened }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathName = usePathname();

  const hasChildren = item.children && item.children.length > 0;

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = activeItemId === item.id || (item.children && item.children.some((child: DashboardNavigationItem) => child.id === activeItemId)) || pathName === item.link;
  return (
    <>
      {/* 
      // ============== 
      THIS WILL PRINT IN UI
      // ============== 
       */}
      <div>
        <div>
          <Link href={item.link ?? "#"} className={`flex w-full group items-center hover:bg-slate-500/10 rounded-md justify-between pl-2 py-1 ${isActive ? "text-gray-900 font-semibold" : "text-gray-700"}`} onClick={() => handleToggleCollapse()}>
            <div className="py-1 px-1  flex items-center space-x-1  text-slate-300 group-hover:text-primary">
              {item.icon ? (
                <item.icon className="w-5 h-5 mr-1 fill-slate-300 dark:fill-slate-500" />
              ) : (
                <>
                  <ChevronRightIcon className="w-5 h-5 mr-1 fill-slate-400 dark:fill-slate-400" />
                </>
              )}

              <span className="text-title group-hover:text-primary font-medium text-base">{item.label}</span>
            </div>

            {hasChildren && (
              <div className={`mr-2 ${isCollapsed ? "transform rotate-0" : "transform rotate-90"}`}>
                {isCollapsed ? (
                  <span className="text-gray-400">
                    <ArrowSmallDownIcon className="h-5 w-5 fill-primary" />
                  </span>
                ) : (
                  <span className="text-gray-400">
                    <ArrowSmallUpIcon className="h-5 w-5" />
                  </span>
                )}
              </div>
            )}
          </Link>
        </div>
      </div>
      {/* BOTTOM IS MOBILE VERSION */}
      <div className="hidden">
        <div>
          <Link
            href={item.link ?? "#"}
            className={`flex w-full group items-center justify-between p-1 hover:bg-background ${isActive ? "text-gray-900 font-semibold" : "text-gray-700"}`}
            onClick={() => {
              item.children ? undefined : setOpened((o) => !o);
              handleToggleCollapse();
            }}
          >
            <div className="py-1 px-1 lg:px-3  flex items-center space-x-1  text-slate-300 group-hover:text-primary">
              {item.icon ? (
                <item.icon className="w-5 h-5 mr-1 lg:mr-5 fill-slate-400 dark:fill-slate-400" />
              ) : (
                <>
                  <ChevronRightIcon className="w-5 h-5 mr-1 lg:mr-5 fill-slate-400 dark:fill-slate-400" />
                </>
              )}

              <span className="text-title font-medium text-base">{item.label} </span>
            </div>

            {hasChildren && (
              <div className={`mr-2 ${isCollapsed ? "transform rotate-0" : "transform rotate-90"}`}>
                {isCollapsed ? (
                  <span className="text-gray-400">
                    <ArrowSmallDownIcon className="h-5 w-5 fill-primary" />
                  </span>
                ) : (
                  <span className="text-gray-400">
                    <ArrowSmallUpIcon className="h-5 w-5" />
                  </span>
                )}
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* # PRINTING COMPLETED */}

      {hasChildren && <div className={`pl-2 lg:pl-4 ${isCollapsed ? "hidden" : "block"}`}>{item.children && item.children.map((child:DashboardNavigationItem) => <SidebarItem setOpened={setOpened} key={child.id} item={child} level={level + 1} activeItemId={activeItemId} />)}</div>}
    </>
  );
};

const NavigationBar = () => {
  const activeItemId = usePathname().split("/")[1];
  const [opened, setOpened] = useState(false);
  return (
    <div className="relative">
      {dashboardNavigationItems.map((item) => (
        <SidebarItem setOpened={setOpened} key={item.id} item={item} level={0} activeItemId={activeItemId} />
      ))}
    </div>
  );
};

export default NavigationBar;

const dashboardNavigationItems: DashboardNavigationItem[] = [
  {
    id: "1",
    label: "Dashboard",
    icon: ChevronRightIcon,
    link: "/dashboard",
  },

  {
    id: "2",
    label: "User",
    icon: ChevronDoubleRightIcon,
    link: "#",
    children: [
      {
        id: "2.2",
        label: "All User",
        icon: ChevronDoubleRightIcon,
        link: "#",
        children: [
          {
            id: "2.2.0",
            label: "All Users",
            link: "/dashboard/users",
            icon: ChevronRightIcon,
          },
        ],
      },
    ],
  },
  {
    id: "4",
    label: "Products",
    link: "/dashboard/product",
    icon: ChevronRightIcon,
  },
];
