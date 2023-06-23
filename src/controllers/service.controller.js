import { pool } from '../db.js'
import {USER_EMAIL,EMAIL_PASS} from '../config.js'
import {emailPersonalizado} from '../components/plantilla.msj.js'
import { encryptPassword } from '../controllers/auth.controller.js'
import nodemailer from 'nodemailer'
import ExcelJS from 'exceljs';

export const reporteOrdenes = async (req, res) => {
    //reporterunner?nivel=0&id=1234557&dia=2023-12-12
    try {
      const { nivel ,id, dia } = req.query;
  
      const [rows] = await pool.query('CALL sp_reportes(?,?,?)', [nivel,id,dia]);
  
      if (rows[0].length <= 0) {
        return res.status(404).json({
          message: 'No se encontró el runner',
        });
      }
  
      // Obtener los nombres de las columnas
      const columnNames = Object.keys(rows[0]);

      // Crear el arreglo de datos con el encabezado
      const data = [columnNames, ...rows.map((row) => Object.values(row))];
      
      const workbook = new ExcelJS.Workbook();

      // Agregar una hoja al libro
      const worksheet = workbook.addWorksheet('Reporte');
  
      // Agregar el logo en la parte superior
      const logoPath = 'src/components/logo_tp.png';
      const logoImage = workbook.addImage({
        filename: logoPath,
        extension: 'png',
      });
      worksheet.addImage(logoImage, {
        tl: { col: 0, row: 1 },
        br: { col: 4, row: 4 },
        editAs: 'absolute',
      });
  
      // Desplazar la tabla hacia abajo
      worksheet.addRow([]);
      worksheet.addRow([]);
      worksheet.addRow([]);
      worksheet.addRow([]);
      worksheet.addRow([]);
      
      // Agregar los encabezados de columna
      const headerRow = worksheet.addRow(data[0]);
      
      // Establecer el estilo del encabezado
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '1A4296' }, 
        };
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFFFF' },
        };
        cell.alignment = { horizontal: 'center' };
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        }; // Agregar contorno a la celda
      });
  
      // Agregar los datos
      for (let i = 1; i < data.length; i++) {
        const row = worksheet.addRow(data[i]);
  
        // Establecer el estilo de la fila de datos
        row.eachCell((cell) => {
          cell.alignment = { horizontal: 'center' }; // Centrar el texto
          cell.border = {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
          }; // Agregar contorno a la celda
        });
      }
  
      // Generar el archivo Excel en memoria
      workbook.xlsx.writeBuffer()
        .then((buffer) => {
          // Establecer las cabeceras de la respuesta
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.setHeader('Content-Disposition', 'attachment; filename=reporte.xlsx');
          res.setHeader('Content-Length', buffer.length);
  
          // Enviar el archivo Excel como respuesta
          res.send(buffer);
        })
        .catch((error) => {
          console.error('Error al generar el archivo Excel:', error);
          res.status(500).send('Error al generar el archivo Excel');
        });

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
