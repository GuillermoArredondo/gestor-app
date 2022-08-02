import React from 'react'
import { Navbar } from '../ui/Navbar'
import { Routes, Route, Link } from "react-router-dom";
import { Facturas } from '../componentes/Facturas';
import { Productos } from '../componentes/Productos';
import { GestorApp } from '../GestorApp';
import { NuevaFactura } from '../componentes/NuevaFactura';
import { ConsultarFactura } from '../componentes/ConsultarFactura';

export const DashBoardRoutes = () => {
  return (
    <>
        <Navbar></Navbar>

        <div className='container'>

        <Routes>
                <Route path="/" element={<GestorApp />} />
                <Route path="/Facturas" element={<Facturas />} />
                <Route path="/Productos" element={<Productos />} />
                <Route path='/NuevaFactura' element={<NuevaFactura />} />
                <Route path='/ConsultarFactura' element={<ConsultarFactura />} />
        </Routes>

        </div>

        
    </>
  )
}
