import React from "react";

import "./NavItem.css";
import { useDispatch } from "react-redux";
import { Reserved } from "../../../type";
import { setActiveTag } from "../../../store/tags/tag.slice";
import { CiInboxIn, CiShoppingTag, CiStickyNote, CiTrash } from "react-icons/ci";


interface NavProps {
    value: string;
}

function NavItem({ value }: NavProps) {

    const dispatch = useDispatch();
    const activeTag = (value: string) => {
        dispatch(setActiveTag(value));
    }

    return (
        <button className="nav__item" onClick={() => activeTag(value)}>
            {value === Reserved.NOTES ? (
                <CiStickyNote />
            ) : value === Reserved.ARCHIVE ? (
                <CiInboxIn />
            ) : value === Reserved.TRASH ? (
                <CiTrash />
            ) : (
                <CiShoppingTag />
            )}
            <p className="nav__item-title">{value}</p>
        </button>
    );
}

export default NavItem;
