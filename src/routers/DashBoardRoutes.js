import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Routes, Route, Link } from "react-router-dom";
import { Facturas } from '../componentes/Facturas';
import { Productos } from '../componentes/Productos';
import { GestorApp } from '../GestorApp';

export const DashBoardRoutes = () => {
  return (
    <>
        <Navbar></Navbar>
        <Routes>
                <Route path="/" element={<GestorApp />} />
                <Route path="/Facturas" element={<Facturas />} />
                <Route path="/Productos" element={<Productos />} />
        </Routes>
    </>
  )
}
