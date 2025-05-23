import { useEffect, useState } from "react"
import { getProductsID } from "../services/getProductID"

const useProductID = (id) =>{

    // estado para almacenar el producto que se va a mostrar
    const [productoID, setProductoID] = useState([])
    
    console.log("USEPRODUCT ID", productoID)
    console.log("USEPRODUCTID: ", id)
    // estado de la busqueda
    const [loading, setLoading] = useState(true)

    function obtenerProductoID(){

        setLoading(true)

        getProductsID(id).then( data => {
            // una vez obtenidos los productos indicamos que ya no estamos buscando
            setLoading(false)

            // almaceno los datos en el estado  
            setProductoID(data)
        })
    }

    useEffect(obtenerProductoID, [id])

    return { productoID, loading}

}
export default useProductID
