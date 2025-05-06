const Card = () => {

    
    return (
        <section className="col-md-9">
            <div className="row">
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className=" p-4">
                        <img className='imgProduct' src={fotoPrueba} alt="Imagen del producto" />
                    </div>
                    <div className='p-4'>
                        <h3>Producto 1</h3>
                        <p>Descripción del producto.............</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Card