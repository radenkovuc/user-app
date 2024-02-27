import {createSlice} from "@reduxjs/toolkit";

type Message = {
    id: number
    text: string
}

interface MessageState {
    messages: Message[]
}

const initialState: MessageState = {
    messages: []
};

export const MessageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        closeMessage(state, action) {
           state.messages = state.messages.filter(m => m.id !== action.payload)
        },
        addMessage(state, action) {
            state.messages = [...state.messages, {id: Date.now(), text: action.payload}]
        },
    }
});

export const {closeMessage, addMessage} = MessageSlice.actions;