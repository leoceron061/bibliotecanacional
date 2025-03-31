import Precio from "../models/precio.js"
import Categoria from "../models/categorias.js"
const admin=async(req, res)=>{
    res.render('propiedades/admin',{
        pagina: 'Mis propiedades',
        barra:true
    })

}

//formulario para crear una nueva propiedad
const crear=async(req, res)=>{
    //Consulatr modelo de precios y categorias
    const [categorias,precios]=await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear',{
        pagina: 'Crear propiedad',
        barra:true,
        categorias,
        precios
    })

}



export{
    admin,
    crear
}