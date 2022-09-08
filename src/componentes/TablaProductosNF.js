import React, { useEffect, useState } from 'react';
import { getTotal, getTotalIva, getIva } from '../utils';

export const TablaProductosNF = (props) => {

    useEffect(() => {
        console.log('TablaProductos: ', props.productos.length);
    }, [])


    const handleDeleteClick = (e) => {
        const found = props.productos.find(prod => prod.id == e.target.id)
        props.deleteProdTabla(found);
    }

    
    return (
        <>

            <table className='table table-striped table-hover'>
                <thead>
                    <tr>

                        <th style={{ width: 15 + '%' }}>Título</th>
                        <th style={{ width: 61 + '%' }}>Descripción</th>
                        <th style={{ width: 6 + '%' }}>Cantidad</th>
                        <th style={{ width: 6 + '%' }}>€/Unidad</th>
                        <th style={{ width: 6 + '%' }}>€/Total</th>

                        {/* <th style={{width: 5 + '%'}}></th> */}
                        <th style={{ width: 6 + '%' }}></th>

                    </tr>
                </thead>
                <tbody>

                    {
                        props.productos && props.productos.map(producto =>

                            <tr key={producto.id}>
                                <td>
                                    {producto.titulo}
                                </td>

                                {
                                    producto.desc.length <= 100 ?
                                        <td>
                                            {producto.desc}
                                        </td>
                                        :
                                        <td>
                                            {producto.desc.substring(0, 100) + ' ...'}
                                        </td>
                                }



                                <td>
                                    {producto.cantidad}
                                </td>
                                <td>
                                    {producto.precio}
                                </td>
                                <td>
                                    {producto.precioTotal}
                                </td>
                                {/* <td>
                                    <a onClick={ handleEditClick }>
                                        <i id={ producto.id }  className="bi-pencil-square"></i>
                                    </a>
                                </td> */}
                                <td>
                                    {
                                        !props.modoEdit
                                        ?
                                        <a onClick={handleDeleteClick}>
                                            <i id={producto.id} className="bi-x-circle-fill"></i>
                                        </a>
                                        :
                                        <></>
                                    }
                                    
                                </td>
                            </tr>

                        )
                    }

                </tbody>
            </table>

            {/* Total */}
            <div className='row'>
                <div className='col-12'>
                    <p className='totalNFPrecio' >{getTotal(props.productos)} €</p>
                    <p className='totalNFLabel' >Total:</p>
                </div>
            </div>
            {/* Iva */}
            <div className='row'>
                {/* <div className='col-8' id='divAlertas'>

                    {
                        props.alertText != ''

                            ?

                            <div className={props.animationStyle}>
                                <div className={props.alertStyle} role="alert" hidden={false} >
                                    {props.alertText}
                                </div>
                            </div>

                            :

                            <div className='animate__animated animate__fadeOut'>
                                <div className={props.alertStyle} role="alert" hidden={true} >
                                    {props.alertText}
                                </div>
                            </div>
                    }

                </div> */}

                <div className='col-12' id='alertas2'>
                    <p className='totalNFPrecio' >{getIva(props.productos, props.IVA)} €</p>
                    <p className='totalNFLabel' id='alertas3'>{`IVA ${props.IVA}%:`}</p>
                </div>

            </div>
            {/* Total + Iva */}
            <div className='row'>
                <div className='col-12'>
                    <p className='totalNFPrecio' >{getTotalIva(props.productos, props.IVA)} €</p>
                    <p className='totalNFLabel' >Total + IVA:</p>
                </div>
            </div>


        </>
    )
}
