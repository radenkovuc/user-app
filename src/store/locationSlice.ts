import {createSlice} from "@reduxjs/toolkit";

import {LocationData} from "@/domain";

interface LocationState {
    locationData: LocationData
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
    locationData: initialLocationData
};

export const LocationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setLocationData(state, action: { payload: LocationData }) {
            state.locationData = action.payload;
        },

        resetData(state) {
            state.locationData = initialLocationData
        }
    }
});

export const {
    setLocationData,
    resetData
} = LocationSlice.actions;
