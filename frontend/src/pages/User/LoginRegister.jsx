// ----- CSS -----
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// ----- REACT -----
import { useNavigate } from 'react-router-dom'
import { useReducer, useEffect } from 'react'

// ----- COMPONENTES -----
import useToken from '../../hooks/useToken'
import useCheckEmail from '../../hooks/useCheckEmail'
import useRegisterUser from '../../hooks/useRegisterUser'


const LoginRegister = () => {

    const { login } = useToken()
    const { registerUser } = useRegisterUser()
    const { checkEmail } = useCheckEmail()
    const navigate = useNavigate()

    const initialState = {
        step: 1, // 1: login, 2: register
        email: '',
        emailExiste: null, // null: no se ha comprobado, true/false: email existe/no existe
        password: '',
        name: '',
        apellidos: '',
        error: ''
    }

    function reduce(state, action) {
        switch (action.type) {
            case "SET_FIELD":
                return {
                    ...state,
                    [action.field]: action.value
                }
            case "SET_EMAILEXISTE":
                return {
                    ...state,
                    emailExiste: action.value,
                    step: 2
                }
            case "SET_ERROR":
                return {
                    ...state,
                    error: action.value
                }
            case "RESET":
                return initialState
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reduce, initialState)

    // Comprobar si el email existe automáticamente al cambiar el campo email
    useEffect(() => {
        const comprobar = async () => {
            if (state.email && state.email.includes('@')) {
                try {
                    const data = await checkEmail(state.email);
                    // El backend debe devolver { exists: true/false }
                    dispatch({ type: 'SET_EMAILEXISTE', value: data && data.exists });
                } catch (e) {
                    dispatch({ type: 'SET_ERROR', value: e.message || 'Error al comprobar el email' });
                }
            } else {
                dispatch({ type: 'SET_EMAILEXISTE', value: null });
            }
        };
        comprobar();
        // eslint-disable-next-line
    }, [state.email]);

    // Handler para login
    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(state.email, state.password);
        if (result) {
            navigate('/');
        }
    };

    // Handler para registro de usuario
    const handleRegister = async (e) => {
        e.preventDefault();
        if (state.password.length < 6) {
            dispatch({ type: 'SET_ERROR', value: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }
        const userData = {
            name: state.name,
            apellidos: state.apellidos,
            email: state.email,
            password: state.password
        };
        try {
            const data = await registerUser(userData);
            if (data && data.access_token) {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                dispatch({ type: 'SET_ERROR', value: 'Error en el registro' });
            }
        } catch (er) {
            console.log(er)
            if (er.errors) {
                // Muestra el primer error de validación
                const firstError = Object.values(er.errors)[0][0];
                dispatch({ type: 'SET_ERROR', value: firstError });
            } else {
                dispatch({ type: 'SET_ERROR', value: er.message });
            }
        }
    };

    return (
        <div className="login-container">
            <Form className='form-login mt-5' onSubmit={state.emailExiste ? handleLogin : handleRegister}>
                <h3 className="text-center">Iniciar sesión o registrarse</h3>
                <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control 
                        type="email" 
                        required 
                        placeholder="Introduce tu email" 
                        value={state.email} 
                        onChange={e => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })} 
                    />
                </Form.Group>
                {state.emailExiste === true && (
                    <>
                        <Form.Group className="mb-3" controlId="floatingPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                required 
                                placeholder="Contraseña" 
                                value={state.password} 
                                onChange={e => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })} 
                            />
                        </Form.Group>
                        <Button bsPrefix='btn-login' variant="primary" type="submit">
                            Continuar
                        </Button>
                    </>
                )}
                {state.emailExiste === false && (
                    <>
                        <Form.Group className="mb-3" controlId="floatingPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                placeholder="Contraseña"
                                value={state.password}
                                onChange={e => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
                                isInvalid={state.password.length > 0 && state.password.length < 6} 
                            />
                            {state.password.length > 0 && state.password.length < 6 && (
                                <Form.Text style={{ color: 'red' }}>
                                    La contraseña debe tener al menos 6 caracteres.
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="floatingNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                placeholder="Nombre"
                                value={state.name}
                                onChange={e => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="floatingApellido">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control 
                                type="text" 
                                required 
                                placeholder="Apellidos" 
                                value={state.apellidos} 
                                onChange={e => dispatch({ type: "SET_FIELD", field: "apellidos", value: e.target.value })} 
                            />
                        </Form.Group>
                        <Button
                            bsPrefix='btn-login'
                            variant="primary"
                            type="submit"
                            disabled={state.password.length < 6}
                        >
                            Registrarse
                        </Button>
                    </>
                )}
                {state.error && <div style={{ color: 'red' }}>{state.error}</div>}
            </Form>
        </div>
    )
}
export default LoginRegister