import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./apiConfig";

export const getContactDetails = createAsyncThunk('data/getContact', async () => {
    const response = await api.get('/contacts.json?orderBy="$key"&limitToFirst=15');
    return response.data
})

export const getNextSetOfContactDetails = createAsyncThunk('data/getNextSetContact', async (lastKey) => {
    const response = await api.get(`/contacts.json?orderBy="$key"&limitToFirst=15&startAt="${lastKey}"`);
    console.log('it is get next ', response)
    return response.data
})

export const getPreviousSetOfContactDetails = createAsyncThunk('data/getPrevSetContact', async (firstKey) => {
    const response = await api.get(`/contacts.json?orderBy="$key"&endAt="${firstKey}"&limitToLast=15`);
    console.log('it is get prev ', response)
    return response.data
})

export const saveNewContact = createAsyncThunk('data/addContact', async (postData) => {
    const response = await api.post("/contacts.json", postData);
    return response.data
})

export const getTotalRecordsCount = createAsyncThunk('total/gettotalCount', async () => {
    const response = await api.get("/recordsCount.json");
    console.log('resp count get', response)
    return response.data
})

export const updateTotalRecordsCount = createAsyncThunk('total/updatetotalCount', async (postData) => {
    let key = "totalCount"
    const response = await api.put(`/recordsCount/${key}.json`, postData);
    console.log('resp count update', response)
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
    initialState: { contact: [], refresh: false, totalRecordsCount: 0 },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTotalRecordsCount.fulfilled, (state, action) => {
                state.totalRecordsCount = action.payload.totalCount
                // state.totalRecordsCount = 
            })
            .addCase(updateTotalRecordsCount.fulfilled, (state, action) => {
                console.log(action)
                // state.totalRecordsCount = 
            })
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
            .addCase(getNextSetOfContactDetails.fulfilled, (state, action) => {
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
                listOfContacts.shift()
                state.contact = listOfContacts
            })
            .addCase(getPreviousSetOfContactDetails.fulfilled, (state, action) => {
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
                listOfContacts.pop()
                state.contact = listOfContacts
            })
    }
})

export default contactSlice.reducer