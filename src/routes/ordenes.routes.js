import { Router } from 'express'
import { ordenDisponible, ordenenRuta, ordentomada,ordenPitstop, ordenesEntregadas,
    eliminaOrdenRunner, cancelaOrdenTomadaRunner, cancelaOrdenRutaRunner, registrarOrden } from '../controllers/ordenes.controller.js'
import { broadcastOT,broadcastOD, broadcastOR, broadcastOP } from '../socket/websocket.js';

const router = Router()

router.get('/ordenesentregadas/:id', ordenesEntregadas)

router.post('/ordendisponible', ordenDisponible, broadcastOD)
router.post('/ordentomada', ordentomada, broadcastOT)
router.post('/ordenenruta', ordenenRuta, broadcastOR)
router.post('/ordenpitstop', ordenPitstop, broadcastOP)

router.post('/entregapitstop', registrarOrden, broadcastOR)

router.post('/cancelaordentomadarunner', cancelaOrdenTomadaRunner, broadcastOT)

router.post('/cancelaordenrutarunner', cancelaOrdenRutaRunner, broadcastOR)

router.delete('/eliminaordenrunner/:id', eliminaOrdenRunner, broadcastOT)


export default router