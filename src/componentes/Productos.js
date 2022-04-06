import React, { useEffect, useState } from 'react'
import { getProductosData, addProducto } from '../firebase/fb_utils'
import { TablaProductos } from './TablaProductos';
import Paginacion from '../ui/paginacion';
import { getTotalPaginas, ITEMS_POR_PAGINA } from '../utils';
import { useForm } from '../Hooks/useForm';

export const Productos = () => {

  //Lista productos
  const [productos, setProductos] = useState([]);
  //UseStates de las paginas
  const [paginaActual, setPaginaActual] = useState(1)

  //UseStates de los inputs
  const [{ tituloValue }, handleInputChangeTitulo, reset1] = useForm({
    tituloValue: ''
  });
  const [{ descValue }, handleInputChangeDesc, reset2] = useForm({
    descValue: ''
  });
  const [{ precioValue }, handleInputChangePrecio, reset3] = useForm({
    precioValue: ''
  });


  useEffect(() => {
    getProductosData( setProductos );
    localStorage.setItem('numProd', productos.length.toString());
  }, [])

  console.log(productos);
  

  //Variable que da los productos por pagina
  let ProductosPorPagina = productos.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    (paginaActual * ITEMS_POR_PAGINA)
  )
  

  //Guardar Nuevo producto
  const handleInputGuardar = (e) => {
    e.preventDefault();

    const newProd = {
      titulo: tituloValue,
      desc: descValue,
      precio: precioValue,
    }

    addProducto( newProd );

    getProductosData( setProductos );
    localStorage.setItem('numProd', productos.length.toString());
    reset();
  }

  const reset = () => {
    reset1();
    reset2();
    reset3();
  }


  return (
    <>

      <div className='sec-uno'>
        <br></br>
        <br></br>
        <h3>Productos</h3>
        <hr></hr>

        <br></br>

        <TablaProductos productos={ProductosPorPagina}></TablaProductos>
      </div>


      <form>

        <div className='row'>
          <div className='col-6'>
            <input 
              className='form-control'
              placeholder='Título'
              type='text'
              name='tituloValue'
              onChange={ handleInputChangeTitulo }
              value={ tituloValue }
              ></input>
          </div>
          <div className='col-4'>
          <input 
              className='form-control'
              placeholder='Precio'
              type='number'
              name='precioValue'
              onChange={ handleInputChangePrecio }
              value={ precioValue }
              ></input>
          </div>
          <div className='col-1'>
            <button 
              className='btn btn-outline-primary' 
              disabled=''
              onClick={ handleInputGuardar }
              type='submit'
              >Guardar</button>
          </div>
          <div className='col-1'>
            <button 
              className='btn btn-outline-danger' 
              disabled=''
              onClick={ reset }
              type='reset'
              >Cancelar</button>
          </div>
          
        </div>
        <br></br>
        <div className='row'>
          <div className='col'>
          <textarea 
              className='form-control'
              placeholder='Descripción'
              type='text'
              name='descValue'
              onChange={ handleInputChangeDesc }
              value={ descValue }
              ></textarea>
          </div>
        </div>

      </form>

      <br></br>
      <div className='d-flex flex-row-reverse m-2'>
        <div className='sec-dos'>
          <Paginacion pagina={paginaActual} total={getTotalPaginas(productos)} onChange={(pagina) => {

            setPaginaActual(pagina)

          }} />
        </div>
      </div>

    </>
  )
}
