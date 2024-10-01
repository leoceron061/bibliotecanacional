import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js';
import methodOverride from 'method-override';
const app= express();
//habilitar lectura de formularios
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json());

// habilitar pug
app.set('view engine','pug')

app.set('views','./views')



// Middleware para soportar DELETE y PUT en formularios
app.use(methodOverride('_method'));

//carpeta publica
app.use(express.static('public'))


app.use('/auth', usuarioRoutes)

app.use(express.urlencoded({extended:true}))


//conexion a la bd
try{
    await db.authenticate();
    db.sync()
    console.log("Conexion exitosa a la base de datos!!")
}catch(error){
    console.log(error)

}


const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});