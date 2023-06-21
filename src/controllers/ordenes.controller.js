import { pool } from '../db.js'

export const getOrdenDisponible = async () => {
    try {
        const [rows] = await pool.query('CALL sp_lista_ordenes(?,?)', [0,'']);
      return rows[0];
    } catch (error) {
        return 'Ocurrio un error';
    }
};

export const getOrdenTomada = async () => {
    try {
      const [rows] = await pool.query('CALL sp_lista_ordenes(?,?)', [1,'']);
      return rows[0];
    } catch (error) {
        return 'Ocurrio un error';
    }
};

export const getOrdenRuta = async () => {
    try {
      const [rows] = await pool.query('CALL sp_lista_ordenes(?,?)', [2,'']);
      return rows[0];
    } catch (error) {
        return 'Ocurrio un error';
    }
};

export const getOrdenPitstop = async () => {
    try {
      const [rows] = await pool.query('CALL sp_lista_ordenes(?,?)', [3,'']);
      return rows[0];
    } catch (error) {
        return 'Ocurrio un error';
    }
};

export const ordenesEntregadas = async (req, res,) => {
    try {
        const [rows] = await pool.query('CALL sp_lista_ordenes(?,?)', [4, '']);
        res.json(rows[0])
    } catch (error) {
        return 'Ocurrio un error';
    }
};

export const ordenDisponible = async (req, res, next) => {

    try{
        const {codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden} = req.body

        const [rows] = await pool.query('CALL sp_orden_disponible(?,?,?,?,?,?)', [codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
            next() //avisar a los clientes del websocket que se hubo un cambio
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const ordentomada = async (req, res, next) => {

    try{
        const {id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, runner} = req.body

        const [rows] = await pool.query('CALL sp_orden_tomada(?,?,?,?,?,?,?,?)', [id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, runner])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
            
            next() //avisar a los clientes del websocket que se hubo un cambio
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const ordenenRuta = async (req, res, next) => {

    try{
        const {id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, hora_recojo, runner} = req.body

        const [rows] = await pool.query('CALL sp_orden_en_ruta(?,?,?,?,?,?,?,?,?)', [id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, hora_recojo, runner])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
            
            next() //avisar a los clientes del websocket que se hubo un cambio
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const eliminaOrdenTomada = async(req, res, next) => {

    try{
        const [result] = await pool.query('DELETE FROM ORDENESTOMADAS WHERE id_orden = ?', [req.params.id])
    
        if(result.affectedRows <= 0 ) return res.status(404).json({
            message: 'orden not fount'
        })
    
        res.json({fallo: "0"})
        next() //avisar a los clientes del websocket que se hubo un cambio
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

export const eliminaOrdenDisponible = async(req, res, next) => {

    try{
        const [result] = await pool.query('DELETE FROM ORDENESDISPONIBLES WHERE id_orden = ?', [req.params.id])
    
        if(result.affectedRows <= 0 ) return res.status(404).json({
            message: 'orden not fount'
        })
    
        res.json({fallo: "0"})
        next() //avisar a los clientes del websocket que se hubo un cambio
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const cancelaOrdenTomadaRunner = async (req, res, next) => {

    try{
        const {id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden} = req.body

        const [rows] = await pool.query('CALL sp_cancela_orden_tomada_runner(?,?,?,?,?,?,?)', [id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden])
 
        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        
        res.json({fallo: "0"})
        next() //avisar a los clientes del websocket que se hubo un cambio
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error '
        })
    }
}

export const cancelaOrdenRutaRunner = async (req, res, next) => {

    try{
        const {id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, runner} = req.body

        const [rows] = await pool.query('CALL sp_cancela_orden_ruta_runner(?,?,?,?,?,?,?,?)', [id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, runner])
 
        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        
        res.json({fallo: "0"})
        next() //avisar a los clientes del websocket que se hubo un cambio
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error '
        })
    }
}


export const ordenPitstop = async (req, res, next) => {

    try{
        const {id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, hora_recojo, hora_entrega, runner} = req.body

        const [rows] = await pool.query('CALL sp_entrega_pitstop(?,?,?,?,?,?,?,?,?,?)', [id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, hora_recojo, hora_entrega, runner])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
            
            next() //avisar a los clientes del websocket que se hubo un cambio
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}


export const registrarOrden = async (req, res, next) => {

    try{
        const {id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, hora_recojo, hora_entrega, runner, receptor_orden, hora_envio, estado} = req.body

        const [rows] = await pool.query('CALL sp_registrar_orden(?,?,?,?,?,?,?,?,?,?,?,?,?)', [id_orden, codigo_pedido, sucursal, precio, app, creador_orden, fechaOrden, hora_recojo, hora_entrega, runner, receptor_orden, hora_envio, estado])

        if(rows[0].length <= 0 || rows[0][0].fallo === "1"){
            return res.status(404).json({ fallo: "1" })
        }
        else{
            res.json(rows[0][0])
            next() //avisar a los clientes del websocket que se hubo un cambio
        }
    }
    catch(error){
        return res.status(500).json({
            message: 'Ocurrio algun error'
        })
    }
}

