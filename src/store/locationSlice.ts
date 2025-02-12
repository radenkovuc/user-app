import {createSlice} from "@reduxjs/toolkit";

import {LocationData} from "@/domain";

interface LocationState {
    locationData: LocationData
    isUpdate: boolean
}

const initialLocationData: LocationData = {
    temperature: {
        dailyData: [],
        lastData: []
    },
    waterLevel: {
        dailyData: [],
        lastData: []
    }
}

const initialState: LocationState = {
    locationData: initialLocationData,
    isUpdate: false
};

export const LocationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setLocationData(state, action: { payload: LocationData }) {
            state.locationData = action.payload;
        },

        setIsUpdate(state, action: { payload: boolean }) {
            state.isUpdate = action.payload;
        },

        resetData(state) {
            state.locationData = initialLocationData
        }
    }
});

export const {
    setLocationData,
    setIsUpdate,
    resetData
} = LocationSlice.actions;
