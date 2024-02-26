import {configureStore} from '@reduxjs/toolkit'

import {LocationSlice, MessageSlice} from "@/src/store";

export const makeStore = () => {
    return configureStore({
        reducer: {
            location: LocationSlice.reducer,
            message: MessageSlice.reducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']