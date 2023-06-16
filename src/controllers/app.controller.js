import { pool } from '../db.js'

export const getApp = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM APP')
        
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const getAppActivas = async(req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM APP WHERE estado = ?', 'A')
        
        res.json(rows)
    }catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const createApp = async (req, res, next) => {
    try{
        const {nombre} = req.body
        const [rows] = await pool.query('CALL sp_inserta_app(?)', [nombre])

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

export const updateApp = async(req, res) => {

    try{
        const {id} = req.params
        const {nombre, estado} = req.body
        
        const [result] = await pool.query('UPDATE APP SET nombre = IFNULL(?, nombre), estado = IFNULL(?,estado) WHERE id_app = ?',[nombre ,estado, id])
    
        if(result.affectedRows == 0) return res.status(404).json({ fallo: "1" })
    
        res.json({fallo: "0"})
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const deleteApp = async(req, res) => {

    try{
        const [result] = await pool.query('DELETE FROM APP WHERE id_app = ?', [req.params.id])
    
        if(result.affectedRows <= 0 ) return res.status(404).json({
            message: 'app not fount'
        })
    
        res.json({fallo: "0"})
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}
