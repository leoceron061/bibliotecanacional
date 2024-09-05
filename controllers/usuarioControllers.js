import {check,validationResult} from 'express-validator'
import Usuario from '../models/usuario.js'
const formularioTabla=(req,res)=>{
    console.log("entrandooo")
    res.render('auth/tabla',{
        pagina:"Iniciar Sesión"    
        })
    }
const formularioRegistro=async (req,res)=>{
    
    res.render('auth/registro',{
        pagina:'crear cuenta'
    })
    }

    const registrar=async(req,res)=>{

        console.log("reeeesssssssss=>",res)
        //validacion
        await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
        await check('email').isEmail().withMessage('Eso no parece un email').run(req)
        await check('password').isLength({min:6}).withMessage('El password debe de ser de minimo 6 caracteres').run(req)
        
        
        let resultado=validationResult(req)
    
        //return res.json(resultado.array())
        //verificar que el resultado este vacio
    
        //console.log("reeeeeesultadoooooo=>",resultado)
        if(!resultado.isEmpty()){
            
            return res.render('auth/registro',{
                pagina:"Crear Cuenta",
                error:resultado.array(),   
                usuario:{
                    nombre:req.body.nombre,
                    email:req.body.email,
                    
                }         
                })
    
        }
    
            //console.log("siiiiiiiiiiiiiiii")
            const usuario=await Usuario.create(req.body)  
            res.json(usuario)
            
            //console.log(req.body)          
            
    }
    const editar=async (req,res)=>{
        console.log("xsxsxsxsxsxssxsxxxxxxxx")
        res.render('auth/tabla',{
            pagina:'crear cuenta'
        })
        }
       

export{
    formularioTabla,
    registrar,
    formularioRegistro,
    editar
}