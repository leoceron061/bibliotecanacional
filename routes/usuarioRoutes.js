import express from 'express'
import { listar,registrar,eliminar,editar,formularioRegistro,formularioTabla,formularioEditar,confirmar } from '../controllers/usuarioControllers.js'; 
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("holaaaaaa")
})

router.get('/tabla',listar)
router.get('/registro',formularioRegistro)
router.post('/registro',registrar)
router.delete('/eliminar/:id',eliminar)
router.put('/editarUsuario/:id',editar)
//router.get('/editarUsuario/:id',editar)
router.get('/editar/:id',formularioEditar)
router.get('/confirmar/:token',confirmar)

export default router
