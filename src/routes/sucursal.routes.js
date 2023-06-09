import { Router } from 'express'
import { broadcastMessage } from '../socket/websocket.js';
import { getSucursal,createSucursal,
updateSucursal,deleteSucursal,getSucursalId } from '../controllers/sucursal.controller.js'

const router = Router()

router.get('/sucursal', getSucursal)

router.get('/sucursal/:id', getSucursalId)

//router.post('/sucursal', createSucursal)
router.post('/sucursal', createSucursal, broadcastMessage)

router.patch('/sucursal/:id', updateSucursal)

router.delete('/sucursal/:id', deleteSucursal)

export default router