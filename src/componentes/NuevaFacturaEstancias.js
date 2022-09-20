import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useForm } from '../Hooks/useForm';
import { useFormDate } from '../Hooks/useFormDate';
import { useFormInput } from '../Hooks/useFormInput';
import { addFactura, getTipProductosData } from '../firebase/fb_utils'
import React, { useEffect, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import { getProductosData } from '../firebase/fb_utils'
import { TablaProductosNFEstancias } from './TablaProductosNFEstancias';
import { CompModal } from '../ui/Modal';
import { getTotal, getTotalIva, getIva } from '../utils';
import { useNavigate } from 'react-router-dom';
registerLocale("es", es);




export const NuevaFacturaEstancias = () => {

  //Variable para checkear el boton de guardar
  let numTabla = 0;

  //Lista productos para rellenar el combo
  const [productos, setProductos] = useState([]);

  //Lista de estancias para rellenar el combo
  const [estancias, setEstancias] = useState([]);

  //Lista de productos que no se muta
  const [productosFijos, setProductosFijos] = useState([]);

  //Lista tipo productos
  const [tipProductos, setTipProductos] = useState([]);

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
  const [{ IVAValue }, handleInputChangeIVA, IVAChanges, reset6] = useForm({
    IVAValue: '21'
  });

  //UseState para el input de al lado del Dropdown
  const [{ prodSelected }, handleInputChangeProd, prodChanges, reset4] = useFormInput({
    prodSelected: ''
  });
  const [{ estanciaValue }, handleInputChangeEstancia, estanciaChanges, reset7] = useForm({
    estanciaValue: ''
  });

  //UseState para poner disbaled los buttons
  const [btnDisabled, setBtnDisabled] = useState(true);

  //UseState para poner disbaled Aniadir producto
  const [btnDisabledAniadir, setBtnDisabledAniadir] = useState(true);

  //UseState para poner disbaled Aniadir estancias
  const [btnDisabledAniadirEstancia, setBtnDisabledAniadirEstancia] = useState(true);

  //UseState para poner disbaled Aniadir estancias
  const [btnDisabledEliminarEstancia, setBtnDisabledEliminarEstancia] = useState(true);

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

  const eliminarAlerta = () => {
    setTimeout( () => {
      setAnimationStyle('animate__animated animate__fadeOut');
      setTimeout( () => {
        darFormatoDiv();     
      }, 200);    
    }, 5000);
  }

  const darFormatoDiv = () => {
    const e = document.getElementById('divAlertas');
    e.remove();
    const e2 = document.getElementById('alertas2');
    e2.style.marginLeft = '810px';
    const e3 = document.getElementById('alertas3');
    e2.style.marginRight = '23px';
  }

  const middleIVA = (e) => {
    if(e.target.value >= 0){
      handleInputChangeIVA(e);
    }
  }

  const middleEstancia = (e) => {
    if (e.target.value.length >= 1){
      setBtnDisabledAniadirEstancia(false);
    }else{
      setBtnDisabledAniadirEstancia(true);
    }
    handleInputChangeEstancia(e);
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
    //checkDisabled();
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


  const middleTipProd = (e) => {
    document.getElementById('tipProdSelected').value = e.target.name;
    actualizarTabla(e.target.id);
    localStorage.setItem('tipoSelected', e.target.id);
  }

  const getListaIdsProds = () => {
    const listaIds = [];
    productosFijos.forEach(prod => {
      listaIds.push(prod.id);
    });
    return listaIds;
  }

  const actualizarTabla = (idTipo) => {
    const listaIds = getListaIdsProds();
    const found = tipProductos.find(prod => prod.id == idTipo);
    const prodsDelTipo = [];
    console.log('found: ', found);
    console.log('listaIds: ', listaIds);
    found.prods.forEach(id => {
      if (listaIds.includes(id)){
          const foundProd = productosFijos.find(prod => prod.id == id);
          prodsDelTipo.push(foundProd);
      }
    });

    console.log('prodsDelTipo: ', prodsDelTipo);
    setProductos(prodsDelTipo);
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
    getTipProductosData(setTipProductos);
    getProductosData(setProductosFijos);
  }, [])


  //Añadir producto a la tabla
  const handleInputAniadir = async (e) => {
    e.preventDefault();

    const idEncontrado = localStorage.getItem('prodSelec');
    const found = productos.find(prod => prod.id == idEncontrado);

    if (document.getElementById('estanciaSelected').value.length > 0) {
      if ((cantidadValue > 0) && sePuedeAniadir(found)) {

        const precioTotal = cantidadValue * found.precio;

        const newProd = [...productosTabla, {
          id: found.id,
          titulo: found.titulo,
          desc: found.desc,
          cantidad: cantidadValue,
          precio: found.precio,
          precioTotal: precioTotal,
          estancia: getEstanciaById(localStorage.getItem('estanciaSelected')),
          orden: getEstanciaByIdTitulo(localStorage.getItem('estanciaSelected'))

        }]

        newProd.sort(dynamicSort('orden'));
        setProductosTabla(prevProductos => ([...newProd]));
        numTabla++;
        checkDisabled();

      } else {
        document.getElementById('inputCantidad').focus();
      }
    }else{
      console.log('estanciaSelected', document.getElementById('estanciaSelected').value.length);
      document.getElementById('drop-est').focus();
    }



  }

  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  const ordenar = () => {
    productosTabla.sort(dynamicSort('orden'));
    console.log('orden', productosTabla);
    setProductosTabla(prevProductos => ([...productosTabla]));
  }

  const getEstanciaById = (idEst) => {
    return estancias.find( estancia => estancia.id == idEst );
  }

  const getEstanciaByIdTitulo = (idEst) => {
    const found =  estancias.find( estancia => estancia.id == idEst );
    return found.titulo;
  }

  const sePuedeAniadir = (prod) => {
    let ok = true;
    productosTabla.forEach(producto => {
      if (producto.id == prod.id){
        ok = false;
      }
    });
    console.log('sePuedeAniadir', ok);
    return ok;
  }

  const sePuedeAniadirPorEstancia = (prod) => {
    let ok = true;
    const idEst = localStorage.getItem('estanciaSelected');
    productosTabla.forEach(producto => {

      if (prod.estancia.id == idEst) {
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
  const navigate = useNavigate();
  
  const handleConsultarFactura = () => {
    navigate('/ConsultarFactura', {
      replace: true
    });
  }

  //Guardar Nueva Factura
  const handleGuardarFactura = () => {
    
    const nuevaFactura = {
        titulo: tituloValue,
        desc: descValue,
        fecha: getFechaFormat(),
        total: getTotal(productosTabla),
        iva: getIva(productosTabla, parseInt(IVAValue)),
        totalIva: getTotalIva(productosTabla, parseInt(IVAValue)),
        productos: getIdsProductos(),
        cantidades: getCantidades(),
        IVAValue: IVAValue
    }

    addFactura(nuevaFactura);
    setShowGuardar(false);

    setShowElegir(true);
    // setAnimationStyle('animate__animated animate__fadeIn'); 
    // setAlertText('Factura guardada correctamente');
    // setAlerStyle('alert alert-success');
    // eliminarAlerta();
  }


  const handleInputGuardarEstancia = (e) => {
    e.preventDefault();
    const nweEst = [...estancias, { 
      id: uuidv4(), 
      titulo: estanciaValue 
    }];
    setEstancias(prev => ([...nweEst]));
    reset7();
    setBtnDisabledAniadirEstancia(true);
  }

  const handleInputEliminarEstancia = (e) => {
    e.preventDefault();
    const idEstancia = localStorage.getItem('estanciaSelected');
    const found = estancias.find(est => est.id == idEstancia);
    removeItemFromArr(estancias, found);
    setEstancias(prev => ([...estancias]));
    document.getElementById('estanciaSelected').value = '';
    eliminarProdsEstancia(idEstancia);
    eliminarProdsEstancia(idEstancia);
  }

  function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
  }

  const eliminarProdsEstancia = (idEstancia) => {
    console.log('eliminarProdsEstancia 1 ', productosTabla);
    productosTabla.forEach(prod => {
      if (prod.estancia.id == idEstancia) {
        removeItemFromArr(productosTabla, prod);
      }
    });
    setProductosTabla(prev => ([...productosTabla]));
    console.log('eliminarProdsEstancia 2 ', productosTabla);
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
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

  const handleInputGuardar = (e) => {
    e.preventDefault();
    setShowGuardar(true);
  }

  const middleEstancias = (e) => {
    localStorage.setItem('estanciaSelected', e.target.id);
    document.getElementById('estanciaSelected').value = e.target.name;
    setBtnDisabledEliminarEstancia(false);
  }


  return (
    <>
      <br></br>
      <br></br>
      <h4>Nueva Factura por estancias</h4>
      <hr></hr>

      {/* Titulo, fecha  y descripcion de la factura */}
      <form className='sec-uno-fac'>

        <div className='row'>
          <div className='col-5'>
            <input
              className='form-control'
              placeholder='Título'
              type='text'
              name='tituloValue'
              onChange={middleTitulo}
              value={tituloValue}
            ></input>
          </div>

          <div className='col-1'>
            <p style={{paddingLeft: '60px', paddingTop: '7px'}}>
              <b>IVA:</b>
            </p>
            
          </div>

          <div className='col-2'>
            <input
              id='inputIVA'
              className='form-control'
              placeholder=''
              type='number'
              name='IVAValue'
              onChange={middleIVA}
              value={IVAValue}
            ></input>
          </div>

          <div className='col-2'>
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
            ></DatePicker>
          </div>


          <div className='col-1'>
            <button
              className='btn btn-primary'
              disabled={btnDisabled}
              onClick={handleInputGuardar}
              type='submit'
            >Guardar</button>
          </div>


          <div className='col-1'>
            <button
              className='btn btn-danger'
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

        {/* Gestión de estancias */}
        <div className='row'>

          <div className='col-4'>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Estancias"
                id="drop-est"
              >
                {
                  estancias && estancias.map(est =>

                    <Dropdown.Item name={est.titulo} id={est.id} onClick={middleEstancias}>
                      <a id={est.id} name={est.titulo} style={{ color: 'black' }}>{est.titulo}</a>
                    </Dropdown.Item>

                  )
                }

              </DropdownButton>
              <Form.Control
                disabled aria-label="Text input with dropdown button"
                id='estanciaSelected'
              />
            </InputGroup>
          </div>

          <div className='col-4'>
            <input
              className='form-control'
              placeholder='Estancia'
              type='text'
              name='estanciaValue'
              onChange={middleEstancia}
              value={estanciaValue}
            ></input>
          </div>

          <div className='col-2' style={{flexDirection: 'column', display: 'flex'}}>
            <button
              className='btn btn-outline-primary'
              disabled={btnDisabledAniadirEstancia}
              onClick={handleInputGuardarEstancia}
              type='submit'
            >Añadir estancia</button>
          </div>


          <div className='col-2' style={{flexDirection: 'column', display: 'flex'}}>
            <button
              className='btn btn-outline-danger'
              disabled={btnDisabledEliminarEstancia}
              onClick={handleInputEliminarEstancia}
              type='reset'
            >Borrar estancia</button>
          </div>

        </div>

        {/* Productos y boton de añadir */}
        <div className='row'>
          
          {/* Dropdown de los tipos */}
          <div className='col-3'>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Tipo de productos "
                id="input-group-dropdown-1"
              >
                {
                  tipProductos && tipProductos.map(tipo =>

                    <Dropdown.Item name={tipo.titulo} id={tipo.id} onClick={middleTipProd}>
                      <a id={tipo.id} name={tipo.titulo} style={{ color: 'black' }}>{tipo.titulo}</a>
                    </Dropdown.Item>

                  )
                }

              </DropdownButton>
              <Form.Control
                disabled aria-label="Text input with dropdown button"
                id='tipProdSelected'
              />
            </InputGroup>
          </div>
          


          {/* Dropdown de los productos */}
          <div className='col-6'>
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
        <TablaProductosNFEstancias
          id='tablaProd'
          productos={productosTabla}
          deleteProdTabla={deleteProdTabla}
          alertText={alertText}
          animationStyle={animationStyle}
          alertStyle={alertStyle}
          IVA={IVAValue}
          ordenar={ordenar}
          >
        </TablaProductosNFEstancias>


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
                desc='La factura se guardo correctamente'
                alert={true}
        ></CompModal>

    </>

  )
}
