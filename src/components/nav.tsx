import React from "react";
import NavItem from "./navItem";
import "./styles/nav.css";

function Nav(): JSX.Element {

    const menu = [
        { name: "Note", address: "/" },
        { name: "Archive", address: "/archive" },
        { name: "Trash", address: "/trash" }
    ];

    return (
        <nav className="nav-wrapper">
            <div className="menu-logo">
                <h1>Keep</h1>
            </div>
            <div className="menu-box">
                <div className="menu-list">
                    {menu.map((data) => (
                        <NavItem data={data} key={data.address} />
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Nav;
