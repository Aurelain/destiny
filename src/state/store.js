import {configureStore, createSlice} from '@reduxjs/toolkit';
import INITIAL_STATE from './INITIAL_STATE.js';

// =====================================================================================================================
//  S E T U P
// =====================================================================================================================
const slice = createSlice({
    name: 'app',
    initialState: INITIAL_STATE,
    reducers: {
        setState: (state, action) => action.payload(state),
    },
});

const store = configureStore({
    reducer: slice.reducer,
    // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActionPaths: ['payload'],
            },
        });
    },
});

const setState = (manipulator) => {
    dispatch(slice.actions.setState(manipulator));
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export const {dispatch, getState} = store;
export {setState};
export default store;
