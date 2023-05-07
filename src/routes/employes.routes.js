import { Router } from 'express'
import { getEmployees,createEmployees,
updateEmployees,deleteEmployees,getEmployeesId } from '../controllers/employees.controller.js'

const router = Router()

router.get('/employees', getEmployees)

router.get('/employees/:id', getEmployeesId)

router.post('/employees', createEmployees)

router.patch('/employees/:id', updateEmployees)

router.delete('/employees/:id', deleteEmployees)

export default router