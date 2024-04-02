import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FireIcon,
  HomeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Bars3BottomRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import useScreenSize from "../utils/useScreenSize";

const NavBar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize.width < 768) {
      setIsOpen(false);
    }
  }, [screenSize]);

  console.log(screenSize);

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
    <div
      className={`shadow-md ${
        isOpen ? "w-[100%] lg:w-[15%] h-full" : "w-[100%] lg:w-[5%] lg:h-full"
      }   z-100 absolute top-0 left-0 
      transition-all duration-100 ease-in-out

      `}
    >
      <div className="bg-[#1A1E1C] h-full  py-4 px-3  items-center">
        {/* logo  */}
        <div
          className={`${
            isOpen ? "flex justify-between items-center" : " flex justify-end lg:justify-center"
          } transition-all duration-200 ease-in`}
        >
          <div
            className={`${isOpen ? "block" : "hidden"} text-[#2AB42A] flex cursor-pointer gap-1 `}
          >
            <FireIcon className="w-6 h-6" />
            <span
              className="font-bold text-lg  bg-gradient-to-b from-teal-400 to-yellow-200 
             bg-clip-text text-transparent  "
            >
              Carbon Cell
            </span>
          </div>

          <div
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-5 h-5   cursor-pointer  text-white"
          >
            {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>
        </div>

        {/* Menu icon */}

        {/* Nav links  */}

        {isOpen ? (
          <ul
            className=" md:pb-0 pb-6   
           left-0 w-full  md:pl-0 pl-9 mt-20
           bg-[#1A1E1C]  md:flex md:flex-col "
          >
            {links.map((item, index) => (
              <li className="font-semibold mx-2 my-8 lg:my-2 " key={item.name}>
                <div
                  className={`flex gap-2 items-center ${
                    pathname === item.link ? "text-[#2AB42A]" : "text-white"
                  }`}
                >
                  <div className="w-4 h-4 ">{item.icon}</div>
                  <Link
                    to={item.link}
                    onClick={() => {
                      if (screenSize.width < 768) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavBar;
