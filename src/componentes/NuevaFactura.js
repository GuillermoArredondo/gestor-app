import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useForm } from '../Hooks/useForm';
import { useFormDate } from '../Hooks/useFormDate';
import { useFormInput } from '../Hooks/useFormInput';
import { addFactura } from '../firebase/fb_utils'
import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import { getProductosData } from '../firebase/fb_utils'
import { TablaProductosNF } from './TablaProductosNF';
import { CompModal } from '../ui/Modal';
import { getTotal, getTotalIva, getIva } from '../utils';
registerLocale("es", es);




export const NuevaFactura = () => {

  //Variable para checkear el boton de guardar
  let numTabla = 0;

  //Lista productos para rellenar el combo
  const [productos, setProductos] = useState([]);

  //Lista productos para la tabla
  let [productosTabla, setProductosTabla] = useState([]);

  //UseStates de los inputs
  const [{ tituloValue }, handleInputChangeTitulo, tituloChanges, reset1] = useForm({
    tituloValue: ''
  });
  const [{ descValue }, handleInputChangeDesc, descChanges, reset2] = useForm({
    descValue: ''
  });
  const [{ cantidadValue }, handleInputChangeCantidad, cantidadChanges, reset5] = useForm({
    cantidadValue: ''
  });

  //UseState para el input de al lado del Dropdown
  const [{ prodSelected }, handleInputChangeProd, prodChanges, reset4] = useFormInput({
    prodSelected: ''
  });

  //UseState para poner disbaled los buttons
  const [btnDisabled, setBtnDisabled] = useState(true);

  //UseState para poner disbaled Aniadir producto
  const [btnDisabledAniadir, setBtnDisabledAniadir] = useState(true);

  //UseState para la fecha del DatePicker
  const fecha = new Date()
  const [{ fechaValue }, handleInputChangeFecha, fechaChanges, reset3] = useFormDate({ fechaValue: fecha });

  //UseState para el modal de editar
  const [showGuardar, setShowGuardar] = useState(false);
  const handleCloseGuardar = () => setShowGuardar(false);

  
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

  const middleCantidad = (e) => {
    if(e.target.value >= 0){
      handleInputChangeCantidad(e);
    }
  }

  const middleProd = (e) => {
    //console.log('Seleccionado: ' + e.target.id);
    localStorage.setItem('prodSelec', e.target.id);
    setBtnDisabledAniadir(false);
    document.getElementById('prodSelected').value = e.target.name;
  }


  const checkDisabled = () => {
    if ((descValue.length > 1) && (tituloValue.length > 1) && (numTabla >= 1))
      setBtnDisabled(false);
    else
      setBtnDisabled(true);
  }


  const reset = () => {
    reset1();
    reset2();
    reset3();
    reset4();
    reset5();
    setBtnDisabled(true);
  }

  useEffect(() => {
    getProductosData(setProductos);
  }, [])


  //Añadir producto a la tabla
  const handleInputAniadir = (e) => {
    e.preventDefault();

    const idEncontrado = localStorage.getItem('prodSelec');
    const found = productos.find( prod => prod.id == idEncontrado);

    if ( (cantidadValue > 0) && sePuedeAniadir(found))
    {
      
      const precioTotal = cantidadValue * found.precio;
  
      const newProd = [...productosTabla,{
        id : found.id,
        titulo: found.titulo,
        desc: found.desc,
        cantidad: cantidadValue,
        precio: found.precio,
        precioTotal : precioTotal
      }]
  
      //setProductosTabla(newProd);
      setProductosTabla(prevProductos => ([...newProd]));
      numTabla++;
      checkDisabled();
    }else
    {
      document.getElementById('inputCantidad').focus();
    }

  }

  const sePuedeAniadir = (prod) => {
    let ok = true;
    productosTabla.forEach(producto => {
      if (producto.id == prod.id){
        ok = false;
      }
    });
    return ok;
  }

  //Eliminar un producto de la tabla
  const deleteProdTabla = (found) => {
    removeItemFromArr(productosTabla, found);
    setProductosTabla(prevProductos => ([...productosTabla]));
    numTabla--;
    checkDisabled();
  }

  function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
  }

  //Guardar Nueva Factura
  const handleGuardarFactura = () => {

    const nuevaFactura = {
        titulo: tituloValue,
        desc: descValue,
        fecha: fechaValue,
        total: getTotal(productosTabla),
        iva: getIva(productosTabla),
        totalIva: getTotalIva(productosTabla),
        productos: getIdsProductos(),
        cantidades: getCantidades()
    }

    addFactura(nuevaFactura);
  }

  const getIdsProductos = () => {
    const ids = [];
    productosTabla.forEach(producto => {
      ids.push(producto.id);
    });
    return ids;
  }

  const getCantidades = () => {
    const cantidades = [];
    productosTabla.forEach(producto => {
      cantidades.push(producto.cantidad);
    });
    return cantidades;
  }

  const handleInputGuardar = (e) => {

    e.preventDefault();
    setShowGuardar(true);

    // setAnimationStyle('animate__animated animate__fadeIn'); 
    // e.preventDefault();

    // if (descValue.length < 1) {
    //   return;
    // }

    // const newProd = {
    //   titulo: tituloValue,
    //   desc: descValue,
    //   precio: cantidadValue,
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
              dateFormat="dd-MM-yyyy"
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

        <br></br>

        {/* Productos y boton de añadir */}
        <div className='row'>
          <div className='col-9'>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Productos "
                id="input-group-dropdown-1"
              >
                {
                  productos && productos.map( producto => 
                    
                      producto.desc.length <= 80 ?
                      <Dropdown.Item name={producto.titulo} onClick={middleProd}>
                          <a id={producto.id} name={ `${producto.titulo}   -   ${producto.desc}   -   ${producto.precio} ` }  style={{color:'black'}}>{producto.titulo} &nbsp; &middot; &nbsp;  </a>
                          <a id={producto.id} name={ `${producto.titulo}   -   ${producto.desc}   -   ${producto.precio} ` }  style={{color:"grey"}}>{producto.desc}</a>
                      </Dropdown.Item>
                      :
                      <Dropdown.Item id={producto.id} name={producto.titulo} onClick={middleProd}>
                          <a id={producto.id} name={ `${producto.titulo}   -   ${producto.desc.substring(0,80) + ' ...'}   -   ${producto.precio} ` }  style={{color:'black'}}>{producto.titulo}  &nbsp; &middot; &nbsp;   </a>
                          <a id={producto.id} name={ `${producto.titulo}   -   ${producto.desc.substring(0,80) + ' ...'}   -   ${producto.precio} ` }  style={{color:"grey"}}>{producto.desc.substring(0,80) + ' ...'}</a>
                      </Dropdown.Item>
                    

                  )
                }

              </DropdownButton>
              <Form.Control 
                disabled aria-label="Text input with dropdown button"
                id='prodSelected'
                />
            </InputGroup>
          </div>

          <div className='col-2'>
          <input
              id='inputCantidad'
              className='form-control'
              placeholder='Cantidad'
              type='number'
              name='cantidadValue'
              onChange={middleCantidad}
              value={cantidadValue}
            ></input>
          </div>

          <div className='col-1'>
            <button
                className='btn btn-outline-primary'
                disabled={btnDisabledAniadir}
                onClick={handleInputAniadir}
              >Añadir</button>
          </div>
        </div>


        {/* Tabla con los productos que se añaden */}
        <TablaProductosNF
          id='tablaProd'
          productos={productosTabla}
          deleteProdTabla={deleteProdTabla}
          >
        </TablaProductosNF>


      </form>

      <CompModal
                show={ showGuardar }
                handleClose={ handleCloseGuardar }
                btnAceptar={ handleGuardarFactura }
                btnText={ 'Guardar' }
                style={ 'primary' }
                name='ModalGuardar'
                titulo='Guardar factura'
                desc='¿Estás seguro que deseas guardar esta factura?'
        ></CompModal>

    </>

  )
}
