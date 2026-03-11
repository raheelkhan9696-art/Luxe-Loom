import React from 'react';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Userintercationpage from './pages/Userintercationpage';
import Homepage from './pages/Homepage';
import AboutUs from './pages/AboutUs';
import CollectionPage from './pages/Collectionpage';
import Shoppage from './pages/Shoppage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Userintercationpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path= "/about" element={<AboutUs />}/>
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/collections" element={<CollectionPage />} />

      </Routes>
    </Router>
  );
}

export default App;
