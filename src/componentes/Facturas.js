import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TablaFacturas } from './TablaFacturas';
import { useEffect, useState } from 'react';
import { getTotalPaginas, ITEMS_POR_PAGINA } from '../utils';
import { getFacturasData } from '../firebase/fb_utils';
import Paginacion from '../ui/paginacion';

export const Facturas = () => {


  //Lista facturas
  const [facturas, setFacturas] = useState([]);
  //UseStates de las paginas
  const [paginaActual, setPaginaActual] = useState(1)


  const navigate = useNavigate();

  const handleNuevaFactura = () => {
    navigate('/NuevaFactura', {
      replace: true
    });
  }

  const handleNuevaFacturaEstancias = () => {
    navigate('/NuevaFacturaEstancias', {
      replace: true
    });
  }

  useEffect(() => {
    getFacturasData(setFacturas);
    console.log('Facturas: ', facturas.length)
  }, [])


  //Variable que da las facturas por pagina
  let FacturasPorPagina = facturas.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    (paginaActual * ITEMS_POR_PAGINA)
  )


  return (
    <>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='col-7'>
          <h4>Facturas</h4>
        </div>
        <div className='col-3 float-right'>
          <div style={{ float: 'right' }}>
            <button
              className='btn btn-outline-primary'
              onClick={handleNuevaFacturaEstancias}
              type='submit'
            >Nueva Factura (Estancias)</button>
          </div>
          
        </div>
        <div className='col-2 float-right'>
          <button
            className='btn btn-outline-primary'
            onClick={handleNuevaFactura}
            type='submit'
          >Nueva Factura (Normal)</button>
        </div>
      </div>

      <hr></hr>
      <br></br>

      <div className='sec-tabla-productos'>
        <TablaFacturas
          facturas={FacturasPorPagina}
        >
        </TablaFacturas>
      </div>
      

      <br></br>
      {/* paginacion*/}

      <div className='divDerecha'>
        <Paginacion pagina={paginaActual} total={getTotalPaginas(facturas)} onChange={(pagina) => {

          console.log(pagina);
          setPaginaActual(pagina)

        }} />
      </div>

    </>

  )
}
