import React from 'react'

function Chart() {

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
