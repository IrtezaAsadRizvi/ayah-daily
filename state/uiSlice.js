import { createSlice } from '@reduxjs/toolkit';
import { generateUuidv4 } from '@/lib/helpers/utils';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        enableDarkmode: false,
        sideBarExpanded: null,
        alerts: [],
        isMobile: false
    },
    reducers: {
        setEnableDarkmode: (state, action) => {
            state.enableDarkmode = action.payload;
        },
        setSideBarExpanded: (state, action) => {
            state.sideBarExpanded = action.payload;
        },
        addAlert: (state, action) => {
            state.alerts.push({ id: generateUuidv4(), ...action.payload });
        },
        removeAlert: (state, action) => {
            state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload;
        }
    }
});

// Thunk to handle adding and auto-removing the alert
export const addAlertAutoRemove = (alertData) => (dispatch) => {
    const alertId = generateUuidv4(); // Generate ID separately
    dispatch(addAlert({ ...alertData, id: alertId }));
    setTimeout(() => {
        dispatch(removeAlert(alertId));
    }, 4000);
};

export const { setEnableDarkmode, setSideBarExpanded, addAlert, removeAlert, setIsMobile } = uiSlice.actions;

export default uiSlice.reducer;
