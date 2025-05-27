// SERVICIOS
import { useState, useEffect } from 'react';
import { getProducts } from '../services/getProducts';

const useProducts = () =>{

    // estado para almacenar los productos y el estado de carga
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    // console.log("useProducts hook", productos)

    function obtenerProductos(){
        // buscando los productos
        setLoading(true);

        getProducts().then( data => {
            
            setProductos(data)
            // dejamos de buscar productos 
            setLoading(false)
        })
    }

    useEffect(obtenerProductos, [])

    return{productos, loading}
}
export default useProducts;