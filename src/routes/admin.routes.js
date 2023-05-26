import { Router } from 'express'
import { getAdmin,createAdmin,autenticarAdmin,
updateAdmin,deleteAdmin,getAdminId,estadoAdmin,cambiarPassAdmin } from '../controllers/admin.controller.js'

const router = Router()

router.get('/admin', getAdmin)

router.get('/admin/:id', getAdminId)

router.post('/admin', createAdmin)

router.post('/loginadmin', autenticarAdmin)

router.post('/estadoadmin/:id', estadoAdmin)

router.post('/passadmin/:id', cambiarPassAdmin)

router.patch('/admin/:id', updateAdmin)

router.delete('/admin/:id', deleteAdmin)

export default router