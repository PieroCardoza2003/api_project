import express from 'express'
import employeesRoutes from './routes/employes.routes.js'
import sucursalRoutes from './routes/sucursal.routes.js'
import runnerRoutes from './routes/runner.routes.js'
import digitadorRoutes from './routes/digitador.routes.js'
import adminRoutes from './routes/admin.routes.js'
import ordenesRoutes from './routes/ordenes.routes.js'
import appRoutes from './routes/app.routes.js'
import indexRoutes from './routes/index.routes.js'
import mensajeValidador from './routes/services.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)

app.use('/api' , ordenesRoutes)
app.use('/api' , appRoutes)
app.use('/api', sucursalRoutes)
app.use('/api', runnerRoutes)
app.use('/api', digitadorRoutes)
app.use('/api', adminRoutes)
app.use('/api', mensajeValidador)
app.use('/api' , employeesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: 'la ruta no existe'
    })
})


export default app;