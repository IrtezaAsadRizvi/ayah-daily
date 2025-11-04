import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VerseResponse } from "@/lib/verse/VerseLoader";

export type VerseState = {
  data: VerseResponse | null;
};

const initialState: VerseState = {
  data: null,
};

const verseSlice = createSlice({
  name: "verse",
  initialState,
  reducers: {
    setVerse(state, action: PayloadAction<VerseResponse | null>) {
      state.data = action.payload;
    },
    clearVerse(state) {
      state.data = null;
    },
  },
});

export const { setVerse, clearVerse } = verseSlice.actions;
export default verseSlice.reducer;
