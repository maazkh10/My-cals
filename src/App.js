
import './App.css';
import { Calender } from './calnder';
import { MOCKAPPS } from './calnder/conts';

function App() {
  return (
    <div className="App">
     <Calender startingDate = {new Date()} eventsArr= "" />
    </div>
  );
}

export default App;
