import {createSlice} from "@reduxjs/toolkit";

import {LocationData} from "@/domain";

interface LocationState {
    locationData: LocationData
}

const initialState: LocationState = {
    locationData: {
        temperature: {
            dailyData: [],
            lastData: []
        },
        waterLevel: {
            dailyData: [],
            lastData: []
        }
    }
};

export const LocationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        setLocationData(state, action: { payload: LocationData }) {
            state.locationData = action.payload;
        },

        resetData(state) {
            state = initialState
        }
    }
});

export const {
    setLocationData,
    resetData
} = LocationSlice.actions;
