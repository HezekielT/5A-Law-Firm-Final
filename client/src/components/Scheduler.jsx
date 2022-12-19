import React,{ useEffect } from 'react';
import { useState } from 'react';
import { useSchedule } from '../contexts/ScheduleProvider';
import { v4 as uuidV4 } from 'uuid'
import { useSocket } from '../contexts/SocketProvider';
import ScheduleItem from './ScheduleItem';


const Scheduler = ({year, month, day}) => {
  const [addSchedule, setAddSchedule] = useState(false)
  const { schedules, actualDate, createSchedule, deleteSchedule } = useSchedule();
  const { socket, getId } = useSocket();
  // console.log("result of checkSchedule",checkSchedule(year, month, day))
  useEffect(() => {
    if(socket != null) {
      socket.on('get-create-schedule', (id, year, month, day, title, time, detail, schedule, privilege) => {
        createSchedule(id, year, month, day, title, time, detail, schedule, privilege)
      })
      socket.on('get-delete-schedule', (id) => {
        deleteSchedule(id);
      })
      return () => {
        socket.off('get-create-schedule'); 
        socket.off('get-delete-schedule');
      }
    }
  }, [socket])
  
  const deleteScheduleItem = (id, schedule) => {
    deleteSchedule(id);
    console.log("hello ", schedule)
    if(schedule !== 'onlyMe') {
      socket.emit("delete-schedule", id);
    }
  }

  // const ButtonText = () => {
  //   return (year >= actualDate.year && month >= actualDate.month && day >= actualDate.day) ? (
  //     true
  //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  //       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  //     </svg>
  //   ) : (<>Can't add a new schedule</>)
  // }
  const FormFields = () => {
    const [scheduleData, setScheduleData] = useState({
      title: '',
      time: '',
      detail: '',
      schedule:'onlyMe'
    });
  
    const updateForm = (value) => {
      return setScheduleData((prev) => {
        return { ...prev, value}
      });
    }
    const saveScheduleData = () => {
      const id = uuidV4();
      // if(year >= actualDate.year && month >= actualDate.month && day >= actualDate.day)
      createSchedule(id, year, month, day, scheduleData.title, scheduleData.detail, scheduleData.time, scheduleData.schedule, true);
      if(scheduleData.schedule !== 'onlyMe') {
        // create your socket connection
        getId(id);
        socket.emit("create-schedule", id, year, month, day, scheduleData.title, scheduleData.detail, scheduleData.time, scheduleData.schedule, false);
      }
      setAddSchedule(!addSchedule);
    }

  
    return (
      <>
        <div className="flex space-x-3 my-2">
          <label htmlFor="">Title: </label>
          <input 
            type="text" 
            className="flex px-1 border border-brightSlateLight rounded-full focus:outline-none"
            placeholder="Title"
            onChange={(e) => updateForm(scheduleData.title = e.target.value)}
          />
        </div>
        <div className="flex space-x-3 my-2">
          <label htmlFor="">Time: </label>
          <input 
            type="time" 
            className="flex-1 border border-brightSlateLight rounded-full focus:outline-none"
            placeholder="Title"
            onChange={(e) => updateForm(scheduleData.time = e.target.value)}
          />
        </div>
        <div className="flex space-x-3 my-2">
          <label htmlFor="">Detail: </label>
          <textarea 
            className="flex px-2 border border-brightSlateLight rounded-full focus:outline-none"
            placeholder="Detail"
            onChange={(e) => updateForm(scheduleData.detail = e.target.value)}
          ></textarea>
        </div>
        <div className="flex space-x-3 my-2">
          <label htmlFor="">Schedule: </label>
          <select onChange={(e) => updateForm(scheduleData.schedule = e.target.value)} className='mx-full'>
            <option value="onlyMe">Only For Me</option>
            <option value="everyOne">For EveryOne</option>
          </select>
        </div>
        <div className="flex space-x-3 my-2">
          <button type='submit' onClick={() => {saveScheduleData()}} className='px-6 py-2 text-white rounded-full bg-brightSlate 
            mx-auto focus:ouline-none'>Create</button>
        </div>
      </>
    )
  }

  // const [schedules, setSchedules] = useState(undefined)
  return (
    <div className='flex flex-col mx-auto my-auto'>
      <div className="mx-auto py-2">{month} - {day} ፣ {year}</div>
      {(schedules) ? (
        <div className='flex flex-col mb-2 my-auto'>
        {schedules.map(schedule => 
          (schedule.year == year && schedule.month == month && schedule.day == day) ? (
            <ScheduleItem id={schedule.id} title={schedule.title} time={schedule.time} detail={schedule.detail} schedule={schedule.schedule} privilege={schedule.privilege} deleteScheduleItem={deleteScheduleItem}/>
          ): (<></>)
        )}</div>
      ) : (
        <></>
      )}
      {/* <DecideComponent /> */}
      {(addSchedule) ? (
        <FormFields />
      ) : (<></>)}
      <button onClick={() => { setAddSchedule(!addSchedule)}} className='px-6 py-2 text-white rounded-full bg-brightSlate 
          mx-auto focus:ouline-none'>{addSchedule ? 'Discard' : (
            // <ButtonText />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}</button>
    </div>
  );
};

export default Scheduler;