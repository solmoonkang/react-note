import React from "react";

import { CiPen } from "react-icons/ci";

import "./Nav.css";
import NavItem from "./NavItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Reserved } from "../../../type";
import { openTagCreateModal } from "../../../store/modal/modal.slice";

function Nav() {

    const tags = useSelector((state: RootState) => state.tagsSlice);
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(openTagCreateModal());
    }

    return (
        <nav className="nav">
            <h2>Keep</h2>
            <NavItem key={Reserved.NOTES} value={Reserved.NOTES} />

            {tags.map((tag) => (
                <NavItem key={tag} value={tag} />
            ))}

            <button className="nav-button">
                <CiPen className="nav-icon" />
                <p className="nav-title">Edit Notes</p>
            </button>

            <NavItem key={Reserved.ARCHIVE} value={Reserved.ARCHIVE} />
            <NavItem key={Reserved.TRASH} value={Reserved.TRASH} />
        </nav>
    );
}

export default Nav;
