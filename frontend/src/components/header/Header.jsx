import { Link } from "react-router-dom"
import logo from '../../assets/Logo.webp'
import user from '../../assets/usuario.png'
import shop from '../../assets/carrito-de-compras.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState  } from 'react';
import { useNavigate } from "react-router-dom";
import LogoutToast from '../Toast/LogoutToast';

const Header = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [logoutUserName, setLogoutUserName] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLogged(!!token);
        // Mostrar Toast si hay bandera de logout
        const toastUser = localStorage.getItem('logoutUserName');
        if (toastUser) {
            setLogoutUserName(toastUser);
            localStorage.removeItem('logoutUserName');
        }
    }, []);

    const handleLogout = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.name) {
            localStorage.setItem('logoutUserName', user.name);
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        setIsLogged(false);
        navigate(0); // recarga la página para forzar el Toast
    }

    return (
        <div className="row">
            <LogoutToast userName={logoutUserName} />
            <nav className="col-12 align-text-top navbar navbar-expand-md">
                <div className="container">
                    <Link to="/productos">
                        <img className="logo" src={logo} alt="Logo xClau" />
                    </Link>
                    <h4 className="ps-3">XTATTOOCLAU</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between ms-5" id="navbarNavAltMarkup">
                        <div className="navbar-nav gap-3">
                            <Link className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Poductos" to="/">
                                Productos
                            </Link>
                            <Link className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Citas" to="#">
                                Citas
                            </Link>
                            <Link className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Diseños" to="#">
                                Diseños
                            </Link>
                        </div>
                        <div className="d-flex gap-4 mt-md-0 align-items-center">
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 bg-transparent">
                                    <img className="user-icon" src={user} alt="Inicio de sesion" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {isLogged ? (
                                        <>
                                            <Dropdown.Item as={Link} to="/perfil">Editar perfil</Dropdown.Item>
                                            <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
                                        </>
                                    ) : (
                                        <Dropdown.Item as={Link} to="/login">Iniciar sesión</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Link to="#">
                                <img className="user-icon mx-3" src={shop} alt="Carrito de compra" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Header