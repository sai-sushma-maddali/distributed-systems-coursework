import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,   // tells Redux: manage "books" data
    },
});