import {configureStore} from '@reduxjs/toolkit';
import blogReducers from '../features/blogSlice';

export const store = configureStore({
    reducer: {
        blog: blogReducers,
    },
});
