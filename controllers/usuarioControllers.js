import {check,validationResult} from 'express-validator'
import path  from 'path';
import Usuario from '../models/usuario.js'
import{ generarId } from '../helpers/token.js' 
import {emailRegistro} from '../helpers/emails.js'
//listartodos
const listar=async(req,res)=>{
   
    try {
        console.log("entrandooo",req.body)
        const usuarios=await Usuario.findAll(req.body)
        res.render('auth/tabla',{usuarios})
        
        
    } catch (error) {
        console.error("Error al listar los usuarios:", error);
        res.status(500).json({ mensaje: "Error al listar usuarios" });
    }
   
 }


const editar=async (req,res)=>{
    console.log("soy paaaaaaaaaarams",req.body)
    const { id } = req.params;
    const {nombre,email}=req.body
        
    try {
        
        const usuarios=await Usuario.findOne({where:{id}})    
        
        if(!usuarios){
            return res.status(404).json({mensaje:'Usuario no encontrado o sin cambios'})
        }
        const usuario=await Usuario.update({nombre,email},{where:{id}});
        res.render('auth/editar',{
                
            usuario:{
            nombre:usuarios.nombre,
            email:usuarios.email,
            id:usuarios.id,
            
        },
        mensaje: 'Usuario actualizado' 
        
        
                 
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'Error al actualizar el usuario'})
        
    }
}


const formularioRegistro=(req,res)=>{
        res.render('auth/registro')
}

const formularioTabla=(req,res)=>{
        res.render('auth/tabla',{
            pagina:"Crear Cuenta"            
            })
}
    


const registrar=async(req,res)=>{

        const {nombre,email,password,token}=req.body
        console.log("reeeesssssssss123=>",req.body)
        //validacion
        await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
        await check('email').isEmail().withMessage('Eso no parece un email').run(req)
        await check('password').isLength({min:6}).withMessage('El password debe de ser de minimo 6 caracteres').run(req)
        //await check('repetir_password').equals('password').withMessage('los password no soniguales').run(req)
        
        let resultado=validationResult(req)
    
        //return res.json(resultado.array())
        //verificar que el resultado este vacio
    
        //console.log("reeeeeesultadoooooo=>",resultado)
        if(!resultado.isEmpty()){
            
            return res.render('auth/registro',{
                pagina:"Crear Cuenta",
                errores:resultado.array(),   
                usuario:{
                    nombre:req.body.nombre,
                    email:req.body.email,
                    
                }         
                })
    
        }
    
            const existeUsuario=await Usuario.findOne({where:{email:req.body.email}})
            console.log(existeUsuario)
            if(existeUsuario){
                return res.render('auth/registro',{
                    pagina:"Crear Cuenta",
                    errores:[{msg:'El Usuario ya esta registrado'}],   
                    usuario:{
                        nombre:req.body.nombre,
                        email:req.body.email,
                        
                    }         
                    })
            }
            

            //console.log("siiiiiiiiiiiiiiii",req.body)
            const usuario=await Usuario.create({
                nombre,
                email,
                password,
                token:generarId()
            })

            //Envia email de configuracion
            emailRegistro({
                nombre:usuario.nombre,
                email:usuario.email,
                token:usuario.token
            })

            //mostrar mensaje de confirmacion
            res.render('auth/mensaje',{
                pagina:'Cuenta creada correctamente',
                mensaje:'Hemos enviado un email de confirmacion, presiona en el enlace'
            })

            const usuarios=await Usuario.findAll(req.body)  
            res.render('auth/tabla',{usuarios})    
            //console.log("uuuuuuuuuuussssssssssssssuuuuuuuuuuuuuuuuario",usuario)          
            
}
const formularioEditar=async(req,res)=>{
    
    console.log("soooy el usuarioxxx",req.params)
    const { id } = req.params;
    const usuarios=await Usuario.findOne({where:{id}})
    console.log("findoneeee",usuarios)
    if(usuarios!=" "){
        return res.render('auth/editar',{
                
                usuario:{
                nombre:usuarios.nombre,
                email:usuarios.email,
                id:usuarios.id
                }
                     
            })

    }
    
}


const eliminar=async (req,res)=>{

    try {

        console.log("soooooooy eliminar",req.params)
        const { id } = req.params;
        
        const usuario=await Usuario.destroy({ where: { id } } )
        const usuarios=await Usuario.findAll(req.body)  
            res.render('auth/tabla',{usuarios})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mensaje:'Error al eliminar el usuario'})
        
    }    
    

}

//funcion que confirma una cuenta
const confirmar=async(req,res)=>{
    const{token}=req.params
    
    const usuario=await Usuario.findOne({where:{token}})
    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina:'Error al confirmar tu cuenta',
            mensaje:'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error:true
        })
    }

    //confirmar la cuenta
    usuario.token=null;
    usuario.confirmado=true;
    await usuario.save();
    return res.render('auth/confirmar-cuenta',{
        pagina:'Cuenta confirmada',
        mensaje:'La cuenta se confirmo correctamente',
        
    }) 
}

       

export{
    listar,
    registrar,
    editar,
    eliminar,
    formularioRegistro,
    formularioTabla,
    formularioEditar,
    confirmar
    
    }