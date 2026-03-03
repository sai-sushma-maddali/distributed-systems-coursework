import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../features/books/booksSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();    // call Redux actions
    const navigate = useNavigate();    // to go to other pages
    
    // read books from Redux store
    const { items: books, loading, error } = useSelector((state) => state.books);

    // when page loads, fetch all books from API
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Delete this book?')) {
            dispatch(deleteBook(id));
        }
    };

    if (loading) return <h3 style={{textAlign:'center'}}>Loading books...</h3>;
    if (error) return <h3 style={{textAlign:'center', color:'red'}}>Error: {error}</h3>;

    return (
        <div style={styles.container}>
            <h2>Books Index</h2>
            {books.length === 0 ? (
                <p>No books found. Add one!</p>
            ) : (
                books.map((book) => (
                    <div key={book.id} style={styles.card}>
                        <div>
                            <h3>{book.title}</h3>
                            <p>ISBN: {book.isbn}</p>
                            <p>Year: {book.publication_year}</p>
                            <p>Copies: {book.available_copies}</p>
                            <p>Author ID: {book.author_id}</p>
                        </div>
                        <div>
                            <button onClick={() => navigate(`/update/${book.id}`)} 
                                    style={styles.editBtn}>Edit</button>
                            <button onClick={() => handleDelete(book.id)} 
                                    style={styles.deleteBtn}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

const styles = {
    container: { padding: '20px 40px', backgroundColor: 'rgb(235, 250, 201)' },
    card: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: '1px solid #ddd', borderRadius: '8px', padding: '15px', 
            marginBottom: '10px', backgroundColor: 'rgb(235, 250, 201)' },
    editBtn: { marginRight: '10px', padding: '6px 14px', backgroundColor: '#3498db',
               color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteBtn: { padding: '6px 14px', backgroundColor: '#e74c3c',
                 color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Home;