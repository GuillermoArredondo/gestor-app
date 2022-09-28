import React, { useEffect, useState } from 'react';
import { getTotal, getTotalIva, getIva } from '../utils';
import { useNavigate } from 'react-router-dom';
import { getFactura2 } from '../firebase/fb_utils';

export const TablaFacturas = (props) => {

    useEffect(() => {
        
    }, [])


    const handleConsultaClick = async (e) => {
        //const factura = await getFactura2(e.target.id)
        //console.log('handleConsultaClick', factura.titulo);
        localStorage.setItem('factura', e.target.id);
        console.log('handleConsultaClick', esNormal(e.target.id));
        let entrar = await esNormal(e.target.id);
        if (entrar) {
            navigate('/ConsultarFactura', {
                replace: true
              });
        }else{
            navigate('/ConsultarFacturaEstancias', {
                replace: true
              });
        }
        
    }

    const esNormal =  async (id) => {
        
        let normal = true;
        let f = await getFactura2(id);
        if (f.tipo == 'estancias') {
            normal = false;
        }
        console.log('esNormal', f.tipo, normal);
        return normal;
        //TODO comprobar si es una factua normal segun el tipo
    }

    const navigate = useNavigate();

    
    return (
        <>

            <table className='table table-striped table-hover'>
                <thead>
                    <tr>

                        <th style={{ width: 10 + '%' }}>Fecha</th>
                        <th style={{ width: 15 + '%' }}>Titulo</th>
                        <th style={{ width: 55 + '%' }}>Descripción</th>
                        <th style={{ width: 5 + '%' }}>Productos</th>
                        <th style={{ width: 10 + '%' }}>Total €</th>

                        {/* <th style={{width: 5 + '%'}}></th> */}
                        <th style={{ width: 5 + '%' }}></th>

                    </tr>
                </thead>
                <tbody>

                    {
                        props.facturas && props.facturas.map(factura =>

                            <tr key={factura.id}>
                                <td>
                                    {factura.fecha}
                                </td>
                                {
                                    factura.titulo.length <= 15 ?
                                        <td>
                                            {factura.titulo}
                                        </td>
                                        :
                                        <td>
                                            {factura.titulo.substring(0, 15) + ' ...'}
                                        </td>
                                }
                                {
                                    factura.desc.length <= 80 ?
                                        <td>
                                            {factura.desc}
                                        </td>
                                        :
                                        <td>
                                            {factura.desc.substring(0, 80) + ' ...'}
                                        </td>
                                }
                                <td>
                                    {factura.productos.length}
                                </td>
                                <td>
                                    {factura.totalIva}
                                </td>
                                {/* <td>
                                    <a onClick={ handleEditClick }>
                                        <i id={ producto.id }  className="bi-pencil-square"></i>
                                    </a>
                                </td> */}
                                <td>
                                    <a onClick={handleConsultaClick}>
                                        <i id={factura.id} className="bi bi-eye-fill"></i>
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
