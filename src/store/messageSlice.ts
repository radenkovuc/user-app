import {createSlice} from "@reduxjs/toolkit";

interface MessageState {
    isOpen: boolean
    message: string
}

const initialState: MessageState = {
    isOpen: false,
    message: ''
};

export const MessageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        closeMessage(state) {
            state.isOpen = false
        },
        showMessage(state, action) {
            state.isOpen = true
            state.message = action.payload
        },
    }
});

export const {closeMessage, showMessage} = MessageSlice.actions;