import {createSlice} from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loader: {
            actions: []
        }
    },
    reducers: {
        START_ACTION: (state, action
        ) => {
            state.loader.actions.push(action.payload.action);
        },
        STOP_ACTION: (state, action) => {
            state.loader.actions = state.loader.actions.filter(a => {
                if(!action.payload.params) {
                    return a.name !== action.payload.name
                }
                return a.name !== action.payload.name || a.params !== action.payload.params;
            });
        }
    }
})

export const {
    START_ACTION,
    STOP_ACTION
} = uiSlice.actions;

export const checkIfLoading = (...actionsToCheck) => state => state.ui.loader.actions.some(action => actionsToCheck.includes(action.name));

export default uiSlice.reducer;