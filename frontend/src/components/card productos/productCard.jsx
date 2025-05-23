// ------------
// React-Bootstrap
// ------------
import Card from 'react-bootstrap/Card';

// --------------- 
// IMG
// ---------------
import cesta from '../../assets/añadir-a-la-cesta.png'
import like from '../../assets/like.png'
import unlike from '../../assets/dislike.png'

const ProductCard = (props) => {

    return (
        <Card key={props.id} className='text-center' style={{ width: '100%' }}>
            <Card.Img variant="top" src={props.imagen} />
            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                <Card.Title className='text-center'>{props.nombre}</Card.Title>
                <Card.Text className='text-center'>{props.precio}€</Card.Text>
                <div className='d-flex justify-content-between w-100 mt-3'>
                    <Card.Img variant='top' style={{ width: '1.5rem' }} onClick={(evt) => {
                        evt.preventDefault()
                        props.manejarFavoritos(props.producto.id)
                    }}
                        src={props.listaFavoritos.includes(props.producto.id) ? like : unlike}
                    />
                    <Card.Img variant='top' style={{ width: '1.5rem' }} src={cesta} />
                </div>
            </Card.Body>
        </Card>
    )
}
export default ProductCard