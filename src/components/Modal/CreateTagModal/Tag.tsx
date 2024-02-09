import React from "react";
import { useDispatch } from "react-redux";
import { removeTag } from "../../../store/tags/tags.slice";

import { CiEraser } from "react-icons/ci";
import "./Tag.css";

interface TagProps {
    value: string;
}

function Tag({ value }: TagProps) {

    const dispatch = useDispatch();

    const handleDeleteTag = () => {
        dispatch(removeTag(value));
    }

    return (
        <div className="edit__tag">
            <p>{value}</p>
            <CiEraser className="edit__tag__delete" onClick={handleDeleteTag}></CiEraser>
        </div>
    );
}

export default Tag;
