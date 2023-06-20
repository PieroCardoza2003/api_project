import { pool } from '../db.js'
import {USER_EMAIL,EMAIL_PASS} from '../config.js'
import {emailPersonalizado} from '../components/plantilla.msj.js'
import { encryptPassword } from '../controllers/auth.controller.js'
import nodemailer from 'nodemailer'
import PDFDocument from 'pdfkit'

export const reporteRunner = async (req, res) => {
    //reporterunner?id=1234557&dia=02-12-2002
    try {
      const { id, dia } = req.query;
  
      const [rows] = await pool.query('SELECT * FROM RUNNER WHERE id_runner = ?', [id]);
  
      if (rows.length <= 0) {
        return res.status(404).json({
          message: 'No se encontró el runner',
        });
      }
  
      const doc = new PDFDocument();
  
      doc.text(`
        =================================================
                        REPORTE DE ENTREGAS
        =================================================
        Nombre: ${rows[0].nombre}
        Apellidos: ${rows[0].apellidos}
        Cargo: RUNNER
        Día: ${dia}
        Cantidad de órdenes entregadas: 0
        Cantidad de órdenes canceladas: 0
        =================================================
      `);
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
  
      doc.pipe(res);
      doc.end();
    } catch (error) {
      return res.status(500).json({
        message: 'Ocurrió un error',
      });
    }
  };
  
  


export const cambiarPassLogin = async(req,res) => {
    try{
        const {id_user, newpass} = req.body
        const passwrd = await encryptPassword(newpass)

        const [rows] = await pool.query('CALL sp_pass_login(?,?)', [id_user, passwrd])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }else{
            res.json(rows[0][0])
        }
        
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const recuperarContrasena = async(req, res) => {
    try{
        const {usuario} = req.body
        
        //Validar que el usuario este en nuestra base de datos
        const [rows] = await pool.query('SELECT id_user,email FROM DATOS WHERE usuario = ?', [usuario])
        
        if(rows.length <= 0) return res.status(404).json({
            resp: '-1'
        })

        const id =  rows[0].id_user
        const codigo = generarCodigo()
        const email =  rows[0].email
        const mail = ocultarMail(email)

        await enviarMail(email, codigo);

        res.json({ resp: id, resp2: codigo, resp3: mail })

    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const enviarMail = async (email, mnsj) => {

    try{
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
            subject : 'Trust Partners',
            html: emailPersonalizado(mnsj)
        }

        const transport = nodemailer.createTransport(config);
        const info = await transport.sendMail(mensaje);
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

function generarCodigo() {
    const codigo = Math.floor(Math.random() * 100000);
    return codigo.toString().padStart(5, '0');
}

function ocultarMail(mail) {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(mail);
    
    if (!isValidEmail) {
        throw new Error("Formato de correo electrónico inválido");
    }
    
    const posicion = mail.indexOf("@");
    const first = mail.substring(0, Math.min(3, posicion));
    const last = mail.substring(posicion);
    
    return `${first}*****${last}`;
}
