import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories:null,
}

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.categories = action.payload
        },
    },

})

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;