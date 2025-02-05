import { configureStore } from "@reduxjs/toolkit";
import contactSlice from './contactSlice';

const store = configureStore({
    reducer: {
        name: contactSlice
    }
})

export default store;