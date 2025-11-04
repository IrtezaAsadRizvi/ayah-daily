import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import verseReducer from './verseSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    verse: verseReducer,
  },
});

// ✅ Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
