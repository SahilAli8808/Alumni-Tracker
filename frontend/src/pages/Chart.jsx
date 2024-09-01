import React from 'react'

function Chart() {
    const breadcrumbsItems = [
        { text: 'Home', link: '/', icon: <RiHome2Line /> },
        { text: 'Dashboard' },
      ];

  return (
    <div>
       <div className='flex flex-col pt-16 p-4'>
       <Breadcrumbs items={breadcrumbsItems} />
       <EnrollmentChart onDateClick={handleDateClick} />
       {selectedDate && <EmploymentStatusChart selectedDate={selectedDate} />}
       </div>
    </div>
  )
}

export default Chart
