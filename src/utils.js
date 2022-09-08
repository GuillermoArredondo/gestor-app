const ITEMS_POR_PAGINA = 5

//Metodo para calcular el numero total de paginas a partir de los items
const getTotalPaginas = ( items ) => {
    let cantidadTotalItems = items.length
    return Math.ceil(cantidadTotalItems / ITEMS_POR_PAGINA)
}

const getTotal = (productos) => {
    let total = 0;
    productos && productos.map( producto => 
        total = total + (producto.precio * producto.cantidad)
    )
    return total.toFixed(2);
}

const getIva = (productos, IVA) => {
    const ivaFort = IVA / 100;
    const iva = getTotal(productos) * ivaFort;
    return iva.toFixed(2);
}

const getTotalIva = (productos, IVA) => {
    const totalIva = parseInt(getTotal(productos)) + parseInt(getIva(productos, IVA));
    return totalIva.toFixed(2);
}


module.exports = { 
    getTotalPaginas: getTotalPaginas,
    getTotal: getTotal,
    getIva: getIva,
    getTotalIva: getTotalIva,
    ITEMS_POR_PAGINA: ITEMS_POR_PAGINA 
};