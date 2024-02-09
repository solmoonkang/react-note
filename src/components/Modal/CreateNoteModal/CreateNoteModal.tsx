import React, { useState, MouseEvent } from "react";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setEdit } from "../../../store/notes/noteState.slice";
import { closeNoteEditModal, openTagAddModal } from "../../../store/modal/modal.slice";
import { createNote, editNote } from "../../../store/notes/notes.slice";
import { Note } from "../../../store/notes/note.type";
import Editor from "../../Note/Editor/Editor";
import AddTagModal from "./AddTagModal";
import dayjs from "dayjs";
import { v4 } from "uuid";

import { CiCircleRemove } from "react-icons/ci";
import "./CreateNoteModal.css";

function CreateNoteModal() {

    const modal = useSelector((state: RootState) => state.modalSlice);
    const isEdit = useSelector((state: RootState) => state.noteStateSlice);
    const activeNote = useSelector((state: RootState) => state.noteSlice);

    const [title, setTitle] = useState(isEdit ? activeNote.title : "");
    const [tags, setTags] = useState<string[]>(isEdit ? activeNote.tag : []);
    const [background, setBackground] = useState(isEdit ? activeNote.background : "");

    const dispatch = useDispatch();

    let initialPriority;
    if (isEdit) {
        initialPriority = activeNote.priority === 0 ? "HIGH" : activeNote.priority === 2 ? "LOW" : "MID";
    } else {
        initialPriority = "MID";
    }

    const [priority, setPriority] = useState(initialPriority);
    const [content, setContent] = useState(isEdit ? activeNote.content : "");

    const handleCloseModal = () => {
        if (isEdit) dispatch(setEdit(false));
        dispatch(closeNoteEditModal());
    };

    const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
        const clickedElement = e.target as HTMLElement;
        if (clickedElement.classList.contains("edit__background"))
        handleCloseModal();
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onContentChange = (value: string) => {
        setContent(value);
    };

    const onTagsChange = (value: string[]) => {
        setTags(value);
    };

    const handleSubmitNote = () => {
        if (title === "") alert("노트 제목이 비었습니다.");
        else if (content === "") alert("노트 내용이 비었습니다.");
        else {
        const date = dayjs().format("DD/MM/YY h:mm a");
        const id = v4();

        let priorityNum;
        switch (priority) {
            case "HIGH":
            priorityNum = 0;
            break;

            case "MID":
            priorityNum = 1;
            break;

            case "LOW":
            priorityNum = 2;
            break;
            
            default:
            priorityNum = 2;
        }

        let note: Partial<Note> = {
            tag: tags,
            priority: priorityNum,
            background: background,
            title: title,
            content: content,
        };

        if (isEdit) {
            note = { ...activeNote, ...note };
            dispatch(editNote(note));
            dispatch(setEdit(false));
        } else {
            note = { ...note, date: date, id: id, time: new Date().getTime(), pinned: false };
            dispatch(createNote(note));
        }
        dispatch(closeNoteEditModal());
        }
    };

    return (
        <div className="edit__background" onClick={handleBackgroundClick}>
            <div className="edit__note">
                <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
                <p className="edit__title">노트 생성하기</p>
                <form className="edit__note__form">
                    <input type="text" name="title" value={title} onChange={onTitleChange} placeholder="노트 제목"></input>
                </form>
                <Editor background={background} content={content} onChange={onContentChange} />
                <div className="edit__note__option">
                    <button className="edit__note__addTag" onClick={() => dispatch(openTagAddModal())}>
                        Add Tag
                    </button>
                <div className="edit__note__tag">
                    <label htmlFor="color">배경색 : </label>
                    <select
                    value={background}
                    id="color"
                    onChange={(e) => setBackground(e.target.value)}
                    >
                    <option value="#ffffff">White</option>
                    <option value="#ffd1d1">Red</option>
                    <option value="#ebffce">Green</option>
                    <option value="#d5f1fc">Blue</option>
                    </select>
                </div>
                <div className="edit__note__priority">
                    <label htmlFor="priority">우선순위 : </label>
                    <select
                    value={priority}
                    id="priority"
                    onChange={(e) => setPriority(e.target.value)}
                    >
                    <option value="HIGH">High</option>
                    <option value="MID">Mid</option>
                    <option value="LOW">Low</option>
                    </select>
                </div>
                </div>

                <button className="edit__note__submit" onClick={handleSubmitNote}>
                + 생성하기
                </button>
            </div>
            {modal.tag_add && <AddTagModal tags={tags} onChange={onTagsChange} />}
            </div>
    );
}

export default CreateNoteModal;
