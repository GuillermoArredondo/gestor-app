import React, { useEffect, useState } from 'react'
import { getProductosData, addProducto, updateProduct, deleteProduct, getTipProductosData, addTipoProducto } from '../firebase/fb_utils'
import { TablaProductos } from './TablaProductos';
import Paginacion from '../ui/paginacion';
import { getTotalPaginas, ITEMS_POR_PAGINA } from '../utils';
import { useForm } from '../Hooks/useForm';
import { CompModal } from '../ui/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { useFormInput } from '../Hooks/useFormInput';
import Form from 'react-bootstrap/Form';


export const Productos = () => {

  //Lista productos
  const [productos, setProductos] = useState([]);

  //Lista de productos que no se muta
  const [productosFijos, setProductosFijos] = useState([]);

  //Lista tipo productos
  const [tipProductos, setTipProductos] = useState([]);

  //UseStates de las paginas
  const [paginaActual, setPaginaActual] = useState(1)

  //UseState para poner disbaled los buttons
  const [btnDisabled, setBtnDisabled] = useState(true);

   //UseState para poner disbaled el button del tipo Guardar
   const [btnTipoDisabled, setBtnTipoDisabled] = useState(true);

  //UseStates de los inputs
  const [{ tituloValue }, handleInputChangeTitulo, tituloChanges, reset1] = useForm({
    tituloValue: ''
  });
  const [{ descValue }, handleInputChangeDesc, descChanges, reset2] = useForm({
    descValue: ''
  });
  const [{ precioValue }, handleInputChangePrecio, precioChanges, reset3] = useForm({
    precioValue: ''
  });

  const [{ tipoValue }, handleInputChangeTipo, tipoChanges, reset5] = useForm({
    tipoValue: ''
  });

  //UseState para el boton Guardar/Editar
  const [isSave, setIsSave] = useState(true);

  //UseState para el modal de editar
  const [showEditar, setShowEditar] = useState(false);
  const handleCloseEditar = () => setShowEditar(false);

  const [showGuardarTipo, setShowGuardarTipo] = useState(false);
  const handleCloseGuardarTipo = () => setShowGuardarTipo(false);

  //States para las alertas
  const [alertText, setAlertText] = useState('');
  const [alertStyle, setAlerStyle] = useState('');
  const [animationStyle, setAnimationStyle] = useState('')


  //UseState para el input de al lado del Dropdown de los tipos de prod
  const [{ prodSelected }, handleInputChangeProd, prodChanges, reset4] = useFormInput({
    prodSelected: ''
  });


  useEffect(() => {
    getProductosData(setProductos);
    getProductosData(setProductosFijos);
    getTipProductosData(setTipProductos);
    localStorage.setItem('numProd', productos.length.toString());
    //console.log('USE EFFECT: ',productos.length);
  }, [])

  //console.log(productos);


  //Variable que da los productos por pagina
  let ProductosPorPagina = productos.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    (paginaActual * ITEMS_POR_PAGINA)
  )


  //Guardar Nuevo producto
  const handleInputGuardar = (e) => {
    setAnimationStyle('animate__animated animate__fadeIn'); 
    e.preventDefault();

    if (descValue.length < 1) {
      return;
    }

    const newProd = {
      titulo: tituloValue,
      desc: descValue,
      precio: precioValue,
    }

    localStorage.setItem('numProd', (productos.length + 1).toString());
    addProducto(newProd);
    getProductosData(setProductos);
    getProductosData(setProductosFijos);
    setAlertText('Producto añadido correctamente');
    setAlerStyle('alert alert-success');
    eliminarAlerta();
    reset();
  }

  //Boton de editar
  const handleInputEditar = (e) => {

    e.preventDefault();

    if (descValue.length < 1) {
      return;
    }

    setShowEditar(true);
  }


  const handleInputGuardarTipo = () => {
    setShowGuardarTipo(true);
  }


  const handleGuardarTipo = () => {
    setAnimationStyle('animate__animated animate__fadeIn'); 
    const tipoProd = { titulo: tipoValue };
    addTipoProducto(tipoProd);
    setShowGuardarTipo(false);
    setAlertText('Tipo de producto añadido correctamente');
    setAlerStyle('alert alert-primary');
    eliminarAlerta();
    reset5();
    getTipProductosData(setTipProductos);
  }


  const handleEditarProd = () => {
    setAnimationStyle('animate__animated animate__fadeIn'); 
    const id = localStorage.getItem('edit');
    const upProd = {
      titulo: tituloValue,
      desc: descValue,
      precio: precioValue,
      id: id
    }
    localStorage.setItem('numProd', (productos.length + 1).toString());
    updateProduct(upProd);
    reset();
    handleCloseEditar();
    getProductosData(setProductos);
    getProductosData(setProductosFijos);
    setAlertText('Producto editado correctamente');
    setAlerStyle('alert alert-primary');
    eliminarAlerta();
  }


  const deleteProd = (handleCloseBorrar) => {
    setAnimationStyle('animate__animated animate__fadeIn'); 
    const id = localStorage.getItem('delete');
    deleteProduct(id);
    reset();
    handleCloseBorrar();
    getProductosData(setProductos);
    getProductosData(setProductosFijos);
    setAlertText('Producto eliminado correctamente');
    setAlerStyle('alert alert-warning');
    eliminarAlerta();
  }


  const eliminarAlerta = () => {
    setTimeout( () => {
      setAnimationStyle('animate__animated animate__fadeOut');     
    }, 5000);
  }



  //Funciones in middle de los handle de los useForm para checkear los disabled de los btns
  const middleTitulo = (e) => {
    checkDisabled();
    handleInputChangeTitulo(e);
  }

  const middleDesc = (e) => {
    checkDisabled();
    handleInputChangeDesc(e)
  }

  const middlePrecio = (e) => {
    checkDisabled();
    if (e.target.value >= 0) {
      handleInputChangePrecio(e);
    }
  }

  const middleTipo = (e) => {
    handleInputChangeTipo(e);
    checkDisabled(e.target.value);
  }

  const checkDisabled = (e) => {

    //console.log(btnDisabled);

    if ((descValue.length > 1) && (tituloValue.length > 1)){
      
      setBtnDisabled(false);
    }
    else{
      
      setBtnDisabled(true);
    }

    if (e != undefined) {
      if (e.length  >= 1)
        setBtnTipoDisabled(false);
      else
        setBtnTipoDisabled(true);
    }
    


    //console.log(btnDisabled);


  }


  const reset = () => {
    reset1();
    reset2();
    reset3();
    setBtnDisabled(true);
    setIsSave(true);
    //checkDisabled();
  }

  const setInFields = (producto) => {
    tituloChanges(document.getElementsByName('tituloValue')[0], producto.titulo);
    descChanges(document.getElementsByName('descValue')[0], producto.desc);
    precioChanges(document.getElementsByName('precioValue')[0], producto.precio);
  }

  const middleProd = async (e) => {
    document.getElementById('prodSelected').value = e.target.name;
    actualizarTabla(e.target.id);
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


  return (
    <>
      <br></br>

      <div className='container'>
        <div className='row'>

          <div className='col-7'>
            <div className='sec-tipos'>
              <InputGroup className="mb-3">
                <DropdownButton
                  variant="outline-secondary"
                  title="Tipo de productos "
                  id="input-group-dropdown-1"
                  disabled={false}
                >
                  {
                    tipProductos && tipProductos.map(tipo =>

                      <Dropdown.Item name={tipo.titulo} id={tipo.id} onClick={middleProd}>
                        <a id={tipo.id} name={tipo.titulo} style={{ color: 'black' }}>{tipo.titulo}</a>
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
          </div>
            
          <div className='col-4'>

            <div style={{ float: 'right' }}>
              <input
                className='form-control'
                placeholder='Tipo de producto'
                type='text'
                name='tipoValue'
                onChange={middleTipo}
                value={tipoValue}
              ></input>

            </div>

            
          </div>

          <div className='col-1'>
          <div style={{ float: 'right' }}>
            <button
                  className='btn btn-outline-primary'
                  disabled={btnTipoDisabled}
                  onClick={handleInputGuardarTipo}
                  type='submit'
                >Guardar</button>
          </div>

          </div>

        </div>
      </div>


      <div className='sec-uno'>
        {/* <br></br>
        <br></br>
        <h4>Productos</h4>
        <hr></hr>
        <br></br> */}
      </div>

      <div className='sec-tabla-productos'>
      <TablaProductos
          productos={ProductosPorPagina}
          setInfields={setInFields}
          setIsSave={setIsSave}
          setBtnDisabled={setBtnDisabled}
          deleteProd={deleteProd}
        >
        </TablaProductos>
      </div>
        
      


      <form className='sec-dos'>

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
            <input
              className='form-control'
              placeholder='Precio'
              type='number'
              name='precioValue'
              onChange={middlePrecio}
              value={precioValue}
            ></input>
          </div>

          {
            isSave ?
              <div className='col-1'>
                <button
                  className='btn btn-outline-primary'
                  disabled={btnDisabled}
                  onClick={handleInputGuardar}
                  type='submit'
                >Guardar</button>
              </div>
              :
              <div className='col-1'>
                <button
                  className='btn btn-outline-primary'
                  disabled={btnDisabled}
                  onClick={handleInputEditar}
                  type='submit'
                >Editar</button>
              </div>
          }


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

      {/* paginacion y alertas */}
      <br></br>
      <div className='row'>

        <div className='col-11' >
          
          {

            alertText != '' 
            
            ?

            <div className={  animationStyle }>
              <div className={ alertStyle } role="alert" hidden= {false} >
                { alertText }
              </div>
            </div>
            
            :

            <div className='animate__animated animate__fadeOut'>
            <div className={ alertStyle } role="alert" hidden= {true} >
              { alertText }
            </div>
            </div>
          }
          
        </div>

        <div className='col-1' >
          <div>
            <Paginacion pagina={paginaActual} total={getTotalPaginas(productos)} onChange={(pagina) => {

              setPaginaActual(pagina)

            }} />
          </div>
        </div>

      </div>




      <CompModal
        show={showEditar}
        handleClose={handleCloseEditar}
        btnAceptar={handleEditarProd}
        btnText={'Editar'}
        style={'primary'}
        name='ModalEditar'
        titulo='Editar producto'
        desc='¿Estás seguro que deseas modificar este producto?'
      ></CompModal>

      <CompModal
        show={showGuardarTipo}
        handleClose={handleCloseGuardarTipo}
        btnAceptar={handleGuardarTipo}
        btnText={'Guardar tipo de producto'}
        style={'primary'}
        name='ModalGuardarTipo'
        titulo='Guardar tipo'
        desc={ `¿Estás seguro que deseas guardar el tipo de producto: "${tipoValue}" ?` }
      ></CompModal>

    </>
  )
}
