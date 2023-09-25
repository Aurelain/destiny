import {createSlice, configureStore} from '@reduxjs/toolkit';

// =====================================================================================================================
//  S E T U P
// =====================================================================================================================
const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        incremented: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decremented: (state) => {
            state.value -= 1;
        },
    },
});

const store = configureStore({
    reducer: counterSlice.reducer,
});

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));
store.dispatch(counterSlice.actions.incremented());
console.log('counterSlice.actions.incremented():', counterSlice.actions.incremented());
store.dispatch(counterSlice.actions.decremented());

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
const dispatch = store.dispatch;
const getState = store.getState;
export {dispatch, getState};
export default store;
