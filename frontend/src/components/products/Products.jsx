import fotoPrueba from '../../assets/Logo.webp'

const Products = () => {

    return (
        <div className="row mt-2">
            {/* Filtro (lado izquierdo) */}
            <aside className="col-md-3 bg-danger text-white p-4">
                <h4>Filtros</h4>
                <p>Opciones de filtrado aquí</p>
            </aside>

            {/* Todos los productos */}
            <div className="col-sm-9">
                <div className="row">
                    <div className="col-12 mb-3 ">
                        <h2 className="colorH2">Productos</h2>
                    </div>

                    {/*
                        ESTE SECTION SERA UN COMPONENTE *CARD*
                        METERLO EN UNA FUNCION PARA QUE LOS MUESTRE 
                        SEGUN EL Nº DE PRODCUTOS HAYA EN LA BASE DE DATOS    
                    */}
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
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className=" p-4">
                                    <img className='imgProduct' src={fotoPrueba} alt="Imagen del producto" />
                                </div>
                                <div className='p-4'>
                                    <h3>Producto 1</h3>
                                    <p>Descripción del producto.............</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className=" p-4">
                                    <img className='imgProduct' src={fotoPrueba} alt="Imagen del producto" />
                                </div>
                                <div className='p-4'>
                                    <h3>Producto 1</h3>
                                    <p>Descripción del producto.............</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className=" p-4">
                                    <img className='imgProduct' src={fotoPrueba} alt="Imagen del producto" />
                                </div>
                                <div className='p-4'>
                                    <h3>Producto 1</h3>
                                    <p>Descripción del producto.............</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-4">
                                <div className=" p-4">
                                    <img className='imgProduct' src={fotoPrueba} alt="Imagen del producto" />
                                </div>
                                <div className='p-4'>
                                    <h3>Producto 1</h3>
                                    <p>Descripción del producto.............</p>
                                </div>
                            </div>
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
                </div>
            </div>
        </div>
    )
}
export default Products