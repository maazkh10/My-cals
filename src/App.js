
import './App.css';
import { Calender } from './calnder';
import { MOCKAPPS } from './calnder/conts';

function App() {
  return (
    <div className="App">
     <Calender startingDate = {new Date()} eventsArr= {MOCKAPPS} />
    </div>
  );
}

export default App;
