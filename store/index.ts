// import { RootState } from './../node_modules/reselect/dist/reselect.d';
import { configureStore } from "@reduxjs/toolkit";
import mesasReducer from "../app/features/mesas/mesasSlice";
import comandasReducer from "../app/features/comandas/comandasSlice";
import areasReducer from "../app/features/areas/areasSlice";


export const store = configureStore({
    reducer: {
        mesas: mesasReducer,
        comandas: comandasReducer,
        areas: areasReducer,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;