export function getToken(email, password) {

    const url = 'http://localhost:8000/api/v1/login';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(res => res.json())
        .then((data) => {
            if (data.access_token){
                // Guardar el token en el localStorage
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user))
            }else{
                // Si no hay token, significa que hubo un error en la autenticación
                throw new Error('Error de autenticación');
            }
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });

}