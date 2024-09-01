import React, { useState } from 'react';
import '@radix-ui/themes/styles.css';
import EnrollmentChart from './components/EnrollmentChart';
import EmploymentStatusChart from './components/EmploymentStatusChart';
import BulkImport from './components/BulkImport';
import { Flex, Text, Button, Badge, Theme } from '@radix-ui/themes';
import SliderBar from './components/Slidebar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


function App() {

 

  return (
    <div>
      <Theme>
      <SliderBar  /> 
      <Outlet/>
        
      </Theme>
    
      {/* <h2>Bulk Import Alumni Data</h2>
      <BulkImport /> */}
      <Toaster/>
    </div>
  );
}

export default App;
