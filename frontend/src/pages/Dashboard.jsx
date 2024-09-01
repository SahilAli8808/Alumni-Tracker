import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumb';
import { RiAlarmWarningLine, RiHome2Line, RiHourglass2Fill, RiShoppingCart2Line, RiTruckLine } from 'react-icons/ri';
import DashboardCard from '../components/DashboardCard';
import { FiSettings } from 'react-icons/fi';
import { FaUserAstronaut, FaUserCheck, FaUserDoctor, FaUserGraduate } from 'react-icons/fa6';
import EnrollmentChart from '../components/EnrollmentChart';
import EmploymentStatusChart from '../components/EmploymentStatusChart';

function Dashboard() {
     
    const breadcrumbsItems = [
        { text: 'Home', link: '/', icon: <RiHome2Line /> },
        { text: 'Dashboard' },
      ];

      const [selectedDate, setSelectedDate] = useState(null);
      const handleDateClick = (date) => {
        setSelectedDate(date); // Update the selected date
      };

      const dashData = {
        woTotal: 10,
        woGenerated: 50,
        woInTransit: 30,
        woWaitingForApproval: 20
      }

  return (
    <div>
       <>
      <div className='flex flex-col pt-16 p-4'>
        <Breadcrumbs items={breadcrumbsItems} />
        {/* <div className="flex flex-wrap">
                <AllCard/>
        </div> */}
        <div className="flex flex-wrap">
          {/* <DashboardCard loading={false} bgColor="#0073B7" icon={<FiSettings  />} value="Total Alumni" additionalField={dashData.woTotal} description="No. of Registered Alumni"  /> */}
          {/* <DashboardCard loading={false} bgColor="#00C0EF" icon={<FaUserAstronaut  />} value="Registered " additionalField={dashData.woGenerated} description="Last 30 Days" />
          <DashboardCard loading={false} bgColor="#F39C12" icon={<FaUserGraduate  />} value="Top Users" additionalField={dashData.woInTransit} description="Last 30 Days"  />
          <DashboardCard loading={false} bgColor="#00A65A" icon={<RiAlarmWarningLine  />} value="Total Etc." additionalField={dashData.woWaitingForApproval} description="Last 30 Days"  /> */}
        </div>
  
       
        <div className='p-4'>
        <EnrollmentChart onDateClick={handleDateClick} />
        {selectedDate && <EmploymentStatusChart selectedDate={selectedDate} />}

        </div>

      
      </div>
    </>
    </div>
  )
}

export default Dashboard
