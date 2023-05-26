import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_cambiar_pass(
	IN _codigo varchar(7),
    IN _oldpasswrd varchar(80),
    IN _newpasswrd varchar(80)
)
BEGIN
	DECLARE existe INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT '1' as fallo;
    END;
    
    START TRANSACTION;
    SELECT COUNT(*) INTO existe FROM DATOS WHERE id_user = _codigo and passwrd = _oldpasswrd;
		IF existe > 0 THEN
			UPDATE DATOS SET passwrd = _newpasswrd WHERE id_user = _codigo;
            SELECT '0' as fallo;
		ELSE
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
