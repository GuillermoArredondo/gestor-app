import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { GestorApp } from '../GestorApp'
import { LoginScreen } from '../Login/LoginScreen'
import { Navbar } from "../ui/Navbar";
import { DashBoardRoutes } from "./DashBoardRoutes";

export const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/login" element={ <LoginScreen />} />

                <Route path="/*" element={ <DashBoardRoutes /> } ></Route>
            </Routes>
        </div>
    );
}
