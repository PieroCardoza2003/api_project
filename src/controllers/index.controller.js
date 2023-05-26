import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_lista_runner(
	IN codigo varchar(7)
)
BEGIN
	IF LENGTH(codigo) = 7 THEN
		SELECT * FROM RUNNER r inner join DATOS d ON r.id_runner = d.id_user where r.id_runner = codigo;
	ELSEIF codigo = 'I' THEN
		SELECT * FROM RUNNER r inner join DATOS d ON r.id_runner = d.id_user where r.estado = 'I';
    ELSEIF codigo = 'A' THEN
		SELECT * FROM RUNNER r inner join DATOS d ON r.id_runner = d.id_user where r.estado = 'A';
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
