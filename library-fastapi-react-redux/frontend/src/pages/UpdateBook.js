import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from '../features/books/booksSlice';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const book = useSelector((state) => 
        state.books.items.find((b) => b.id === parseInt(id))
    );

    const [formData, setFormData] = useState({
        title: '', isbn: '', publication_year: '', 
        available_copies: 1, author_id: ''
    });

    useEffect(() => {
        if (book) setFormData(book);
    }, [book]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBook({ id: parseInt(id), bookData: formData }));
        navigate('/');
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Update Book</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input name="title" value={formData.title} onChange={handleChange} 
                           required style={styles.input} placeholder="Title" />
                    <input name="isbn" value={formData.isbn} onChange={handleChange} 
                           required style={styles.input} placeholder="ISBN" />
                    <input name="publication_year" value={formData.publication_year} 
                           type="number" onChange={handleChange} 
                           style={styles.input} placeholder="Publication Year" />
                    <input name="available_copies" value={formData.available_copies} 
                           type="number" onChange={handleChange} 
                           style={styles.input} placeholder="Available Copies" />
                    <input name="author_id" value={formData.author_id} 
                           type="number" onChange={handleChange} 
                           required style={styles.input} placeholder="Author ID" />
                    <button type="submit" style={styles.btn}>Update Book</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#ebfac9',  // same green as CreateBook
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
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

export default UpdateBook;