import React, { useEffect, useState } from 'react';
import { getTotal, getTotalIva, getIva } from '../utils';

export const TablaProductosNFEstancias = (props) => {

    useEffect(() => {
        console.log('TablaProductos: ', props.productos.length);
    }, [])


    const handleDeleteClick = (e) => {
        const found = props.productos.find(prod => prod.id == e.target.id)
        props.deleteProdTabla(found);
    }

    // const handleReload = () => {
    //     props.ordenar();
    // }

    
    return (
        <>

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th style={{ width: 10 + '%' }}>Estancia</th>
                        <th style={{ width: 10 + '%' }}>Título</th>
                        <th style={{ width: 56 + '%' }}>Descripción</th>
                        <th style={{ width: 6 + '%' }}>Cantidad</th>
                        <th style={{ width: 6 + '%' }}>€/Unidad</th>
                        <th style={{ width: 6 + '%' }}>€/Total</th>
                        <th style={{ width: 6 + '%' }}>
                            {/* <a onClick={ handleReload }>
                                <i className='bi bi-arrow-clockwise'>
                                </i>
                            </a> */}
                        </th>

                    </tr>
                </thead>
                <tbody>

                    
                    {
                        props.productos && props.productos.map(producto =>

                            <tr key={producto.id}  style={{backgroundColor: producto.estancia.color}}>
                                <td>
                                    {producto.estancia.titulo}
                                </td>
                                <td>
                                    {producto.titulo}
                                </td>

                                {
                                    producto.desc.length <= 90 ?
                                        <td>
                                            {producto.desc}
                                        </td>
                                        :
                                        <td>
                                            {producto.desc.substring(0, 90) + ' ...'}
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
