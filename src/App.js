
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,Route
} from "react-router-dom";
import './App.css';
import Home from './Pages/Home';

function App() {
  return <div className="App">
   <Router>
     {/* <Link to="/">Home | </Link> */}
    
     <Routes>
       <Route path="/" exact element={ <Home /> } />    
     </Routes>
   </Router>
  
  </div>
 
}

export default App;
