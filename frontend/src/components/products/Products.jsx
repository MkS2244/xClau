/* import fotoPrueba from '../../assets/Logo.webp' */
// ---------------
// CUSTOM HOOKS
// ---------------
import useProducts from "../../hooks/useProducts";

// ---------------
// SERVICIOS
// ---------------
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// ---------------
// COMPONENTES
// ---------------
import ProductCard from "../card productos/productCard";
import Spinner from "../spinner/Spinner";

// ------------
// React-Bootstrap
// ------------
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CardGroup from 'react-bootstrap/CardGroup';


const Products = () => {

    // Utilizamos el custom hook `useProducts` para obtener los productos 
    const { productos, loading } = useProducts()

    // Estado para manejar los favoritos
    const [fav, setFav] = useState([])

    function manejarFavoritos() {
        const favGuardados = JSON.parse(localStorage.getItem('favoritos')) || []

        setFav(favGuardados)
    }

    // se ejecuta la función manejarFavoritos al cargar la página
    useEffect(manejarFavoritos, [])


    function eliminarFav(productoID) {
        // filtro los favoritos para que no se muestre el producto eliminado
        return fav.filter(favorito => favorito !== productoID)
    }

    function añadirFav(productoID) {
        let favoritos = [...fav, productoID]
        // agrego el producto a la lista de favoritos

        return favoritos
    }

    function manejarClickFav(productoID) {
        setFav(preFav => {
            // utilizo el setFav con preFav para obtener el estado anterior de los favoritos
            // y poder modificarlo según el producto que se haya hecho click

            let newFav

            if (preFav.includes(productoID)) {
                // si el producto ya está en favoritos, lo elimino
                newFav = eliminarFav(productoID)
            } else {
                // si el producto no está en favoritos, lo añado
                newFav = añadirFav(productoID)
            }
            // actualizo el estado de los favoritos
            setFav(newFav)
            // guardo en localStorage los favoritos
            localStorage.setItem('favoritos', JSON.stringify(newFav))
        })
    }

    function mostrarCard(producto) {
        return (
            <Col key={producto.id}>
                <Link to={`/detalle/${producto.id}`}>
                    <ProductCard
                        id={producto.id}
                        imagen={producto.imagen}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        producto={producto}
                        descripcion={producto.descripcion}
                        manejarFavoritos={manejarClickFav}
                        listaFavoritos={fav}
                    />
                </Link>
            </Col>

        )
    }

    return (
        <div className="row mt-2 justify-content-center">
            {/* Todos los productos */}
            <div className="col-12 d-flex flex-column align-items-center">
                <div className="row w-100 justify-content-center">
                    <div className="col-12 mb-3 ">
                        <h2 className="colorH2">Productos</h2>
                    </div>
                    {/*
                        ESTE SECTION CONTIENE LA LISTA DE LOS PRODCUTOS 
                        CON EL COMPONENTE PRODUCTCARD Y EL COMPONENTE SPINNER DE CARGA   
                    */}
                    <section className="products-section d-flex justify-content-center w-100">
                        {loading ?? <Spinner />}
                        <Row xs={1} sm={2} md={3} className="g-4 mb-3 justify-content-center w-100">
                            {productos.map(mostrarCard)}
                        </Row>
                    </section>
                </div>
            </div>
        </div >
    )
}
export default Products