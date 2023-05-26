import { pool } from '../db.js'
import {USER_EMAIL,EMAIL_PASS} from '../config.js'
import nodemailer from 'nodemailer'

export const recuperarContrasena = async(req, res) => {
    try{
        const {usuario, codigo} = req.body
        
        //Validar que el usuario este en nuestra base de datos
        const [rows] = await pool.query('SELECT email FROM DATOS WHERE usuario = ?', [usuario])
        
        if(rows.length <= 0) return res.status(404).json({
            message: 'User not fount'
        })

        //Extraer el E-mail asociado al usuario
        const email =  rows[0].email

        //enviar el mensaje con el codigo de recuperacion
        enviarMail(email, codigo);

        //se muesta el correo asociado
        res.json(rows[0])

    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const enviarMail = async (email, mnsj) => {

    const config = {
        service: 'Gmail',
        auth : {
            user : USER_EMAIL,
            pass : EMAIL_PASS
        },
        secure: true, // Utiliza el protocolo SMTP con TLS
    }

    const mensaje = {
        from : USER_EMAIL,
        to : email,
        subject : 'Recuperacion de contraseña',
        text : mnsj
    }

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    console.log('Se envio el email');
}
