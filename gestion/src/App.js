import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';


import Navbar from './Navbar';
import Login from './Login';
import AddProduits from './Addproduits';
import Update from './update';
import Homefruits from './Homefruits';
import Updatefruits from './updatefruits';
import AddFruits from './Addfruits';
import Frigo from './Frigo';
import AddPr from './AddFrigo';
import UpdateFrigo from './updateFrigo';
import Historique from './historique';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  }

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Home/></>} />
            <Route path="/addProduits" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><AddProduits/></>} />
            <Route path="/Update/:id" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Update/></>} />
            <Route path="/homefruits" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Homefruits/></>} />
            <Route path="/addfruits" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><AddFruits/></>} />
            <Route path="/Updatefruits/:id" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Updatefruits/></>} />
            <Route path="/frigo" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Frigo/></>} />
            <Route path="/addFrigo" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><AddPr/></>} />
            <Route path="/Update2/:id" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><UpdateFrigo/></>} />
            <Route path="/addPr" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><AddPr/></>} />
            <Route path="/historique" element={<><Navbar  isAuthenticated={isAuthenticated} onLogout={handleLogout}/><Historique/></>} />



          </>
        ) : null}
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;