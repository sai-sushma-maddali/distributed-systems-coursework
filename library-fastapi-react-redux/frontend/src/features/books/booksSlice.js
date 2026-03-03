import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axiosConfig';

// ─── ASYNC THUNKS (these call your FastAPI) ───────────────────────

// Fetch all books → GET /books
export const fetchBooks = createAsyncThunk('books/fetchAll', async () => {
    const response = await API.get('/books/');
    return response.data;
});

// Create a book → POST /books
export const createBook = createAsyncThunk('books/create', async (bookData) => {
    const response = await API.post('/books/', bookData);
    return response.data;
});

// Update a book → PUT /books/{id}
export const updateBook = createAsyncThunk('books/update', async ({ id, bookData }) => {
    const response = await API.put(`/books/${id}`, bookData);
    return response.data;
});

// Delete a book → DELETE /books/{id}
export const deleteBook = createAsyncThunk('books/delete', async (id) => {
    await API.delete(`/books/${id}`);
    return id;  // return id so we can remove it from state
});

// ─── SLICE ────────────────────────────────────────────────────────

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],       // list of books
        loading: false,  // true when API call is in progress
        error: null,     // holds error message if something fails
    },
    reducers: {},  // no regular reducers needed, only async ones

    // extraReducers handles the 3 states of every async thunk:
    // pending (loading) → fulfilled (success) → rejected (error)
    extraReducers: (builder) => {
        builder
            // fetchBooks
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;  // store books in state
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // createBook
            .addCase(createBook.fulfilled, (state, action) => {
                state.items.push(action.payload);  // add new book to list
            })

            // updateBook
            .addCase(updateBook.fulfilled, (state, action) => {
                // find the book and replace it with updated version
                const index = state.items.findIndex(b => b.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })

            // deleteBook
            .addCase(deleteBook.fulfilled, (state, action) => {
                // remove deleted book from list
                state.items = state.items.filter(b => b.id !== action.payload);
            });
    },
});

export default booksSlice.reducer;