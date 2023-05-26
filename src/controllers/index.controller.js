import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `show tables`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
