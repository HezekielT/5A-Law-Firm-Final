import React from 'react';

const ScheduleItem = ({id, title, time, detail, schedule, privilege, deleteScheduleItem }) => {
  // const { }
  // const deleteSchedule = (id) => {
    
  // }
  return (
    <div className='w-auto border-l-4 border-b-4 border-r-0 border-t-0 border-l-brightSlateLight border-b-brightSlate pl-4 py-2 mb-1'>
      <hr />
      <span className='flex justify-between pl-1'>
        {/* <span className="flex-start"> */}

        <h1 className='text-lg  pr-10'>Title - {title}</h1>
        {/* </span> */}
        {/* <span> */}
        {(privilege) ? (

        <svg onClick={() => deleteScheduleItem(id, schedule)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer flex-end">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        ) : (<></>)}
        {/* </span> */}
      </span>
          <hr />
      <h3>Detail - {detail}</h3>
      <h4>Time - {time}</h4>
    </div>
  );
};

export default ScheduleItem;