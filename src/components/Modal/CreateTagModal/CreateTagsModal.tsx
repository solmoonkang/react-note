import React, { FormEvent, MouseEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import Tag from "./Tag";
import { CiCircleRemove } from "react-icons/ci";
import { closeTagCreateModal } from "../../../store/modal/modal.slice";
import { createTag } from "../../../store/tags/tags.slice";

import "./CreateTagModal.css";

function CreateTagsModal() {

    const tags = useSelector((state: RootState) => state.tagsSlice);
    const dispatch = useDispatch();

    const [tagName, setTagName] = useState("");

    const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
        const clickedElement = e.target as HTMLElement;
        if (clickedElement.classList.contains("edit__background"))
            handleCloseModal();
    };

    const handleCloseModal = () => {
        dispatch(closeTagCreateModal());
    };

    const handleSubmitTag = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createTag(tagName));
        setTagName("");
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagName(e.target.value);
    };

    return (
        <div className="edit__background" onClick={handleBackgroundClick}>
            <div className="edit__tags">
                <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
                <p className="edit__title">Edit Tags</p>
                <form className="edit__tags__form" onSubmit={handleSubmitTag}>
                    <input type="text" name="value" value={tagName} onChange={onChange} placeholder="new tag..." />
                </form>
                {tags.map((tag) => (
                    <Tag key={tag} value={tag} />
                ))}
            </div>
        </div>
    );
}

export default CreateTagsModal;
