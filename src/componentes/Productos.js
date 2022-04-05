import React, { useEffect, useState } from 'react'
import { getProductosData } from '../firebase/fb_utils'
import { TablaProductos } from './TablaProductos';

export const Productos = () => {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductosData( setProductos );
  }, [])

  console.log(productos);
  
  //getProductosData( setProductos );
  


  return (
    <>
      <br></br>
      <br></br>
      <h3>Productos</h3>
      <hr></hr>

      <br></br>

      <TablaProductos productos={ productos }></TablaProductos>
      
    </>
  )
}
