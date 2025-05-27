// ------- CUSTOM HOOKS --------
import useProducts from "../../hooks/useProducts"
import { useFavorites } from '../../hooks/useFavorites'

// ------- SERVICIOS --------
import { Link } from "react-router-dom"

// ------- COMPONENTES --------
import ProductCard from "../card productos/productCard"
import Spinner from "../spinner/Spinner"

// ------- REACT-BOOTSTRAP --------
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Products = () => {

    // Utilizamos el custom hook `useProducts` para obtener los productos 
    const { productos, loading } = useProducts()
    // Obtenemos el token de acceso del localStorage
    const token = localStorage.getItem('access_token');
    // Utilizamos el custom hook `useFavorites` para manejar los favoritos
    const { favorites, toggleFavorite } = useFavorites(token);

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
                        manejarFavoritos={toggleFavorite}
                        listaFavoritos={favorites}
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