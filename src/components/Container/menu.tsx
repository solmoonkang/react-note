import React from "react";
import Note from "../Presentation/note";
import EditTage from "../Presentation/editTage";
import Archive from "../Presentation/archive";
import Trash from "../Presentation/trash";

export default function () {
    return (
        <div>
            <Note />
            <EditTage />
            <Archive />
            <Trash />
        </div>
    );
}
