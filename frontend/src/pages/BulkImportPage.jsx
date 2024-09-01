import React from 'react'
import Breadcrumbs from '../components/Breadcrumb';
import { RiAlarmWarningLine, RiHome2Line, RiHourglass2Fill, RiShoppingCart2Line, RiTruckLine } from 'react-icons/ri';
import BulkImport from '../components/BulkImport';


function BulkImportPage() {
    const breadcrumbsItems = [
        { text: 'Home', link: '/', icon: <RiHome2Line /> },
        { text: 'Bulk Import' },
      ];

  return (
    <div>
       <>
      <div className='flex flex-col pt-16 p-4'>
        <Breadcrumbs items={breadcrumbsItems}/>

  
        <div>
<BulkImport/>
        </div>
  
      
      </div>
    </>
    </div>
  )
}

export default BulkImportPage
