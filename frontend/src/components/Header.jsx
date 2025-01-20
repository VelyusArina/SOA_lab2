import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import SecondPage from '../pages/SecondPage';
import '../style/Header.css';

const Header = () => {
    const location = useLocation();

    return (
        <div>
            <header>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                    Main
                </Link>
                <Link to="/second" className={location.pathname === '/second' ? 'active' : ''}>
                    Second
                </Link>
            </header>
        </div>
    );
};

const App = () => (
    <Router>
        <Header />
        <main>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/second" element={<SecondPage />} />
            </Routes>
        </main>
    </Router>
);

export default App;
