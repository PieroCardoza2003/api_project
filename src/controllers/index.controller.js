import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_cambiar_estado(
	IN _codigo varchar(7),
    IN _estado varchar(1),
    IN _nivel int
)
BEGIN
	DECLARE existe int default 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT '1' as fallo;
    END;

    START TRANSACTION;
    Select count(*) into existe from DATOS WHERE id_user = _codigo; 
    
		IF _nivel = 0 AND existe = 1 THEN
			UPDATE ADMINISTRADOR SET estado = _estado  WHERE id_admin = _codigo;
            SELECT '0' as fallo;
		ELSEIF _nivel = 1 AND existe = 1 THEN
			UPDATE DIGITADOR SET estado = _estado WHERE id_digitador = _codigo;
            SELECT '0' as fallo;
		ELSEIF _nivel = 2 AND existe = 1 THEN
			UPDATE RUNNER SET estado = _estado WHERE id_runner = _codigo;
            SELECT '0' as fallo;
		ELSE
			ROLLBACK;
            SELECT '1' as fallo;
		END IF;
    COMMIT;
END`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
