import React from 'react';
import { PiStudentDuotone } from "react-icons/pi";

const TopBar = ({ open }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bg-foreground-blue pt-1 pb-2 shadow'>
      <div className='flex'>
        <div className='my-auto ml-2'>
          <PiStudentDuotone className="ml-2 mb-1 mr-2 inline-block" size={20} />
          <div className={`relative inline-block ${open ? "mt-3 left-[0px]" : "-left-[190px]"} duration-300`}>
            <div className='text-md font-medium duration-150'>Alumni Tracker</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
