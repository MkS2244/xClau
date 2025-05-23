// --------------- 
// IMPORT REACT
// ---------------
import { useParams } from "react-router-dom"
import useProductID from "../../hooks/useProductID"
import Spinner from "../spinner/Spinner"

const DetailProduct = () => {

    const id = useParams()
    console.log("ID: ", id.id)

    const { productoID, loading } = useProductID(id.id)
    console.log(" PRODUCTO: ", productoID)


    return (
        <>
            {loading ? (<Spinner />) : productoID ? (
                <div>
                    <p>{productoID.nombre}</p>
                    <p>{productoID.descripcion}</p>
                    <p>{productoID.precio}</p>
                </div>
            ) : (
                <p>No hay detalles disponibles para este producto.</p>
            )}
        </>
    )
}
export default DetailProduct