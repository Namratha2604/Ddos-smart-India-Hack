import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import VerificationPage from './components/VerificationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* routes -> different comp */}
        <Route path="/" element={<LoginForm />} /> {/* rout login */}
        <Route path="/verification" element={<VerificationPage />} /> {/* route for ver */}
      </Routes>
    </Router>
  );
};

export default App;
