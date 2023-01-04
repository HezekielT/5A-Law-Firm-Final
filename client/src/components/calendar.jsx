import React, { useMemo, useState, useEffect } from 'react';
import { EtDatetime, ETC, BahireHasab, ConvertToEthiopic } from 'abushakir'
import Scheduler from './Scheduler';
import { useSchedule } from '../contexts/ScheduleProvider';
import { EthDateTime } from 'ethiopian-calendar-date-converter'
const Calendar = () => {
  const { checkSchedule, actualDate } = useSchedule();
  const [edt, setEdt] = useState(new EtDatetime());
  const [etc, setEtc] = useState(new ETC(edt.date.year, edt.date.month, edt.date.day));
  // const actualDate = new EtDatetime().date;
  const [currentScheduleDate, setCurrentScheduleDate] = useState(actualDate.day);
  const [showScheduler, setShowScheduler] = useState(false)

  // useEffect(() => {

    checkSchedule(actualDate.year, etc.allMonths[actualDate.month-1], actualDate.day)
  // },[])
  const updateEtc = (value) => {
    setEtc(value);
  }

  // value determines if we are on desktop or mobile false=desktop, true= mobile
  // valueTwo is the day we plan to add schedule to which will be passed to the scheduler component.
  const updateView = (value, valueTwo) => {
    setShowScheduler(value);
    setCurrentScheduleDate(valueTwo);
  }
  useMemo(
    () => setEdt(new EtDatetime(etc._date.year, etc._date.month, etc._date.day)), [etc]
  )

  const lastMonthDays = etc.prevMonth.monthDays().length - etc.monthDays()[0][3];
  const nextMonthDays = etc.nextMonth.monthDays()[0][3];
  
  return (
    <div className='flex container mx-auto'>
      {/* Desktop Header Section */}
      <div className="flex flex-col w-full text-lg md:mx-auto mt-3 md:mt-10 p-3 md:w-3/5 md:p-7">
        {/* This is where we render our Calendar! */} 
        {/* <hr className="border border-brightSlate"/> */}
        {/* Desktop Header Section */}
        <div className="hidden md:grid grid-cols-7 gap-4 bg-brightSlate text-white mb-2 py-2">
          <div className="col-span-3 pl-4">{etc.allMonths[edt.month -1]} ፣ {edt.year}</div>
          <div className="flex col-span-4 justify-end">
            <span className="px-4 cursor-pointer" onClick={() => { updateEtc(etc.prevYear) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            </span>
            <span className="px-4 cursor-pointer" onClick={() => { updateEtc(etc.prevMonth) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </span>
            <span className="px-4 cursor-pointer" onClick={() => { updateEtc(etc.nextMonth) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
            <span className="px-4 cursor-pointer" onClick={() => { updateEtc(etc.nextYear) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </div>
        </div>
        {/* Week day names -- segno, maksegno ... */}
        {/* Desktop Version */}
        <div className="hidden md:grid grid-cols-7 gap-4">
          {etc.weekdays.map(weekday => (
            <div className="">{weekday}</div>
          ))}
        </div>
        {/* Dates -- 1, 2 ... */}
        {/* Desktop Version */}
        <div className="hidden md:grid grid-cols-7 grid-flow-row gap-0">
          {[...Array(etc.monthDays()[0][3])].map((e, i) => (
            <div className="flex flex-col border border-brightSlateLight pb-2">
              {/* <span> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brightSlateLight">
                <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
              </svg> */}


              {/* </span> */}
              <div className="mx-auto pt-4">

              <span className='text-center text-brightSlateLight'>
                {lastMonthDays + i + 1}
              </span>
              </div>
              <sub className='text-right max-h-fit text-brightSlateLight'>{new EthDateTime(etc.prevMonth.year, etc.prevMonth.month, (lastMonthDays + i + 1)).toEuropeanDate().getDate()}</sub>
            </div>
          ))}
          {etc.monthDays(false, true).map(dates => (
            actualDate.day == dates[2] && actualDate.month == dates[1] && actualDate.year == dates[0] ? 
            <>
              <div onClick={() => {updateView(false, dates[2])}} className="flex flex-col bg-brightSlate text-white border border-brightSlate pb-4">
                {(checkSchedule(dates[0], etc.allMonths[dates[1]-1], dates[2]) === true) ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                    </svg>
                    <div className="mx-auto">
                      <span className='py-2 text-center'>
                      {dates[2]}
                      </span>
                    </div>
                    <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
                  </>
                  ) : (
                  <>
                    <div className="mx-auto pt-4">
                      <span className='py-2 text-center'>
                        {dates[2]}
                      </span>
                    </div>
                    <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
                  </>
                  )
                }
              </div>
            </> : 
            <div onClick={() => {updateView(false, dates[2])}} className="flex flex-col border border-brightSlate pb-4">
              {(checkSchedule(dates[0], etc.allMonths[dates[1]-1], dates[2]) === true) ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                  </svg>
                  <div className="mx-auto">

                    <span className='py-2 text-center'>
                    {dates[2]}
                    </span>
                  </div>
                  <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
                </>
              ) : (
                <>
                  <div className="mx-auto pt-4">
                    <span className='py-2 text-center'>
                    {dates[2]}
                    </span>
                  </div>
                  <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
                </>
              )
              }
            </div>
          ))}
          {nextMonthDays>0 ? [...Array(7 - nextMonthDays)].map((e, i) => 
            (
            // const keyVal = (i+1).toString + 
            
            <div className="flex flex-col border border-brightSlateLight pb-4">
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brightSlateLight">
              <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
              </svg> */}
              <div className="mx-auto pt-4">

                <span className='py-2 text-center text-brightSlateLight'>
                {i+1}
                </span>
              </div>
              <sub className='text-right max-h-fit text-brightSlateLight'>{new EthDateTime(etc.nextMonth.year, etc.nextMonth.month, i+1).toEuropeanDate().getDate()}</sub>
            </div>
          )): <></>}
        </div>
        {(showScheduler ? (
          <>
            <div className="grid md:hidden grid-cols-7 gap-2 bg-brightSlate text-white mb-2">
              <div className="flex mx-auto" onClick={() => {setShowScheduler(false)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </div>
              <div className="col-span-5 mx-auto">
                Schedules
              </div>
            </div>
            <Scheduler year={edt.year} month={etc.allMonths[edt.month -1]} day={currentScheduleDate}/>
          </>
        ) : (
          // mobile Calendar component
          <>
        {/* Mobile Header Section */}
        <div className="grid md:hidden grid-cols-7 gap-2 bg-brightSlate text-white mb-2">
          <div className="flex mx-auto">
            <span className="cursor-pointer" onClick={() => { updateEtc(etc.prevYear) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            </span>
          </div>
          <div className="flex mx-auto">
            <span className="cursor-pointer" onClick={() => { updateEtc(etc.prevMonth) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </span>
          </div>
          <div className="col-span-3 mx-auto">{etc.allMonths[edt.month -1]} ፣ {edt.year}</div>
          <div className="flex mx-auto">
            <span className="cursor-pointer" onClick={() => { updateEtc(etc.nextMonth) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </div>
          <div className="flex mx-auto">
            <span className="cursor-pointer" onClick={() => { updateEtc(etc.nextYear) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
            </span>
          </div>
          {/* <div className="flex col-span-4 justify-end">
          </div> */}
        </div>
        {/* <hr className="border border-brightSlate"/> */}

        {/* Week day names -- segno, maksegno ... */}
        {/* Mobile Version */}
        <div className="grid md:hidden grid-cols-7 gap-4 justify-center pl-4">
          {etc.weekdays.map(weekday => (
            <div className="">{weekday.slice(0,1)}</div>
          ))}
        </div>
        {/* <hr className="border border-brightSlate"/> */}
        {/* Dates -- 1, 2 ... */}
        
        {/* Mobile Version */}
        <div className="grid md:hidden grid-cols-7 grid-flow-row gap-0">
          {[...Array(etc.monthDays()[0][3])].map((e, i) => (
            <div className="flex flex-col border border-brightSlateLight pb-4">
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brightSlateLight">
                <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
              </svg> */}
            <div className="mx-auto pt-4">

              <span className='py-2 text-center text-brightSlateLight'>
              {lastMonthDays + i + 1}
              </span>
              </div>
              <sub className='text-right max-h-fit text-brightSlateLight'>{new EthDateTime(etc.prevMonth.year, etc.prevMonth.month, (lastMonthDays + i + 1)).toEuropeanDate().getDate()}</sub>
            </div>
          ))}
          {etc.monthDays(false, true).map(dates => (
            // compare the date with the actual today's date
            actualDate.day == dates[2] && actualDate.month == dates[1] && actualDate.year == dates[0] ? 
            <>
              <div onClick={() => {updateView(true, dates[2])}} className="flex flex-col bg-brightSlate text-white border border-brightSlate pb-4">
                {(checkSchedule(dates[0], etc.allMonths[dates[1]-1], dates[2]) === true) ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                  </svg>
                  <div className="mx-auto">
                    <span className='py-2 text-center'>
                    {dates[2]}
                    </span>
                  </div>
                  <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
                </>
                ) : (
                <>
                  <div className="mx-auto pt-4">
                    <span className='py-2 text-center'>
                    {dates[2]}
                    </span>
                  </div>
                  <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
                </>
                )
                }
              </div>
            </> : 
            <div onClick={() => {updateView(true, dates[2])}} className="flex flex-col border border-brightSlate pb-4">
              {(checkSchedule(dates[0], etc.allMonths[dates[1]-1], dates[2]) === true) ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
                </svg>
                <div className="mx-auto">

                  <span className='py-2 text-center'>
                  {dates[2]}
                  </span>
                </div>
                <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
              </>
              ) : (
              <>
                <div className="mx-auto pt-4">
                  <span className='py-2 text-center'>
                  {dates[2]}
                  </span>
                </div>
                <sub className='text-right max-h-fit'>{new EthDateTime(dates[0], dates[1], dates[2]).toEuropeanDate().getDate()}</sub>
              </>
              )}
            </div>
          ))}
          {nextMonthDays>0 ? [...Array(7 - nextMonthDays)].map((e, i) => (
            <div className="flex flex-col border border-brightSlateLight pb-4">
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-brightSlateLight">
            <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clipRule="evenodd" />
          </svg> */}
          <div className="mx-auto pt-4 text-brightSlateLight">

            <span className='py-2 text-center'>
            {i+1}
            </span>
            </div>
            <sub className='text-right max-h-fit text-brightSlateLight'>{new EthDateTime(etc.nextMonth.year, etc.nextMonth.month, i+1).toEuropeanDate().getDate()}</sub>
          </div>
          )): <></>}
        </div>
        </>
        ))}

      </div>
      <div className="hidden md:flex flex-row text-lg mx-5 mt-10 p-3 md:w-2/4 md:py-7 overflow-auto">
        {/* {setShowScheduler(false)} */}
        <Scheduler year={edt.year} month={etc.allMonths[edt.month -1]} day={currentScheduleDate}/>
      </div>
    </div>
  );
};

export default Calendar;