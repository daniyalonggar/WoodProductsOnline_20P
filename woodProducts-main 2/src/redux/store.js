import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        user: userReducer
    },
});