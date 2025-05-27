import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useEffect, useState } from 'react';

const LogoutToast = ({ userName }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Solo mostrar el Toast si NO hay token (logout)
        const token = localStorage.getItem('access_token');
        if (userName && !token) {
            setShow(false); // reset
            setTimeout(() => setShow(true), 200); // animación de entrada
        }
    }, [userName]);

    // Mostrar el Toast aunque userName sea string vacío
    return (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={2500}
                autohide
                bg="info"
                animation
                className={`logout-toast-anim custom-logout-toast${show ? '' : ' hide'}`}
                onExited={() => setShow(false)}
            >
                <Toast.Header>
                    <strong className="me-auto">Hasta pronto</strong>
                </Toast.Header>
                <Toast.Body style={{ color: 'white' }}>
                    ¡Hasta pronto, <b>{userName || 'usuario'}</b>!
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default LogoutToast;
