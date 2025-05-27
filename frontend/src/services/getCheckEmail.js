export function getCheckEmail(email) {
    const url = `http://localhost:8000/api/v1/user-exists?email=${email}`;
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Error al comprobar el email');
            return res.json();
        })
}