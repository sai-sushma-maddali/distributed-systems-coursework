import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.brand}>Library Management System (LMS)</h2>
            <div>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/create" style={styles.link}>Add Book</Link>
            </div>
        </nav>
    );
}

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', 
           alignItems: 'center', padding: '10px 30px', 
           backgroundColor: '#2c3e50', color: 'white' },
    brand: { color: 'white', margin: 0 },
    link: { color: 'white', marginLeft: '20px', textDecoration: 'none', fontSize: '16px' }
};

export default Navbar;