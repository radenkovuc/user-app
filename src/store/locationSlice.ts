import {createSlice} from "@reduxjs/toolkit";

import {DailyData, Data} from "@/src/domain";

interface LocationState {
    dataByDate: [DailyData[], DailyData[]]
    data: [Data[], Data[]]
}

const initialState: LocationState = {
    dataByDate: [[], []],
    data: [[], []]
};

export const LocationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setDataByBate(state, action: { payload: [DailyData[], DailyData[]] }) {
            state.dataByDate = action.payload;
        },
        setData(state, action: { payload: [Data[], Data[]] }) {
            state.data = action.payload;
        },
        resetData(state) {
            state.dataByDate = [[], []]
            state.data = [[], []]
        }
    }
});

export const {setDataByBate, setData, resetData} = LocationSlice.actions;