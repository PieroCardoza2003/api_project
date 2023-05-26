import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_iniciar_sesion(
	IN _usuario varchar(80),
    IN _passwrd varchar(80)
)
BEGIN
	DECLARE nivel varchar(1);
    DECLARE fallo varchar(7) DEFAULT 'x';
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT '1' as fallo;
    END;
    
    START TRANSACTION;

    SELECT COALESCE(RIGHT(_usuario, 1), '6') INTO nivel;

		IF nivel = '0' THEN
			SELECT d.id_user INTO fallo FROM DATOS d 
				INNER JOIN ADMINISTRADOR a ON d.id_user = a.id_admin 
			WHERE d.usuario = _usuario AND d.passwrd = _passwrd AND a.estado = 'A';
		ELSEIF nivel = '1' THEN
			SELECT d.id_user INTO fallo FROM DATOS d 
				INNER JOIN DIGITADOR di ON d.id_user = di.id_digitador 
			WHERE d.usuario = _usuario AND d.passwrd = _passwrd AND di.estado = 'A';
        ELSEIF nivel = '2' THEN
			SELECT d.id_user INTO fallo FROM DATOS d 
				INNER JOIN RUNNER r ON d.id_user = r.id_runner 
			WHERE d.usuario = _usuario AND d.passwrd = _passwrd AND r.estado = 'A';
		ELSE
			SELECT '1' as fallo;
        END IF;

        IF LENGTH(fallo) = 7 THEN
			SELECT fallo;
		ELSE
			SELECT '1' fallo;
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
