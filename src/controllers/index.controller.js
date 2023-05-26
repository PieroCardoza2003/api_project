import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta = `DROP TABLE DIGITADOR`; 
        const consulta2 = `DROP TABLE ADMINISTRADOR`; 
        const consulta3 = `show tables`; 
        
    
     
        const [result] = await pool.query(consulta);
        const [res2] = await pool.query(consulta2);
        const [res3] = await pool.query(consulta3);
        res.json(result, res2, res3);

        }
        catch(error){
            res.json(error);
        }
    }
