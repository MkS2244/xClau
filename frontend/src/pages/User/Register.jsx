import FormGroup from "react-bootstrap/esm/FormGroup"

const Register = () => {

    return (
        <>
            <From>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de usuario" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
            </From>
        </>
    )
}
export default Register