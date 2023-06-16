import { pool } from '../db.js'

export const getSucursal = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM SUCURSAL')
        
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
        const {razonSocial, email} = req.body
        const [rows] = await pool.query('INSERT INTO SUCURSAL (razonSocial, email, estado) VALUES (?,?,?)', [razonSocial, email,'A'])

        res.json({fallo: "0"})
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
    
        if(result.affectedRows == 0) return res.status(404).json({ fallo: "1" })
    
        res.json({fallo: "0"})
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
    
        res.json({fallo: "0"})
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}