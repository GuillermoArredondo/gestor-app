import React from 'react'

export const TablaProductos = (props) => {

    const handleEditClick = (e) => {
        e.preventDefault();
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();
    }

    return (
        <>

            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        
                        <th style={{width: 15 + '%'}}>Título</th>
                        <th style={{width: 70 + '%'}}>Descripción</th>
                        <th style={{width: 5 + '%'}}>Precio</th>

                        <th style={{width: 5 + '%'}}>
                            
                        </th>
                        <th style={{width: 5 + '%'}}>
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        props.productos && props.productos.map( producto => 
                            
                            <tr>
                                <td>
                                    {producto.titulo}
                                </td>
                                <td>
                                    {producto.desc}
                                </td>
                                <td>
                                    {producto.precio}
                                </td>
                                <td>
                                    <a onClick={ handleEditClick }>
                                        <i className="bi-pencil-square"></i>
                                    </a>
                                </td>
                                <td>
                                    <a onClick={ handleDeleteClick }>
                                        <i className="bi-x-circle-fill"></i>
                                    </a>
                                </td>
                            </tr>

                        )
                    }

                </tbody>
            </table>


        </>
    )
}
