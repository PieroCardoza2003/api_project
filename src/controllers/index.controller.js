import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_lista_sucursal(
	IN estado char(1)
)
BEGIN
	IF estado = 'A' THEN
		SELECT * FROM SUCURSAL WHERE estado = 'A';
	ELSEIF estado = 'I' THEN
		SELECT * FROM SUCURSAL WHERE estado = 'I';
	ELSE 
		SELECT '1' fallo;
	END IF;
END`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
