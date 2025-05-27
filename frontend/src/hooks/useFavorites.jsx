import { useState, useEffect } from 'react';
import { getUserFavorites, addFavorite, removeFavorite } from '../services/getFavorites';

const useFavorites = (token) => {

    // Estado para manejar los favoritos, el estado de carga y errores
    const [favorites, setFavorites] = useState([]);
    const [loadingFav, setLoadingFav] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si no hay token, no hacemos nada
        // Esto es importante para evitar errores al intentar obtener favoritos sin autenticación
        if (!token) return

        setLoadingFav(true)
        // Obtenemos los favoritos del usuario autenticado
        getUserFavorites(token)
            .then(data => {
                setFavorites(data.favorites || [])
                setLoadingFav(false)
            })
            // Manejo de errores al obtener favoritos
            .catch(e => {
                setError(e.message)
                setLoadingFav(false)
            });
    }, [token]);

    // Función para añadir o eliminar un favorito
    // Si el producto ya está en favoritos, lo eliminamos; si no, lo añadimos
    const toggleFavorite = async (product_id) => {
        if (!token) return;
        try {
            if (favorites.includes(product_id)) {
                await removeFavorite(product_id, token)
                setFavorites(favorites.filter(id => id !== product_id))
            } else {
                await addFavorite(product_id, token);
                setFavorites([...favorites, product_id])
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return { favorites, toggleFavorite, error }
}
export default useFavorites
