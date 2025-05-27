// Servicio para gestionar favoritos asociados a usuario autenticado

const API_URL = 'http://localhost:8000/api/v1/favorites';

export async function getUserFavorites(token) {
    const res = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Error al obtener favoritos');
    return res.json();
}

export async function addFavorite(product_id, token) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id }),
    });
    if (!res.ok) throw new Error('Error al añadir favorito');
    return res.json();
}

export async function removeFavorite(product_id, token) {
    const res = await fetch(`${API_URL}/${product_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) throw new Error('Error al eliminar favorito');
    return res.json();
}
