import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {

    //TODO salir de la app
    const handleLogOut = () => {
        console.log('salir de la app');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link' + ( isActive ? ' active' : '') }
                        to="/facturas"
                    >
                        Facturas
                    </NavLink>

                    <NavLink 
                        className={ ({ isActive }) => 'nav-item nav-link' + ( isActive ? ' active' : '') }
                        to="/productos"
                    >
                        Productos
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-felx justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <button 
                        className="btn btn-primary" 
                        onClick={ handleLogOut }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}