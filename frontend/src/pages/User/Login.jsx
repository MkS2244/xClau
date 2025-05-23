// ----- CSS -----
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// ----- REACT -----
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// ----- COMPONENTES -----
import useToken from '../../hooks/useToken'


const Login = () => {

    const { login, error } = useToken();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result) {
            navigate('/'); // Redirige al home si el login es exitoso
        }
    };

    return (
        <div className="login-container">
            <Form className='form-login mt-5' onSubmit={handleSubmit}>
                <h3 className="text-center">Iniciar sesión o registrarse</h3>
                <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        Tranquil@, nunca compartiremos tu email con nadie.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="floatingPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
{/*                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button bsPrefix='btn-login' variant="primary" type="submit">
                    Entrar
                </Button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Form>
        </div>
    )
}
export default Login