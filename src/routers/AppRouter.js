import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { GestorApp } from '../GestorApp'
import { LoginScreen } from '../Login/LoginScreen'
import { Navbar } from "../ui/Navbar";

export const AppRouter = () => {
    return (
        <div className="App">
            
            <Navbar></Navbar>

            <Routes>
                <Route path="/" element={<GestorApp />} />
                <Route path="/LoginScreen" element={<LoginScreen />} />
            </Routes>
        </div>
    );
}
