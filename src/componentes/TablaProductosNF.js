import React, { useEffect, useState } from 'react';
import { CompModal } from '../ui/Modal';

export const TablaProductosNF = ( props ) => {


    //UseState para el modal de borrar
    //const [showBorrar, setShowBorrar] = useState(false);
    //const handleCloseBorrar = () => setShowBorrar(false);


    useEffect(() => {
      console.log('TablaProductos: ' , props.productos.length);
    }, [])
    


    // const handleEditClick = (e) => {
    //     const found = props.productos.find( prod => prod.id == e.target.id)
    //     props.setInfields( found );
    //     props.setIsSave(false);
    //     props.setBtnDisabled(false);
    //     localStorage.setItem('edit', found.id);
    //     console.log('ENCONTRADO: ', found);
    // }

    const handleDeleteClick = (e) => {
        const found = props.productos.find( prod => prod.id == e.target.id)
        props.deleteProdTabla(found);
    }

    const handleDeleteProd = () => {
        //props.deleteProd( handleCloseBorrar );
    }

    const getTotal = () => {
        let total = 0;
        props.productos && props.productos.map( producto => 
            total = total + (producto.precio * producto.cantidad)
        )
        return total;
    }

    const getIva = () => {
        return getTotal() * 0.21;
    }

    const getTotalIva = () => {
        return getTotal() + getIva();
    }

    return (
        <>

            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        
                        <th style={{width: 15 + '%'}}>Título</th>
                        <th style={{width: 61 + '%'}}>Descripción</th>
                        <th style={{width: 6 + '%'}}>Cantidad</th>
                        <th style={{width: 6 + '%'}}>€/Unidad</th>
                        <th style={{width: 6 + '%'}}>€/Total</th>

                        {/* <th style={{width: 5 + '%'}}></th> */}
                        <th style={{width: 6 + '%'}}></th>
                            
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        props.productos && props.productos.map( producto => 
                            
                            <tr key={ producto.id }>
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
                                        {producto.desc.substring(0,100) + ' ...'}
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
                                    <a onClick={ handleDeleteClick }>
                                        <i id={ producto.id }  className="bi-x-circle-fill"></i>
                                    </a>
                                </td>
                            </tr>

                        )
                    }

                </tbody>
            </table>
            
            {/* Total */}
            <div className='row'>
                <div className='col-12'>
                    <p className='totalNFPrecio' >{getTotal()} €</p>
                    <p className='totalNFLabel' >Total:</p>
                </div>
            </div>
            {/* Iva */}
            <div className='row'>
                <div className='col-12'>
                    <p className='totalNFPrecio' >{getIva()} €</p>
                    <p className='totalNFLabel' >IVA 21%:</p>
                </div>
            </div>
            {/* Total + Iva */}
            <div className='row'>
                <div className='col-12'>
                    <p className='totalNFPrecio' >{getTotalIva()} €</p>
                    <p className='totalNFLabel' >Total + IVA:</p>
                </div>
            </div>
            


            {/* <CompModal
                show={ showBorrar }
                handleClose={ handleCloseBorrar }
                btnAceptar={ handleDeleteProd }
                btnText={ 'Eliminar' }
                style={ 'danger' }
                name='ModalBorrar'
                titulo='Eliminar producto'
                desc='¿Estás seguro que deseas eliminar este producto?'
            ></CompModal> */}


        </>
    )
}
