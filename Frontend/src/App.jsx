import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Userintercationpage from './pages/Userintercationpage';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userintercationpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path= "/about" element={<AboutUs />}/>

      </Routes>
    </Router>
  );
}

export default App;
