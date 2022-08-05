import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useForm } from '../Hooks/useForm';
import { useFormArray } from '../Hooks/useFormArray';
import { useFormDate } from '../Hooks/useFormDate';
import { useFormInput } from '../Hooks/useFormInput';
import { addFactura, getFactura, getProductosData2, updateFactura } from '../firebase/fb_utils'
import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import { getProductosData } from '../firebase/fb_utils'
import { TablaProductosNF } from './TablaProductosNF';
import { CompModal } from '../ui/Modal';
import { getTotal, getTotalIva, getIva } from '../utils';
import { generarWord } from '../utilsDocx';
import { useNavigate } from 'react-router-dom';
registerLocale("es", es);




export const ConsultarFactura = () => {

  let prodAux = [];

  const navigate = useNavigate();

  //UseState para poner disbaled los buttons
  const [modoEdit, setmModoEdit] = useState(true);

  //state para la factura que consultar
  const [facturaConsulta, setFacturaConsulta] = useState({});

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

  //UseState para el modal de Elegir acción
  const [showElegir, setShowElegir] = useState(false);
  const handleCloseElegir = () => setShowElegir(false);

  //States para las alertas
  const [alertText, setAlertText] = useState('');
  const [alertStyle, setAlerStyle] = useState('');
  const [animationStyle, setAnimationStyle] = useState('')

  //getProductosData(setProductos);
  useEffect(() => {
    
    llamarMetodos();

  }, [])

  const llamarMetodos = async() => {
    getProductosData(setProductos);
    prodAux = await getProductosData2();
    getFactura(localStorage.getItem('factura'), setFacturaConsulta, setInFields);
  }

  
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
    if ((descValue.length > 1) && (tituloValue.length > 1))
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

  //Metodo para setear los datos de la factura
  const setInFields = ( factura ) => {
    tituloChanges(document.getElementsByName('tituloValue')[0], factura.titulo);
    descChanges(document.getElementsByName('descValue')[0], factura.desc);
    fechaChanges(document.getElementsByName('fechaValue')[0], getNuevaFechaFormat(factura.fecha));
    setProductosTabla(selectProds(factura.productos, factura.cantidades));  
  }

  const selectProds = (listaIds, listaCantidades) => {
    const productosFromFactura = [];

    for (let index = 0; index < listaIds.length; index++) {
      let found = prodAux.find(prod => prod.id == listaIds[index]);
      if(found != undefined)
      {
        const precioTotal = listaCantidades[index] * found.precio;
        const newProd = {
          id: found.id,
          titulo: found.titulo,
          desc: found.desc,
          cantidad: listaCantidades[index],
          precio: found.precio,
          precioTotal: precioTotal
        };
      productosFromFactura.push(newProd);
      }
    }
    if (productosFromFactura.length == 0){
      console.log('está vacío');
    }
    return productosFromFactura;
  } 


  const getNuevaFechaFormat = ( fecha ) => {
    const newFecha = new Date();

    if (fecha.substring(0,1) == '0')
    {
      newFecha.setDate(fecha.substring(1,2));
    }else
    {
      newFecha.setDate(fecha.substring(0,2));
    }

    if (fecha.substring(3,4) == '0')
    {
      let month = parseInt(fecha.substring(4,5));
      month--
      newFecha.setMonth(month);
    }else
    {
      let month = parseInt(fecha.substring(3,5));
      month--
      newFecha.setMonth(month);
    }

    newFecha.setFullYear(fecha.substring(6,10));
    return newFecha;

  }


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

  //Añadir producto a la tabla que viene de la factura
  // const aniadirDesdeFactura = (id, cantidad) => {
  //   console.log('aniadir: ', id,cantidad);
  //   let found = productos.find(prod => prod.id == id);
  //   console.log('found: ', found);
  //   const precioTotal = cantidad * found.precio;
  //   const newProd = [...productosTabla, {
  //     id: found.id,
  //     titulo: found.titulo,
  //     desc: found.desc,
  //     cantidad: cantidad,
  //     precio: found.precio,
  //     precioTotal: precioTotal
  //   }];
  //   setProductosTabla(prevProductos => ([...newProd]));
  //   numTabla++;

  // }

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

  const handleConsultarFactura = () => {
    setShowElegir(false);
    setmModoEdit(true);
  }

  //Editar Nueva Factura
  const handleEditarFacturaNext = () => {
    
    const nuevaFactura = {
        titulo: tituloValue,
        desc: descValue,
        fecha: getFechaFormat(),
        total: getTotal(productosTabla),
        iva: getIva(productosTabla),
        totalIva: getTotalIva(productosTabla),
        productos: getIdsProductos(),
        cantidades: getCantidades(),
        id: localStorage.getItem('factura')
    }

    //addFactura(nuevaFactura);
    setFacturaConsulta(prevProductos => ({...nuevaFactura}));
    updateFactura(nuevaFactura);
    setShowGuardar(false);

    setShowElegir(true);
  }

  const getFechaFormat = () => {
    const elFecha = document.getElementById('inputFecha');
    return elFecha.value;
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

  const handleInputEditar = (e) => {
    e.preventDefault();
    setShowGuardar(true);
  }

  const handleEditarFactura = () => {
    setmModoEdit(false);
    setBtnDisabled(false);
  }

  const handleGenerarWord = () => {
    console.log('productosTabla: ', productosTabla);
    generarWord(facturaConsulta, productosTabla);
  }


  return (
    <>
      <br></br>
      <br></br>
      <div className='container'>
        <div className='row'>
          <div className='col-8'>
            <h4>Consultar factura</h4>
          </div>
          <div className='col-4 '>
            <div style={{float: 'right'}}>
              <button
                className='btn btn-primary'
                onClick={handleEditarFactura}
                type='submit'
                style={{marginRight: '8px'}}
              >Editar factura</button>
              <button
                className='btn btn-primary'
                onClick={handleGenerarWord}
                type='submit'
              >Generar Word</button>
            </div>
            
          </div>
          {/* <div className='col-2'>
            
          </div> */}
        </div>
      </div>
      
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
              disabled={modoEdit}
            ></input>
          </div>
          <div className='col-4'>
            <DatePicker
              id='inputFecha'
              dateFormat="dd-MM-yyyy"
              className='form-control '
              name='fechaValue'
              type='text'
              onChange={middleFecha}
              value={fechaValue}
              selected={fechaValue}
              locale="es"
              disabled={modoEdit}
            ></DatePicker>
          </div>


          <div className='col-1'>
            <button
              className='btn btn-outline-primary'
              disabled={btnDisabled}
              onClick={handleInputEditar}
              type='submit'
            >Editar</button>
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
              disabled={modoEdit}
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
                disabled={modoEdit}
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
              disabled={modoEdit}
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
          alertText={alertText}
          animationStyle={animationStyle}
          alertStyle={alertStyle}
          modoEdit={modoEdit}
          >
        </TablaProductosNF>


      </form>

      <CompModal
                show={ showGuardar }
                handleClose={ handleCloseGuardar }
                btnAceptar={ handleEditarFacturaNext }
                btnText={ 'Editar' }
                style={ 'primary' }
                name='ModalGuardar'
                titulo='Editar factura'
                desc='¿Estás seguro que deseas editar esta factura?'
                alert={false}
        ></CompModal>


      <CompModal
                show={ showElegir }
                handleClose={ handleCloseElegir }
                btnAceptar={ handleConsultarFactura }
                btnText={ 'Consultar Factura' }
                style={ 'primary' }
                name='ModalGuardar'
                titulo='Elegir acción'
                desc='La factura se editó correctamente'
                alert={true}
        ></CompModal>

    </>

  )
}
