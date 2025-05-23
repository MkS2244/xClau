export function getProductsID(id) {

    const API_URL = `http://localhost:8000/api/v1/productos/${id}`;

    return fetch(API_URL)
        .then(response => response.json())
        .then(data => ({
            // console.log("GETPRODUCTS id DATA", data)
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            img: data.imagen,
            stock: data.stock
        }))
        .catch(error => {
            console.error("Error fetching product data:", error);
            throw error; 
        });
}