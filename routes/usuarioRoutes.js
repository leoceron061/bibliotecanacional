import express from 'express'
import { formularioTabla,registrar,formularioRegistro,editar } from '../controllers/usuarioControllers.js'; 
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("holaaaaaa")
})

router.get('/tabla',formularioTabla)
router.put('/tabla',editar)
router.get('/registro',formularioRegistro)
router.post('/registro',registrar)

export default router
