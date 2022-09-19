import React from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ActiveLink from "../Utility/ActiveLink";
import GroupsIcon from "@mui/icons-material/Groups";
import BoyIcon from "@mui/icons-material/Boy";

function Sidebar() {
  const linkStyle =
    "flex w-[80%] py-4 pl-4 rounded-xl cursor-pointer  hover:text-fontAccent hover:bg-blue-100";

  return (
    <div className="fixed left-0 top-16 h-full min-w-[250px] bg-white font-poppins font-normal text-[14px]">
      <ul className="flex flex-col gap-5 mt-11 justify-center items-center  ">
        <li className={linkStyle}>
          <Link href="/">
            <div className="flex justify-center items-center gap-3">
              <DashboardIcon className="" />
              <span>Analytics</span>
            </div>
          </Link>
        </li>

        <li className={linkStyle}>
          <Link href="/workorders">
            <div className="flex justify-center items-center gap-3">
              <ListAltIcon />
              <span>Work Orders</span>
            </div>
          </Link>
        </li>
        <li className={linkStyle}>
          <Link href="/customers">
            <div className="flex justify-center items-center gap-3">
              <GroupsIcon />
              <span>Customers</span>
            </div>
          </Link>
        </li>
        <li className={linkStyle}>
          <Link href="/users">
            <div className="flex justify-center items-center gap-3">
              <BoyIcon />
              <span>Users</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
