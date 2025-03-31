import express from 'express'
import { listar,registrar,eliminar,editar,formularioRegistro,formularioTabla,formularioEditar,confirmar,formularioLogin,resetPassword,formularioOlvidePassword,nuevoPassword,comprobarToken,autenticar } from '../controllers/usuarioControllers.js'; 
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
router.get('/login',formularioLogin)
router.post('/login',autenticar)
router.get('/olvide-password',formularioOlvidePassword)
router.post('/olvide-password',resetPassword)
//Almacena el nuevo password
router.get('/olvide-password/:token',comprobarToken);
router.post('/olvide-password/:token',nuevoPassword);
export default router
