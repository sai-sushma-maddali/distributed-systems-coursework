import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBook } from '../features/books/booksSlice';
import { useNavigate } from 'react-router-dom';

function CreateBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '', isbn: '', publication_year: '', 
        available_copies: 1, author_id: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBook({
            ...formData,
            publication_year: parseInt(formData.publication_year),
            available_copies: parseInt(formData.available_copies),
            author_id: parseInt(formData.author_id)
        }));
        navigate('/');
    };

    return (
    <div style={styles.page}>
        <div style={styles.card}>
            <h2 style={styles.heading}>Add New Book</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input name="title" placeholder="Title" onChange={handleChange} 
                       required style={styles.input} />
                <input name="isbn" placeholder="ISBN" onChange={handleChange} 
                       required style={styles.input} />
                <input name="publication_year" placeholder="Publication Year" 
                       type="number" onChange={handleChange} style={styles.input} />
                <input name="available_copies" placeholder="Available Copies" 
                       type="number" onChange={handleChange} style={styles.input} />
                <input name="author_id" placeholder="Author ID" 
                       type="number" onChange={handleChange} required style={styles.input} />
                <button type="submit" style={styles.btn}>Create Book</button>
            </form>
        </div>
    </div>
);
}

const styles = {
    // full page background
    page: {
        minHeight: '100vh',          // covers full screen height
        backgroundColor: '#ebfac9', // your green background
        display: 'flex',            // enables centering
        justifyContent: 'center',   // centers horizontally
        alignItems: 'center',       // centers vertically
    },
    // white card that holds the form
    card: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // subtle shadow
        width: '100%',
        maxWidth: '450px',           // form won't get too wide
    },
    heading: {
        marginBottom: '20px',
        textAlign: 'center',
        color: '#2c3e50'
    },
    form: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px' 
    },
    input: { 
        padding: '10px', 
        fontSize: '16px', 
        borderRadius: '4px', 
        border: '1px solid #ccc',
        outline: 'none'
    },
    btn: { 
        padding: '12px', 
        backgroundColor: '#2e3961', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        fontSize: '16px', 
        cursor: 'pointer',
        marginTop: '8px'
    }
};

export default CreateBook;