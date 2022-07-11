import { useForm } from '../Hooks/useForm';
import { useFormDate } from '../Hooks/useFormDate';
import React, { useEffect, useState } from 'react'
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
registerLocale("es", es);


export const NuevaFactura = () => {

  //UseStates de los inputs
  const [{ tituloValue }, handleInputChangeTitulo, tituloChanges, reset1] = useForm({
    tituloValue: ''
  });
  const [{ descValue }, handleInputChangeDesc, descChanges, reset2] = useForm({
    descValue: ''
  });

  //UseState para poner disbaled los buttons
  const [btnDisabled, setBtnDisabled] = useState(true);

  //UseState para la fecha del DatePicker
  const fecha = new Date().toLocaleDateString()
  const [{ fechaValue }, handleInputChangeFecha, fechaChanges, reset3] = useFormDate({ fechaValue : fecha });


  const middleTitulo = (e) => {
    checkDisabled();
    handleInputChangeTitulo(e);
  }

  const middleDesc = (e) => {
    checkDisabled();
    handleInputChangeDesc(e)
  }

  const middleFecha = (e) => {
    checkDisabled();
    handleInputChangeFecha(e, 'fechaValue');
  }

  const checkDisabled = () => {
    if ((descValue.length > 1) && (tituloValue.length > 1))
      setBtnDisabled(false);
    else
      setBtnDisabled(true);
  }


  const reset = () => {
    reset1();
    reset2();
    reset3();
    setBtnDisabled(true);
    //setIsSave(true);
    //checkDisabled();
  }


  //Guardar Nueva Factura
  const handleInputGuardar = (e) => {
    // setAnimationStyle('animate__animated animate__fadeIn'); 
    // e.preventDefault();

    // if (descValue.length < 1) {
    //   return;
    // }

    // const newProd = {
    //   titulo: tituloValue,
    //   desc: descValue,
    //   precio: precioValue,
    // }

    // localStorage.setItem('numProd', (productos.length + 1).toString());
    // addProducto(newProd);
    // getProductosData(setProductos);
    // setAlertText('Producto añadido correctamente');
    // setAlerStyle('alert alert-success');
    // eliminarAlerta();
    // reset();
  }


  return (
    <>
      <br></br>
      <br></br>
      <h4>Nueva Factura</h4>
      <hr></hr>


      {/* Titulo, fecha  y descripcion de la factura */}
      <form className='sec-uno-fac'>

        <div className='row'>
          <div className='col-6'>
            <input
              className='form-control'
              placeholder='Título'
              type='text'
              name='tituloValue'
              onChange={middleTitulo}
              value={tituloValue}
            ></input>
          </div>
          <div className='col-4'>
            <DatePicker
              className='form-control '
              name='fechaValue'
              type='text'
              onChange={middleFecha}
              value={fechaValue}
              selected={fechaValue}
              locale="es"
            ></DatePicker>
          </div>


          <div className='col-1'>
            <button
              className='btn btn-outline-primary'
              disabled={btnDisabled}
              onClick={handleInputGuardar}
              type='submit'
            >Guardar</button>
          </div>


          <div className='col-1'>
            <button
              className='btn btn-outline-danger'
              disabled={btnDisabled}
              onClick={reset}
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
              onChange={middleDesc}
              value={descValue}
            ></textarea>
          </div>
        </div>

      </form>

    </>

  )
}
