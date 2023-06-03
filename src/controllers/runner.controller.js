import { pool } from '../db.js'
import { encryptPassword, comparePassword } from '../controllers/auth.controller.js'

const nivel = 2;


export const autenticarRunner = async(req, res) => {

    try{
        
        const {usuario, passwrd} = req.body
        const [auth] = await pool.query('CALL sp_verifica_usuario(?)', usuario)

        if(!auth[0][0].resp.length > 1){
            return res.status(404).json({ fallo: "1" })
        }

        if(await comparePassword( passwrd, auth[0][0].resp)){

            const [rows]  = await pool.query('CALL sp_iniciar_sesion(?)', [usuario])

            if(rows[0][0].fallo.length <= 1){
                return res.status(404).json({ fallo: "1" })
            }

            res.json(rows[0][0])
        }
        else{
            return res.status(404).json({ fallo: "1" })
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const getRunner = async(req, res) => {

    try{
        const [rows] = await pool.query('CALL sp_lista_runner(?)', 'A')
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const getRunnerId = async(req, res) => {

    try{
        const [rows] = await pool.query('CALL sp_lista_runner(?)', [req.params.id])
    
        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const createRunner = async (req, res) => {

    try{
        const {nombre, apellidos, dni, telefono, email} = req.body
        const passwrd = await encryptPassword(dni)

        const [rows] = await pool.query('CALL sp_insertar(?,?,?,?,?,?,?)', [nombre, apellidos, dni, telefono, email, passwrd, nivel])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
        }
        
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const updateRunner = async(req, res) => {

    try{
        const {id} = req.params
        const {nombre, apellidos, dni, telefono, email, usuario, passwrd} = req.body
        const pass = await encryptPassword(passwrd)

        const [result] = await pool.query('CALL sp_actualizar( ?,?,?,?,?,?,?,?,? )',[id, nombre, apellidos, dni, telefono, email, usuario, pass, nivel])

        if(result[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }else{
            res.json(result[0][0])
        }
    }
    catch(error){

        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const deleteRunner = async(req, res) => {

    try{
        const [result] = await pool.query('CALL sp_eliminar(?)', [req.params.id])

        if(result[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }else{
            res.json(result[0][0])
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const estadoRunner = async(req, res) => {

    try{
        const {id} = req.params
        const {estado} = req.body
        
        const [result] = await pool.query('CALL sp_cambiar_estado( ?,?,? )',[id, estado, nivel])

        if(result[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(result[0][0])
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const cambiarPassRunner = async(req, res) => {

    try{
        const {id} = req.params
        const {oldpasswrd , newpasswrd} = req.body
        newpasswrd = await encryptPassword(newpasswrd)

        const [result] = await pool.query('CALL sp_cambiar_pass( ?,?,? )',[id, oldpasswrd, newpasswrd])
        
        if(result[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(result[0][0])
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}