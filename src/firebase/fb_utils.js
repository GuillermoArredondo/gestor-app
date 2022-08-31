import { collection, getDocs,  query, addDoc, updateDoc, doc, deleteDoc, getDoc} from 'firebase/firestore';
import { db } from './firebase';


const getProductos = async() => {
    const result = await getDocs(query(collection(db, 'prodcuts')));
    return result;
}

export const getProductosData = async ( setItems ) => {
    const i = await getProductos();
    //console.log('productos: ', i.docs[0].data());
    setItems(i.docs.map( (doc) => ({ 
        titulo: doc.data().titulo,
        desc: doc.data().desc,
        precio: doc.data().precio,
        id: doc.id
      })))
}

export const getProductosData2 = async () => {
    const i = await getProductos();
    const productos = [];
    //console.log('productos: ', i.docs[0].data());
    // setItems(i.docs.map((doc) => ({
    //     titulo: doc.data().titulo,
    //     desc: doc.data().desc,
    //     precio: doc.data().precio,
    //     id: doc.id
    // })))

    i.forEach(producto => {
        let p = {
            titulo: producto.data().titulo,
            desc: producto.data().desc,
            precio: producto.data().precio,
            id: producto.id
        }
        productos.push(p);
    });

    return productos;
}


const getTipProductos = async() => {
    const result = await getDocs(query(collection(db, 'tipoProductos')));
    return result;
}

export const getTipProductosData = async ( setItems ) => {
    const i = await getTipProductos();
    //console.log('productos: ', i.docs[0].data());
    setItems(i.docs.map( (doc) => ({ 
        titulo: doc.data().titulo,
        prods: doc.data().prods,
        id: doc.id
      })))
}


export const addProducto = async ( producto ) => {
    const newID = localStorage.getItem('numProd');
    const nProd = await addDoc(collection(db, 'prodcuts'), { 
        titulo: producto.titulo,
        desc: producto.desc,
        precio: producto.precio,
        id: newID
    });
    return nProd.id;
}

export const updateTipoProducto = async (newId, tipoProductos) => {
    //Se mete el id del nuevo producto en la lista del tipo
    const idTipo = localStorage.getItem('tipoSelected');
    const prodSelected = tipoProductos.find(prod => prod.id == idTipo);
    prodSelected.prods.push(newId);
    await updateDoc(doc(db, 'tipoProductos', idTipo),  { 
        prods: prodSelected.prods
     } );
    
     //Se mete tambien en la lista de todos
    const idTodos = 'QX5jkBAQ6YggCXXxTySD';
    const prodTodos = tipoProductos.find(prod => prod.id == idTodos);
    prodTodos.prods.push(newId);
     await updateDoc(doc(db, 'tipoProductos', idTodos),  { 
        prods: prodTodos.prods
     } );
}


export const addTipoProducto = ( tipoProd ) => {
    //const newID = localStorage.getItem('numProd');
    addDoc(collection(db, 'tipoProductos'), { 
        titulo: tipoProd.titulo,
        prods: []
    });
}


export const updateProduct = async( producto ) => {
    const newID = localStorage.getItem('numProd');
    console.log( 'updateProduct: ',producto.id )
    await updateDoc(doc(db, 'prodcuts', producto.id),  { 
        titulo: producto.titulo,
        desc: producto.desc,
        precio: producto.precio,
        id: newID
     } );
}


export const deleteProduct = async( id, tipoProductos ) => {
    await deleteDoc(doc(db, 'prodcuts', id));

    if (tipoProductos != undefined) {
        const idTipo = localStorage.getItem('tipoSelected');
        const prodSelected = tipoProductos.find(prod => prod.id == idTipo);

        //Para el tipo especifico
        const nuevosProds = prodSelected.prods.filter((item) => item !== id);
        await updateDoc(doc(db, 'tipoProductos', idTipo), {
            prods: nuevosProds
        });

        //Para el tipo TODOS
        const idTodos = 'QX5jkBAQ6YggCXXxTySD';
        const prodTodos = tipoProductos.find(prod => prod.id == idTodos);
        const nuevosProdsTodos = prodTodos.prods.filter((item) => item !== id);
        await updateDoc(doc(db, 'tipoProductos', idTodos), {
            prods: nuevosProdsTodos
        });
    }
}


export const deleteTipo = async ( tipo ) => {

    console.log('deleteTipo: ', tipo);

    await deleteDoc(doc(db, 'tipoProductos', tipo.id));

    tipo.prods.forEach(prod => {
         deleteProduct(prod);
      });

}


const getFacturas = async() => {
    const result = await getDocs(query(collection(db, 'facturas')));
    return result;
}

export const getFacturasData = async ( setItems ) => {
    const i = await getFacturas();
    setItems(i.docs.map( (doc) => ({ 
        cantidades: doc.data().cantidades,
        desc: doc.data().desc,
        titulo: doc.data().titulo,
        fecha: doc.data().fecha,
        iva: doc.data().iva,
        productos: doc.data().productos,
        titulo: doc.data().titulo,
        total: doc.data().total,
        totalIva: doc.data().totalIva,
        id: doc.id
      })))
}


export const addFactura = ( factura ) => {
    addDoc(collection(db, 'facturas'), { 
        titulo: factura.titulo,
        desc: factura.desc,
        fecha: factura.fecha,
        total: factura.total,
        iva: factura.iva,
        totalIva: factura.totalIva,
        productos: factura.productos,
        cantidades: factura.cantidades
    });
}

export const getFactura = async( idFactura, setItem, setInFields ) => {
    const docRef = doc(db, 'facturas', idFactura);
    const docSnap = await getDoc(docRef);
    let factura;
    if (docSnap.exists()) {
        factura = {
            titulo: docSnap.data().titulo,
            desc: docSnap.data().desc,
            fecha: docSnap.data().fecha,
            total: docSnap.data().total,
            iva: docSnap.data().iva,
            totalIva: docSnap.data().totalIva,
            productos: docSnap.data().productos,
            cantidades: docSnap.data().cantidades,
            id: docSnap.id
        }
        console.log('getFactura: ', factura)
        setItem(prevfactura => ({...factura}));

        setInFields( factura );

      } else {
        console.log("No such document!");
      }
}


export const getFactura2 = async( idFactura ) => {
    const docRef = doc(db, 'facturas', idFactura);
    const docSnap = await getDoc(docRef);
    let factura;
    if (docSnap.exists()) {
        factura = {
            titulo: docSnap.data().titulo,
            desc: docSnap.data().desc,
            fecha: docSnap.data().fecha,
            total: docSnap.data().total,
            iva: docSnap.data().iva,
            totalIva: docSnap.data().totalIva,
            productos: docSnap.data().productos,
            cantidades: docSnap.data().cantidades,
            id: docSnap.id
        }
        console.log('getFactura: ', factura)
        
        return factura;

      } else {
        console.log("No such document!");
      }
}

export const updateFactura = async( factura ) => {
    console.log()
    await updateDoc(doc(db, 'facturas', factura.id),  factura );
}



