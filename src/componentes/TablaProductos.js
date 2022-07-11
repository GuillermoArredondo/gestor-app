import React, { useEffect, useState } from 'react';
import { CompModal } from '../ui/Modal';

export const TablaProductos = ( props ) => {


    //UseState para el modal de borrar
    const [showBorrar, setShowBorrar] = useState(false);
    const handleCloseBorrar = () => setShowBorrar(false);


    useEffect(() => {
      
        console.log('USE EFFECT TABLA');

    }, [])
    


    const handleEditClick = (e) => {
        const found = props.productos.find( prod => prod.id == e.target.id)
        props.setInfields( found );
        props.setIsSave(false);
        props.setBtnDisabled(false);
        localStorage.setItem('edit', found.id);
        console.log('ENCONTRADO: ', found);
    }

    const handleDeleteClick = (e) => {
        localStorage.setItem('delete', e.target.id);
        console.log(e.target.id);
        setShowBorrar(true);
    }

    const handleDeleteProd = () => {

        props.deleteProd( handleCloseBorrar );
    
    }

    return (
        <>

            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        
                        <th style={{width: 15 + '%'}}>Título</th>
                        <th style={{width: 70 + '%'}}>Descripción</th>
                        <th style={{width: 5 + '%'}}>Precio</th>

                        <th style={{width: 5 + '%'}}></th>
                        <th style={{width: 5 + '%'}}></th>
                            
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
                                    {producto.precio}
                                </td>
                                <td>
                                    <a onClick={ handleEditClick }>
                                        <i id={ producto.id }  className="bi-pencil-square"></i>
                                    </a>
                                </td>
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


            <CompModal
                show={ showBorrar }
                handleClose={ handleCloseBorrar }
                btnAceptar={ handleDeleteProd }
                btnText={ 'Eliminar' }
                style={ 'danger' }
                name='ModalBorrar'
                titulo='Eliminar producto'
                desc='¿Estás seguro que deseas eliminar este producto?'
            ></CompModal>


        </>
    )
}
