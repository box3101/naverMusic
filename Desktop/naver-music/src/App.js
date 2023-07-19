import { Routes, Route, Link } from 'react-router-dom';


//common
import Sidebar from "./components/common/Sidebar";

import './scss/ui.scss';

function App() {
  return (
    <div className="App">

      <Sidebar></Sidebar>

    </div>
  );
}

export default App;