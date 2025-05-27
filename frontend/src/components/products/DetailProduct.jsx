// ------ IMPORT REACT ---------
import { useParams } from "react-router-dom"
// ------ CUSTOM HOOK ---------
import useProductID from "../../hooks/useProductID"
// ------ COMPONENTES ---------
import Spinner from "../spinner/Spinner"
// ------ IMG ---------
import imagenTest from '../../assets/xuxes.jpg'
import like from '../../assets/like.png'
import unlike from '../../assets/dislike.png'

const DetailProduct = (props) => {

    const id = useParams()
    console.log("ID: ", id.id)

    const { productoID, loading } = useProductID(id.id)
    console.log(" PRODUCTO: ", productoID)


    return (
        <>
            {loading ? (<Spinner />) : productoID ? (
                <div className="detail-product-container">
                    <div className="detail-product-img">
                        <img src={imagenTest} alt={productoID.nombre} />
                    </div>
                    <div className="detail-product-info">
                        <h3 className="detail-product-title">{productoID.nombre}</h3>
                        <p className="detail-product-price">{productoID.precio} €</p>
                        <p className="detail-product-desc">{productoID.descripcion}</p>
                        <button className="detail-product-btn">Añadir al carrito</button>
                        <div className="detail-product-icons">
                            <img className="icon-heart" onClick={(evt) => {
                                evt.preventDefault()
                                props.manejarFavoritos(productoID.id)
                            }}
                                src={props.listaFavoritos.includes(productoID.id) ? like : unlike}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <p>No hay detalles disponibles para este producto.</p>
            )}
        </>
    )
}
export default DetailProduct