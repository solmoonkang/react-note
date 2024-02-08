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
                <CiStickyNote className="nav__item-icon" />
            ) : value === Reserved.ARCHIVE ? (
                <CiInboxIn className="nav__item-icon" />
            ) : value === Reserved.TRASH ? (
                <CiTrash className="nav__item-icon" />
            ) : (
                <CiShoppingTag className="nav__item-icon" />
            )}
            <p className="nav__item-title">{value}</p>
        </button>
    );
}

export default NavItem;
