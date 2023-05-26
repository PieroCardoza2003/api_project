import { pool } from '../db.js'

const nivel = 0;

export const autenticarDigitador = async(req, res) => {
    try{
        const {usuario, passwrd} = req.body
        const [rows] = await pool.query('CALL sp_iniciar_sesion(?,?)', [usuario, passwrd])

        if(rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }else{
            res.json(rows[0][0])
        }

    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getDigitador = async(req, res) => {
    try{
        const [rows] = await pool.query('CALL sp_lista_digitador(?)', 'A')
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getDigitadorId = async(req, res) => {
    try{
        const [rows] = await pool.query('CALL sp_lista_digitador(?)', [req.params.id])
    
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

export const createDigitador = async (req, res) => {
    try{
        const {nombre, apellidos, dni, telefono, email} = req.body

        const [rows] = await pool.query('CALL sp_insertar(?,?,?,?,?,?)', [nombre, apellidos, dni, telefono, email, nivel])

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

export const updateDigitador = async(req, res) => {

    try{
        const {id} = req.params
        const {nombre, apellidos, dni, telefono, email, usuario, passwrd} = req.body
        
        const [result] = await pool.query('CALL sp_actualizar( ?,?,?,?,?,?,?,?,? )',[id, nombre, apellidos, dni, telefono, email, usuario, passwrd, nivel])

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

export const deleteDigitador = async(req, res) => {

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

export const estadoDigitador = async(req, res) => {

    try{
        const {id} = req.params
        const {estado} = req.body
        
        const [result] = await pool.query('CALL sp_cambiar_estado( ?,?,? )',[id, estado, nivel])

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

export const cambiarPassDigitador = async(req, res) => {

    try{
        const {id} = req.params
        const {oldpasswrd , newpasswrd} = req.body

        const [result] = await pool.query('CALL sp_cambiar_pass( ?,?,? )',[id, oldpasswrd, newpasswrd])
        
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