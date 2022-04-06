

const ITEMS_POR_PAGINA = 2

//Metodo para calcular el numero total de paginas a partir de los items
const getTotalPaginas = ( items ) => {
    let cantidadTotalItems = items.length
    return Math.ceil(cantidadTotalItems / ITEMS_POR_PAGINA)
}


module.exports = { 
    getTotalPaginas: getTotalPaginas,
    ITEMS_POR_PAGINA: ITEMS_POR_PAGINA 
};