import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    const er = '';
    try{
        const consulta = `show tables;`; 
    
     
        const [result] = await pool.query(consulta);
    
        er = result;

        res.json(result);

        }
        catch(error){
            res.json(error);
        }
    }