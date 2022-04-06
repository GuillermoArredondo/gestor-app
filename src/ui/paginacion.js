import { Pagination } from "react-bootstrap";


export default function paginacion(props) {

    const getPaginas = () => {
        const resultado =  [];
        for (let index = 0; index < props.total; index++) {
            let pagina = index + 1
            resultado.push(
            // <a 
            // onClick={() => props.onChange(pagina)} 
            // className={props.pagina === pagina ? 'active' : ''}>
            // {pagina}
            // </a>
            <Pagination.Item 
                key={pagina} 
                active={props.pagina === pagina ? 'active' : ''}
                onClick={() => props.onChange(pagina)} 
                >
                {pagina}
            </Pagination.Item>,
            )
        }
        return resultado;
    }



    return (
        // <div className="topbar-filter">
        //     <label>Productos:</label>
            
        //     <div className="pagination2">
        //         <span>Pagina {props.pagina} de {props.total}:</span>

        //         {getPaginas()}
                
        //     </div>
        // </div>
        <Pagination>{ getPaginas() }</Pagination>
    )
}

