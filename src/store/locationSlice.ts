import {createSlice} from "@reduxjs/toolkit";

import {DailyData} from "@/src/domain/dailyData";
import {Data} from "@/src/domain/data";

interface LocationState {
    dataByDate: DailyData[]
    data: Data[]
}

const initialState: LocationState = {
    dataByDate: [],
    data: []
};

export const LocationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setDataByBate(state, action) {
            state.dataByDate = action.payload;
        },
        setData(state, action) {
            state.data = action.payload;
        },
    }
});

export const {setDataByBate, setData} = LocationSlice.actions;