import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export const Navigation = () => {
    return (
        <div className="navigation">
            <h1>LOGISTIQUE</h1>
            <div className="menu">
                <NavLink
                    exact
                    className="navlink"
                    activeClassName="active"
                    to="/">
                    Visualisation des données
                </NavLink>
                <NavLink
                    exact
                    className="navlink"
                    activeClassName="active"
                    to="/communication">
                    Communication interAPI
                </NavLink>
                <NavLink
                    exact
                    className="navlink"
                    activeClassName="active"
                    to="/warehouse">
                    Entrepôt
                </NavLink>
            </div>
        </div>
    );
};
