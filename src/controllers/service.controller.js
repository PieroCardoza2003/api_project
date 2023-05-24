import { pool } from '../db.js'
require('dotenv').config();

const nodemailer = require('nodemailer');

export const sendMenssaje = async (req, res) => {
    try{
        const {email, codigo} = req.body

        
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary])
        res.send({
            id: rows.insertId,
            name,
            salary
        })
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const recuperarContraseña = async(req, res) => {
    try{
        const {usuario, codigo} = req.body
        
        //Validar que el usuario este en nuestra base de datos
        const [rows] = await pool.query('SELECT id_user,email FROM DATOS WHERE usuario = ?', [usuario])
        
        if(rows.length <= 0) return res.status(404).json({
            message: 'E-mail not fount'
        })

        //Extraer el E-mail asociado al usuario
        const email =  res.json(rows[0].email)



    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

enviarMail = async (email, mnsj) => {

    const config = {
        service: 'Gmail',
        auth : {
            user : process.env.USER_EMAIL,
            pass : process.env.EMAIL_PASS
        },
        secure: true, // Utiliza el protocolo SMTP con TLS
    }

    const mensaje = {
        from : process.env.USER_EMAIL,
        to : email,
        subject : 'Recuperacion de contraseña',
        text : mnsj
    }

    try{
        const transport = nodemailer.createTransport(config);
        const info = await transport.sendMail(mensaje);
    
        console.log(info);
    }
    catch(error){
        console.log('ocurrio un error');
    }
}