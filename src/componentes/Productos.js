import React, { useEffect, useState } from 'react'
import { getProductosData } from '../firebase/fb_utils'
import { TablaProductos } from './TablaProductos';
import Paginacion from '../ui/paginacion';
import { getTotalPaginas, ITEMS_POR_PAGINA } from '../utils';

export const Productos = () => {

  const [productos, setProductos] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1)

  useEffect(() => {
    getProductosData( setProductos );

  }, [])

  console.log(productos);
  

  let ProductosPorPagina = productos.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    (paginaActual * ITEMS_POR_PAGINA)
  )
  


  return (
    <>

      <div className='sec-uno'>

        <br></br>
        <br></br>
        <h3>Productos</h3>
        <hr></hr>

        <br></br>

        <TablaProductos productos={ ProductosPorPagina }></TablaProductos>

      </div>

      <div className='d-flex flex-row-reverse m-2'>

        <Paginacion pagina={paginaActual} total={ getTotalPaginas( productos ) } onChange={(pagina) => {

          setPaginaActual(pagina)

        } } />
        
      </div>

      
      
    </>
  )
}
