import nodemailer from 'nodemailer'
const emailRegistro=async(datos)=>{

    // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const {email,nombre,token}=datos;
  console.log("tokenemails==>",token)
  //enviaar email
  await transport.sendMail({
    from:'Biblioteca nacional',
    to:email,
    subject:'Confirma tu cuenta de biblioteca nacional',
    text:'Confirma tu cuenta de biblioteca nacional',
    html:`
    <p>Hola ${nombre}, comprueba tu cuenta en biblioteca nacional</p>
    <p>Tu cuenta nacional ya esta lista, solo debes confirmarla en el siguiente enlace:<a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/confirmar/${token}">Confirmar cuenta</a></p>
    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>

    
    `
  })
}
export {
    emailRegistro
}