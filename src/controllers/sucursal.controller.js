import { pool } from '../db.js'

export const getSucursal = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM SUCURSAL WHERE estado = ?', 'A')
        
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getSucursalId = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM SUCURSAL WHERE id_sucursal = ?', [req.params.id])
    
        if(rows.length <= 0) return res.status(404).json({
            message: 'Sucursal not fount'
        })
    
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const createSucursal = async (req, res) => {
    try{
        const {razonSocial, email, estado} = req.body
        const [rows] = await pool.query('INSERT INTO SUCURSAL (razonSocial, email, estado) VALUES (?,?,?)', [razonSocial, email,estado])

        res.send({
            id: rows.insertId,
            razonSocial,
            email,
            estado
        })
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const updateSucursal = async(req, res) => {

    try{
        const {id} = req.params
        const {razonSocial, email, estado} = req.body
        
        const [result] = await pool.query('UPDATE SUCURSAL SET razonSocial = IFNULL(?, razonSocial), email = IFNULL(?, email), estado = IFNULL(?,estado) WHERE id_sucursal = ?',[razonSocial, email,estado, id])
    
        if(result.affectedRows == 0) return res.status(404).json({
            message: 'Sucursal not fount'
        })
    
        const [rows] = await pool.query('SELECT * FROM SUCURSAL WHERE id_sucursal = ?', [id])
    
        res.json(rows[0])
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const deleteSucursal = async(req, res) => {

    try{
        const [result] = await pool.query('DELETE FROM SUCURSAL WHERE id_sucursal = ?', [req.params.id])
    
        if(result.affectedRows <= 0 ) return res.status(404).json({
            message: 'Sucursal not fount'
        })
    
        res.sendStatus(204)
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}