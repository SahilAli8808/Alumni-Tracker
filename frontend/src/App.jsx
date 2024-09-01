import React, { useState } from 'react';
import '@radix-ui/themes/styles.css';
import EnrollmentChart from './components/EnrollmentChart';
import EmploymentStatusChart from './components/EmploymentStatusChart';
import BulkImport from './components/BulkImport';
import { Flex, Text, Button, Badge, Theme } from '@radix-ui/themes';
import SliderBar from './components/Slidebar';
import { Outlet } from 'react-router-dom';


function App() {

 

  return (
    <div>
      <SliderBar  /> 
      <Outlet/>
    
      {/* <h2>Bulk Import Alumni Data</h2>
      <BulkImport /> */}
    </div>
  );
}

export default App;
