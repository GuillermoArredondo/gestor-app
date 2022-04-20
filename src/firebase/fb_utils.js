import { collection, getDocs,  query, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import { db } from './firebase';


const getProductos = async() => {
    const result = await getDocs(query(collection(db, 'prodcuts')));
    return result;
}

export const getProductosData = async ( setItems ) => {
    const i = await getProductos();
    //console.log(i.docs[0].data());
    setItems(i.docs.map( (doc) => ({ 
        titulo: doc.data().titulo,
        desc: doc.data().desc,
        precio: doc.data().precio,
        id: doc.id
      })))
}


export const addProducto = ( producto ) => {
    const newID = localStorage.getItem('numProd');
    addDoc(collection(db, 'prodcuts'), { 
        titulo: producto.titulo,
        desc: producto.desc,
        precio: producto.precio,
        id: newID
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


export const deleteProduct = async( id ) => {
    await deleteDoc(doc(db, 'prodcuts', id));
}




