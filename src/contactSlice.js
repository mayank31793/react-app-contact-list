import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./apiConfig";

export const getContactDetails = createAsyncThunk('data/getContact', async () => {
    const response = await api.get("/contacts.json");
    return response.data
})

export const saveNewContact = createAsyncThunk('data/addContact', async (postData) => {
    const response = await api.post("/contacts.json", postData);
    return response.data
})

export const deleteContactDetails = createAsyncThunk('data/deleteContact', async (id) => {
    const response = await api.delete(`/contacts/${id}.json`);
    return response.data
})

export const updateContactDetails = createAsyncThunk('data/updateContact', async (data) => {
    let key = data.key
    delete data.key
    const response = await api.put(`/contacts/${key}.json`, data);
    return response.data
})

export const querySearchDetails = createAsyncThunk('query/queryContact', async (q) => {
    const response = await api.get(`/contacts.json?orderBy="firstName"&equalTo="${q}"`);
    return response.data
})

const contactSlice = createSlice({
    name: "contact",
    initialState: { contact: [], refresh: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveNewContact.fulfilled, (state, action) => {
                state.refresh = !state.refresh
            })
            .addCase(getContactDetails.fulfilled, (state, action) => {
                let listOfContacts = [];
                for (let key in action.payload) {
                    let data = {
                        key: key,
                        fname: action.payload[key].firstName,
                        lname: action.payload[key].lastName,
                        contact: action.payload[key].contactNumber,
                        isFavourite: action.payload[key].isFavourite
                    };
                    listOfContacts.push(data);
                }
                state.contact = listOfContacts
            })
            .addCase(deleteContactDetails.fulfilled, (state, action) => {
                state.refresh = !state.refresh
            })
            .addCase(updateContactDetails.fulfilled, (state, action) => {
                state.refresh = !state.refresh
            })
            .addCase(querySearchDetails.fulfilled, (state, action) => {
                let listOfContacts = [];
                for (let key in action.payload) {
                    let data = {
                        key: key,
                        fname: action.payload[key].firstName,
                        lname: action.payload[key].lastName,
                        contact: action.payload[key].contactNumber,
                        isFavourite: action.payload[key].isFavourite
                    };
                    listOfContacts.push(data);
                }
                state.contact = listOfContacts
            })
    }
})

export default contactSlice.reducer