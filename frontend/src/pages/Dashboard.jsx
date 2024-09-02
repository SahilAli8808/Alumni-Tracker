import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumb';
import { RiAlarmWarningLine, RiHome2Line, RiHourglass2Fill, RiShoppingCart2Line, RiTruckLine } from 'react-icons/ri';
import DashboardCard from '../components/DashboardCard';
import { FiSettings } from 'react-icons/fi';
import { FaUserAstronaut, FaUserCheck, FaUserDoctor, FaUserGraduate } from 'react-icons/fa6';
import EnrollmentChart from '../components/EnrollmentChart';
import EmploymentStatusChart from '../components/EmploymentStatusChart';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {

  const [totalAlumnino, settotalAlumnino] = useState(0);
  const [employedAlumni, setemployedAlumni] = useState(0);
  const [unemployedAlumni, setunemployedAlumni] = useState(0);
  const [totalIndustries, settotalIndustries] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/alumni')
      .then(response => {
        const data = response.data;
        const totalAlumni = response.data.length;
        console.log("toatal alumni is :", totalAlumni)
     // Total number of employed alumni
const employedAlumniCount = data.filter((item)=>{
  return item.employment_status === 'Employed'
}).length

const unemployedAlumniCount = data.filter((item)=>{
  return item.employment_status === 'UnEmployed'
}).length

const uniqueIndustries = new Set(data.map(item => item.industry));
settotalIndustries(uniqueIndustries.size)
setemployedAlumni(employedAlumniCount);
setunemployedAlumni(unemployedAlumniCount);


        settotalAlumnino(totalAlumni)
      })
      .catch(err => {
        toast.error('Failed to fetch data!');
        console.log(err);
      });
  }, []);
     
    const breadcrumbsItems = [
        { text: 'Home', link: '/', icon: <RiHome2Line /> },
        { text: 'Dashboard' },
      ];

      const [selectedDate, setSelectedDate] = useState(null);
      const handleDateClick = (date) => {
        setSelectedDate(date); // Update the selected date
      };


      const dashData = {
        totalAlumnino: totalAlumnino,
        employedAlumni: employedAlumni,
        unemployedAlumni: unemployedAlumni,
        totalIndustries: totalIndustries
      }

  return (
    <div>
       <>
      <div className='flex flex-col pt-16 p-4'>
        <Breadcrumbs items={breadcrumbsItems} />
  
        <div className="flex flex-wrap">
          <DashboardCard loading={false} bgColor="#0073B7" icon={<FiSettings  />} value="Total Alumni" additionalField={dashData.totalAlumnino} description="No. of Registered Alumni"  />
          <DashboardCard loading={false} bgColor="#00C0EF" icon={<FaUserAstronaut  />} value="Total Employed " additionalField={dashData.employedAlumni} description="No. of Employed Alumni" />
          <DashboardCard loading={false} bgColor="#F39C12" icon={<FaUserGraduate  />} value="Total Unemployed" additionalField={dashData.unemployedAlumni} description="No. of Unemployed "  />
          <DashboardCard loading={false} bgColor="#00A65A" icon={<RiAlarmWarningLine  />} value="Total Industries" additionalField={dashData.totalIndustries} description="No. of Total Industry"  />
        </div>
  
       
<div className="flex flex-wrap min-h-screen">
      <div className="w-full md:w-1/2 p-4">
        <EnrollmentChart onDateClick={handleDateClick} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <EmploymentStatusChart selectedDate={selectedDate} />
      </div>
    </div>
      {/* <h1>hello</h1> */}
      </div>
    </>
    </div>
  )
}

export default Dashboard
