import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Facturas = () => {

  const navigate = useNavigate();

  const handleNuevaFactura = () => {
    navigate('/NuevaFactura', {
      replace: true
    });
  }


  return (
    <>
      <br></br>
      <br></br>
      <h4>Facturas</h4>
      <hr></hr>

      <button
        className='btn btn-outline-primary'
        onClick={handleNuevaFactura}
        type='submit'
      >Nueva Factura</button>
      
    </>
    
  )
}
