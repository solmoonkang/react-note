import React from 'react'
import { useDispatch } from 'react-redux';
import { Note } from '../../../store/notes/note.type';
import { setEdit } from "../../../store/notes/noteState.slice";
import { openNoteEditModal, openNoteReadModal } from "../../../store/modal/modal.slice";
import { setActiveNote } from "../../../store/notes/note.slice";
import { createNote, pinNote, removeNote, unpinNote } from "../../../store/notes/notes.slice";
import { addTrash, restoreTrash } from "../../../store/trash/trash.slice";
import { addArchive, restoreArchive } from "../../../store/archive/archive.slice";

import "./Content.css";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { PiPencilSimpleLineLight, PiArchiveTrayLight, PiTrash } from "react-icons/pi";
import { CiRedo } from "react-icons/ci";
import { Reserved } from "../../../type";

interface ContentProps {
    value: Note;
    selected: string;
}

function Content({ selected, value }: ContentProps) {

    const { id, tag, priority, background, title, content, date, pinned } = value;
    const dispatch = useDispatch();

    const handleEditNote = () => {
        dispatch(openNoteEditModal());
        dispatch(setEdit(true));
        dispatch(setActiveNote(value));
      };
    
      const handleRemoveNote = () => {
        dispatch(removeNote(value));
        dispatch(addTrash(value));
      };
    
      const handleToArchive = () => {
        dispatch(removeNote(value));
        dispatch(addArchive(value));
      };
    
      const handleRestore = () => {
        if (selected === Reserved.ARCHIVE) {
          dispatch(restoreArchive(value));
          dispatch(createNote(value));
        } else if (selected === Reserved.TRASH) {
          dispatch(restoreTrash(value));
          dispatch(createNote(value));
        }
      };
    
      const handlePinNote = (bool: boolean) => {
        bool ? dispatch(pinNote(id)) : dispatch(unpinNote(id));
      };
    
      const handleReadNote = () => {
        dispatch(setActiveNote(value));
        dispatch(openNoteReadModal());
      };

    return (
        <div className="content-container" style={{ backgroundColor: background }}>
            <div className="content-header">
                <p className="content-title">{title}</p>
                {priority === 0 ? (
                    <p className="content-priority">HIGH</p>
                ) : priority === 2 ? (
                    <p className="content-priority">LOW</p>
                ) : (
                    <p className="content-priority">MID</p>
                )}
                {pinned ? (
                    <AiFillPushpin className="content-pinned__true" onClick={() => handlePinNote(false)} />
                ) : (
                    <AiOutlinePushpin className="content-pinned__false" onClick={() => handlePinNote(true)} />
                )}
            </div>

            <div dangerouslySetInnerHTML={{ __html: content }} className="content-detail" onClick={handleReadNote} />
            <div className="content-tag">
                {tag.map((t) => (
                    <p key={t}>{t}</p>
                ))}
            </div>
            <div className="content-info">
                <div className="content-date">{date}</div>

                {selected === Reserved.ARCHIVE || selected === Reserved.TRASH ? (
                    <div className="content-buttons">
                        <button onClick={handleRestore}>
                            <CiRedo className="content-button__restore" />
                        </button>
                    </div>
                ) : (
                    <div className="content-buttons">
                        <button onClick={handleEditNote}>
                            <PiPencilSimpleLineLight className="content-button__edit" />
                        </button>
                        <button onClick={handleToArchive}>
                            <PiArchiveTrayLight className="content-button__archive" />
                        </button>
                        <button onClick={handleRemoveNote}>
                            <PiTrash className="content-button__delete" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Content;
