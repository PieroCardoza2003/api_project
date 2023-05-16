import { pool } from '../db.js'


export const autenticarDigitador = async(req, res) => {
    try{
        const {usuario, passwrd} = req.body
        const [rows] = await pool.query('SELECT * FROM DIGITADOR WHERE usuario = ? AND passwrd = ? AND estado = ?', [usuario, passwrd, 'A'])
        
        if(rows.length <= 0) return res.status(404).json({
            message: 'Digitador not fount'
        })

        res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getDigitador = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM DIGITADOR WHERE estado = ?', 'A')
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getDigitadorId = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM DIGITADOR WHERE id_digitador = ?', [req.params.id])
    
        if(rows.length <= 0) return res.status(404).json({
            message: 'Digitador not fount'
        })
    
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const createDigitador = async (req, res) => {
    try{
        const {nombre, apellidos, dni, telefono, email, usuario, passwrd, estado} = req.body
        const [rows] = await pool.query('INSERT INTO DIGITADOR (nombre, apellidos, dni, telefono, email, usuario, passwrd, estado) VALUES (?,?,?,?,?,?,?,?)', [nombre, apellidos, dni, telefono, email, usuario, passwrd, estado])

        res.send({
            id: rows.insertId,
            nombre,
            apellidos,
            dni,
            telefono,
            email,
            usuario,
            passwrd,
            estado
        })
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
        const {nombre, apellidos, dni, telefono, email, usuario, passwrd, estado} = req.body
        
        const [result] = await pool.query('UPDATE DIGITADOR SET nombre = IFNULL(?, nombre), apellidos = IFNULL(?, apellidos), dni = IFNULL(?, dni), telefono = IFNULL(?, telefono), email = IFNULL(?, email), usuario = IFNULL(?, usuario), passwrd = IFNULL(?, passwrd), estado = IFNULL(?,estado) WHERE id_digitador = ?',[nombre, apellidos, dni, telefono, email, usuario, passwrd, estado, id])
    
        if(result.affectedRows == 0) return res.status(404).json({
            message: 'Digitador not fount'
        })
    
        const [rows] = await pool.query('SELECT * FROM DIGITADOR WHERE id_digitador = ?', [id])
    
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const deleteDigitador = async(req, res) => {

    try{
        const [result] = await pool.query('DELETE FROM DIGITADOR WHERE id_digitador = ?', [req.params.id])
    
        if(result.affectedRows <= 0 ) return res.status(404).json({
            message: 'Digitador not fount'
        })
    
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}