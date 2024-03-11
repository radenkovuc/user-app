import {createSlice} from "@reduxjs/toolkit";

import {DailyData, Data} from "@/src/domain";

interface LocationState {
    temperatures: Data[]
    waterLevels: Data[]
    dailyTemperatures: DailyData[]
    dailyWaterLevels: DailyData[]
}

const initialState: LocationState = {
    temperatures: [],
    waterLevels: [],
    dailyTemperatures: [],
    dailyWaterLevels: []
};

export const LocationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setTemperatures(state, action: { payload: Data[] }) {
            state.temperatures = action.payload;
        },
        setWaterLevels(state, action: { payload: Data[] }) {
            state.waterLevels = action.payload;
        },
        setDailyTemperatures(state, action: { payload: DailyData[] }) {
            state.dailyTemperatures = action.payload;
        },
        setDailyWaterLevels(state, action: { payload: DailyData[] }) {
            state.dailyWaterLevels = action.payload;
        },
        resetData(state) {
            state.temperatures = []
            state.waterLevels = []
            state.dailyTemperatures = []
            state.dailyWaterLevels = []
        }
    }
});

export const {
    setTemperatures,
    setWaterLevels,
    setDailyTemperatures,
    setDailyWaterLevels,
    resetData
} = LocationSlice.actions;