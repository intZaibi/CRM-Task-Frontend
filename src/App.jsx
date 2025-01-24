import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadsPage from './pages/LeadsPage.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
