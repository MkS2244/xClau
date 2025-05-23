export function getProducts(){

    const API_URL = `http://localhost:8000/api/v1/productos`;
    
    return fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // console.log("GETPRODUCTS DATA", data)

            return data.map( product => ({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen
            }))
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
            throw error; 
        });
}