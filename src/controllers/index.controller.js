import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_lista_digitador(
	IN codigo varchar(7)
)
BEGIN
	IF LENGTH(codigo) = 7 THEN
		SELECT * FROM DIGITADOR di inner join DATOS d ON di.id_digitador = d.id_user where di.id_digitador = codigo;
	ELSEIF codigo = 'I' THEN
		SELECT * FROM DIGITADOR di inner join DATOS d ON di.id_digitador = d.id_user where di.estado = 'I';
    ELSEIF codigo = 'A' THEN
		SELECT * FROM DIGITADOR di inner join DATOS d ON di.id_digitador = d.id_user where di.estado = 'A';
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
