import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export const Navbar = () => {

    const navigate = useNavigate();


    const handleLogOut = () => {
        navigate('/login', {
            replace: true
        });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Gestor
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
                        id='btn-logout'
                    >
                        Cerrar Sesión
                    </button>
                </ul>
            </div>
        </nav>
    )
}