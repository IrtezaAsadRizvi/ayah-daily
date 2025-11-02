import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './uiSlice'
import verseReducer from './verseSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        verse: verseReducer,
    },
})