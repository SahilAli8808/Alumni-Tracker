import React, { useState, useEffect } from 'react';
import { RxDashboard, RxCardStack, RxCardStackPlus, RxStack, RxHamburgerMenu } from "react-icons/rx";
import { LuTestTube } from "react-icons/lu";
import { CiImport } from "react-icons/ci";
import { FaStreetView } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import TopBar from './Topbar';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const isAuthorized = false;

  // Detect screen width
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = (e) => {
      if (e.matches) {
        setOpen(false);  // Close sidebar on mobile devices
      } else {
        setOpen(true);  // Open sidebar on larger screens
      }
      setTargetReached(e.matches);
    };

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setOpen(false);  // Close sidebar on mobile devices
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };

  const isMobile = useMediaQuery(768);

  const NavMenu = [
    { title: "Dashboard", path: '/', icon: <RxDashboard /> },
    { title: "Import Alumni", path: '/bulkimport', icon: <CiImport /> },
  ];
  
  const MastersMenu = [
    { title: "General Settings", path: '/profile', icon: <FaStreetView /> }
  ];
  
  const MenuList = ({ list, listTitle }) => {
    return (
      <div className='flex flex-col mb-3'>
        <div className={`flex text-xs p-2 text-slate-500 -ml-2 ${!open && 'text-white hover:cursor-default'}`}>{listTitle}</div>
        {
          list.map((item, index) => (
            <NavLink to={item.path} key={index}
              className={({ isActive }) => {
                return `flex hover:text-slate-900 hover:cursor-pointer hover:bg-sky-100 pb-2 pt-1.5 rounded ${open ? 'max-w-[180px]' : 'max-w-[32px]'} ` +
                  (isActive ? 'text-slate-900 bg-slate-300' : 'text-slate-700')
              }}
            >
              <div className='mt-1 duration-500 px-2'>
                {item.icon}
              </div>
              <div className={`text-nowrap text-sm font-medium ${!open && 'hidden'} duration-500`}>
                {item.title}
              </div>
            </NavLink>
          ))
        }
      </div>
    )
  };

  return (
    <>
      <div className={`bg-foreground-blue border h-screen pl-5 pt-20 ${open ? "w-56" : "w-[80px]"} duration-500 sticky top-0 float-left`}>
        <TopBar open={open} />
        <RxHamburgerMenu
          className={`hover:cursor-pointer w-7 h-6 rounded-full fixed mb-2 top-5 ${open ? "left-[190px]" : "left-[90px]"} duration-300`}
          onClick={() => setOpen(prevOpen => !prevOpen)}
        />
        <MenuList list={NavMenu} listTitle={'Navigation'} />
        {isAuthorized && <MenuList list={MastersMenu} listTitle={'Masters'} />}
      </div>
    </>
  );
};

export default Sidebar;
