import React from "react";
import { Link } from "react-router-dom";
import "./styles/nav.css";

interface NavProps {
    data: {
        name: string;
        address: string;
    };
}

function NavItem({ data }: NavProps): JSX.Element {

    const { name, address } = data;

    return (
        <Link to={`${address}`} className="menu-item">{name}</Link>
    );
}

export default NavItem;
