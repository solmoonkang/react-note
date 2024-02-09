import React, { MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { closeTagAddModal } from "../../../store/modal/modal.slice";

import { CiCircleRemove } from "react-icons/ci";
import "./AddTagModal.css";

interface AddTagModalProps {
    tags: string[];
    onChange: (value: string[]) => void;
}

function AddTagModal({ tags, onChange }: AddTagModalProps) {

    const tagList = useSelector((state: RootState) => state.tagsSlice);
    const dispatch = useDispatch();

    const handleBackgroundClick = (e: MouseEvent<HTMLElement>) => {
        const clickedElement = e.target as HTMLElement;
        if (clickedElement.classList.contains("edit__background")) 
            handleCloseModal();
    };

    const handleCloseModal = () => {
        dispatch(closeTagAddModal());
    };

    const handleRemoveTag = (value: string) => {
        if (tags.includes(value)) {
            onChange(tags.filter((data) => data !== value));
        }
    };

    const handleAddTag = (value: string) => {
        if (!tags.includes(value)) {
            onChange([...tags, value]);
        }
    };

    return (
        <div className="edit__tag__background" onClick={handleBackgroundClick}>
            <div className="edit__add__tags">
                <CiCircleRemove className="edit__delete" onClick={handleCloseModal} />
                <p className="edit__title">태그 추가하기</p>
                <div className="edit__add__tag__list">
                    {tagList.map((value) => (
                        <div key={value} className="edit__tag">
                            <p>{value}</p>
                            {tags.includes(value) ? (
                                <button onClick={() => handleRemoveTag(value)}>-</button>
                            ) : (
                                <button onClick={() => handleAddTag(value)}>+</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddTagModal;
