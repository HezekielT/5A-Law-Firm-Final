import React,{ useContext, useEffect, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { EtDatetime } from 'abushakir'

const ScheduleContext = React.createContext();

export function useSchedule() {
  return useContext(ScheduleContext)
}

export function ScheduleProvider({ children }) {
  const [schedules, setSchedules] = useLocalStorage('Schedules', []);
  const actualDate = new EtDatetime().date;
  // socket ly receive yetederege sche. kehone privilege false yihoneal
  // so that i won't be able to delete created by another person
  // next time authentication sinorew author yemil argument inichemir ena 
  // who created the appointment yemilew mawek enichilalen....
  function createSchedule(id, year, month, day, title, detail, time, schedule, privilege) {
    setSchedules( prevSchedule => {
      if (prevSchedule != null) {
        return [...prevSchedule, {id, year, month, day, title, detail, time, schedule, privilege}]
      } else {
        return [{ id, year, month, day, title, detail, time, schedule, privilege }]
      }
    })
  }

  // useMemo(() => function deleteSchedule(id) (
  //   const items = schedules.filter(item => item.id !== id)
    

  //     setSchedules(prevSchedule => {
  //       if(prevSchedule !== null) {
  //         if(prevSchedule.length === 1){
  //           return localStorage.clear('All-Schedules')
  //         }
  //         return [...items];
  //       } else {
  //         return []
  //       }
  //     })
  // )
  // ), [id]
  function deleteSchedule(id) {
    const items = schedules.filter(item => item.id !== id)
    setSchedules( prevSchedule => {
      if(prevSchedule != null) {
        return [...schedules.filter(item => item.id !== id)];
      } else {
        return []
      }
    })
  }

  // checks if there is any schedule on any particular 
  function checkSchedule(year, month, day) {
    // console.log("lll", year, month, day)
    let filterBy = { year: [year], month: [month], day: [day]}
    const result = schedules.filter(function (o) {
      return Object.keys(filterBy).every(function (k) {
        return filterBy[k].some(function (f) {
          return o[k] === f;
        });
      });
    });
    return (result.length === 0) ?  (false) : (true)
  }

  return (
    <ScheduleContext.Provider value={{ schedules, actualDate, createSchedule, deleteSchedule, checkSchedule }}>
      { children }
    </ScheduleContext.Provider>
  );
}