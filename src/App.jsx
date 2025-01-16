import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/nav';
import Hero from './components/hero';
import Available from './components/Available';
import AboutUs from './components/Aboutus';
import Trip from './components/Trip';

function App() {
    const [isHindi, setIsHindi] = useState(false);

    const handleToggleLanguage = () => setIsHindi(!isHindi);

    return (
        <Router>
            {/* Pass isHindi and toggle function as props */}
            <Navigation isHindi={isHindi} onToggleLanguage={handleToggleLanguage} />
            <Routes>
                <Route path='/' element={<Hero isHindi={isHindi} />} />
                <Route path='/Available' element={<Available isHindi={isHindi} />} />
                <Route path='/about' element={<AboutUs isHindi={isHindi} />} />
                <Route path='/trip' element={<Trip isHindi={isHindi} />} />
            </Routes>
        </Router>
    );
}

export default App;
