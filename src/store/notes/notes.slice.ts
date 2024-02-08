import { createSlice } from "@reduxjs/toolkit";
import { Note } from "./note.type";

const initialState: Note[] = [];

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        createNote: (state, action) => {
            return [...state, action.payload];
        },
        
        removeNote: (state, action) => {
            return state.map((data) => {
                if (data.id === action.payload.id) {
                    return action.payload;
                }
                return data;
            });
        },

        editNote: (state, action) => {
            return state.map((data) => {
              if (data.id === action.payload.id) {
                return action.payload;
              }
              return data;
            });
          },

        pinNote: (state, action) => {
            const noteToPin = state.find((data) => data.id === action.payload);
            if (noteToPin) {
                noteToPin.pinned = true;
            }
        },

        unpinNote: (state, action) => {
            const noteToUnpin = state.find((data) => data.id === action.payload);
            if (noteToUnpin) {
                noteToUnpin.pinned = false;
            }
        },
    },
});

export const { createNote, removeNote, editNote, pinNote, unpinNote } = noteSlice.actions;
export default noteSlice.reducer;