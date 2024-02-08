import React from "react";
import { Note } from "../../../store/notes/note.type";

import "./List.css";
import Content from "../Content/Content";

interface ListProps {
    notes: Note[];
    selected: string;
}

function List({ notes, selected }: ListProps) {

    return (
        <div className="list-notes">
            {notes.map((note) => (
                <Content key={note.id} value={note} selected={selected} />
            ))}
        </div>
    );
}

export default List;
