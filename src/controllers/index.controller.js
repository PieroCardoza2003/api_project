import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    const [result] = await pool.query('show tables')
    res.json(result[0])
}
