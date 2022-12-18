import React, { useContext, useEffect, useState } from "react";
import { io } from 'socket.io-client';

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState()
  const [id, setId] = useState('')

  const getId = (value) => {
    setId(value)
  }

  useEffect(() => {
    if(id!= null) {
      const newSocket = io(
        'https://guarded-river-63805.herokuapp',
        { query: {id}}
      )
      setSocket(newSocket)

      return () => newSocket.close()
    }
  }, [id])

  return (
    <SocketContext.Provider value={{socket, getId}}>
      { children }
    </SocketContext.Provider>
  )
}