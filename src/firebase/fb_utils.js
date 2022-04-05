import { collection, getDocs,  query } from 'firebase/firestore';
import { db } from './firebase';


const getProductos = async() => {
    const result = await getDocs(query(collection(db, 'prodcuts')));
    return result;
}

const getProductosData = async ( setItems ) => {
    const i = await getProductos();
    //console.log(i.docs[0].data());
    setItems(i.docs.map( (doc) => ({ 
        titulo: doc.data().titulo,
        desc: doc.data().desc,
        precio: doc.data().precio
      })))
}


export { getProductosData };