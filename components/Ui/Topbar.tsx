import React, { useState } from "react";
import Image from "next/image";
import { openSidebar } from "../../slices/themeSlice";
import { useDispatch } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Topbar() {
  const { status, data } = useSession();
  const dispatch = useDispatch();

  const user = data?.user.name;

  const handleOpen = () => {
    dispatch(openSidebar());
  };
  return (
    <div className="flex w-full h-16 items-center bg-white fixed top-0 ">
      <div className="flex flex-[1]  justify-between items-center   ">
        <h1 className="flex w-[85%] justify-center ">WORK MANAGER</h1>
        <div className="flex" onClick={handleOpen}>
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="flex flex-[5] w-screen justify-end ">
        <div className="flex h-full items-center ">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <Image
                width={100}
                height={100}
                src="http://avatars.githubusercontent.com/u/105056049?v=4"
                alt="avatar"
              />
            </div>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="flex pr-2 pl-5">
              {user}
              <ArrowDropDownIcon />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow mt-5 p-1 bg-white "
            >
              <li>
                <a href={`/users/${data.user.email}`}>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li
                onClick={() => {
                  signOut({
                    callbackUrl: "http://localhost:3000/",
                  });
                }}
                className=" border-t-[1px] border-t-slate-200"
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
