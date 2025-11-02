import { createSlice } from '@reduxjs/toolkit';

export const verseSlice = createSlice({
    name: 'verse',
    initialState: {
        verse: false,
    },
    reducers: {
        setVerse: (state, action) => {
            state.verse = action.payload;
        },
    }
});

export const { setVerse } = verseSlice.actions;

export default verseSlice.reducer;
