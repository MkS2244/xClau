// ------------
//  COMPONENTS
// ------------
import Header from "../../components/header/Header";
import DetailProduct from "../../components/products/DetailProduct";
import { useState, useEffect } from "react";
import useFavorites from '../../hooks/useFavorites';

const Details = () => {
    // Estado para manejar los favoritos igual que en Products.jsx
    const [fav, setFav] = useState([]);
    const token = localStorage.getItem('access_token');
    const { favorites, toggleFavorite, loading: favLoading } = useFavorites(token);

    function manejarFavoritos() {
        const favGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
        setFav(favGuardados);
    }

    useEffect(manejarFavoritos, []);

    function eliminarFav(productoID) {
        return fav.filter(favorito => favorito !== productoID);
    }

    function añadirFav(productoID) {
        let favoritos = [...fav, productoID];
        return favoritos;
    }

    function manejarClickFav(productoID) {
        setFav(preFav => {
            let newFav;
            if (preFav.includes(productoID)) {
                newFav = eliminarFav(productoID);
            } else {
                newFav = añadirFav(productoID);
            }
            localStorage.setItem('favoritos', JSON.stringify(newFav));
            return newFav;
        });
    }

    return (
        <>
            <Header />
            <DetailProduct
                listaFavoritos={favorites}
                manejarFavoritos={toggleFavorite}
            />
        </>
    )
}
export default Details;