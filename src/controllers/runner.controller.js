import { pool } from '../db.js'

export const getRunner = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM RUNNER WHERE estado = ?', 'A')
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getRunnerId = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM RUNNER WHERE id_runner = ?', [req.params.id])
    
        if(rows.length <= 0) return res.status(404).json({
            message: 'Runner not fount'
        })
    
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const createRunner = async (req, res) => {
    try{
        const {nombre, apellidos, dni, telefono, email, usuario, passwrd, estado} = req.body
        const [rows] = await pool.query('INSERT INTO RUNNER (nombre, apellidos, dni, telefono, email, usuario, passwrd, estado) VALUES (?,?,?,?,?,?,?,?)', [nombre, apellidos, dni, telefono, email, usuario, passwrd, estado])

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

export const updateRunner = async(req, res) => {

    try{
        const {id} = req.params
        const {nombre, apellidos, dni, telefono, email, usuario, passwrd, estado} = req.body
        
        const [result] = await pool.query('UPDATE RUNNER SET nombre = IFNULL(?, nombre), apellidos = IFNULL(?, apellidos), dni = IFNULL(?, dni), telefono = IFNULL(?, telefono), email = IFNULL(?, email), usuario = IFNULL(?, usuario), passwrd = IFNULL(?, passwrd), estado = IFNULL(?,estado) WHERE id_runner = ?',[nombre, apellidos, dni, telefono, email, usuario, passwrd, estado, id])
    
        if(result.affectedRows == 0) return res.status(404).json({
            message: 'Runner not fount'
        })
    
        const [rows] = await pool.query('SELECT * FROM RUNNER WHERE id_runner = ?', [id])
    
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const deleteRunner = async(req, res) => {

    try{
        const [result] = await pool.query('DELETE FROM RUNNER WHERE id_runner = ?', [req.params.id])
    
        if(result.affectedRows <= 0 ) return res.status(404).json({
            message: 'Runner not fount'
        })
    
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}