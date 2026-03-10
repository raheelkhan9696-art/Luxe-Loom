import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Userintercationpage from './pages/Userintercationpage';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userintercationpage />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
