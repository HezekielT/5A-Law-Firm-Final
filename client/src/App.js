import './App.css'
import Navbar from '../../client/src/components/Navbar';
import Calendar from '../../client/src/components/calendar';
import { SocketProvider } from '../../client/src/contexts/SocketProvider';
import { ScheduleProvider } from '../../client/src/contexts/ScheduleProvider';

function App () {
  // logic goes here...
  
  return (
    // JSX goes here...
    <SocketProvider>
      <ScheduleProvider>
        <Navbar />
        <Calendar />
        {/* <AbushakirTrial /> */}
      </ScheduleProvider>
    </SocketProvider>
  )
}

export default App;