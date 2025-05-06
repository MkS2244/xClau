import { Link } from "react-router-dom"
import logo from '../../assets/Logo.webp'
import user from '../../assets/usuario.png'
import shop from '../../assets/carrito-de-compras.png'

const Header = () => {

    return (
        <>
            <div className="row">
                {/* fixed-top */}
                <nav className="col-12 align-text-top navbar navbar-expand-md">
                    <div className="container">
                        <Link to="/productos">
                            <img className="logo" src={logo} alt="Logo xClau" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                            <div className="navbar-nav gap-3">
                                <Link className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Poductos" to="/productos">
                                    Productos
                                </Link>
                                <a className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Citas" href="#">Citas</a>
                                <a className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Diseños" href="#">Diseños</a>
                            </div>
                            {/* mirar porque se ve descuadrado los iconos de carrito y usuario */}
                            <div className="d-flex gap-3 ms-3 mt-md-0">
                                <a href="#">
                                    <img className="user-icon" src={user} alt="Inicio de sesion" />
                                </a>
                                <a href="#">
                                    <img className="user-icon" src={shop} alt="Carrito de compra" />
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default Header