import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FireIcon,
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [isOpen, setIsOpen] = useState(false);

  console.log(pathname);

  const links = [
    {
      name: "Home",
      link: "/",
      icon: (function () {
        return <HomeIcon />;
      })(),
    },
    {
      name: "Graph",
      link: "/graph",
      icon: (function () {
        return <ChartBarIcon />;
      })(),
    },

    {
      name: "Crypo currencies",
      link: "/crypto",
      icon: (function () {
        return <CurrencyDollarIcon />;
      })(),
    },
  ];
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="bg-[#1A1E1C] md:px-10 py-4 px-7 md:flex justify-between items-center">
        {/* logo  */}
        <div className="text-[#2AB42A] flex text-2xl cursor-pointer gap-1">
          <FireIcon className="w-7 h-7" />
          <span className="font-bold  bg-gradient-to-b from-teal-400 to-yellow-200  bg-clip-text text-transparent  ">
            Carbon Cell
          </span>
        </div>

        {/* Menu icon */}
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden text-white"
        >
          {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* Nav links  */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-6 absolute md:static 
          md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 
          transition-all duration-200 ease-in bg-[#1A1E1C] ${isOpen ? "top-12" : "top-[-490px]"}`}
        >
          {links.map((item, index) => (
            <li className="font-semibold my-7 md:my-0 md:ml-8" key={item.name}>
              <div
                className={`flex gap-2 items-center ${
                  pathname === item.link ? "text-[#2AB42A]" : "text-white"
                }`}
              >
                <div className="w-4 h-4 ">{item.icon}</div>
                <Link
                  to={item.link}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
