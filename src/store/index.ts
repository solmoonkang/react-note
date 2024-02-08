import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./notes/note.slice";
import notesSlice from "./notes/notes.slice";
import noteStateSlice from "./notes/noteState.slice";
import tagSlice from "./tags/tag.slice";
import tagsSlice from "./tags/tags.slice";
import archiveSlice from "./archive/archive.slice";
import trashSlice from "./trash/trash.slice";

export const store = configureStore({
    reducer: {
        noteSlice,
        notesSlice,
        noteStateSlice,
        tagSlice,
        tagsSlice,
        archiveSlice,
        trashSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
