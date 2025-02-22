import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // If you have a HomePage component
import NoteDetail from './pages/NoteDetail';
import NotesList from './pages/NotesList';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* HomePage (could be a landing page, if needed) */}
        <Route path="/" element={<NotesList />} />
        
        {/* Route for individual note details */}
        <Route path="/notes/:id" element={<NoteDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
