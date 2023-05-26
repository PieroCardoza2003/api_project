import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_actualizar(
	IN _codigo varchar(7),
	IN _nombre varchar(80),
	IN _apellidos varchar(80),
	IN _dni char(8),
	IN _telefono char(9),
	IN _email varchar(128),
	IN _usuario varchar(80),
	IN _passwrd varchar(80),
	IN _nivel int
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT '1' as fallo;
    END;

    START TRANSACTION;
    
    UPDATE DATOS SET dni = _dni , telefono = _telefono, email = LOWER(_email), usuario = LOWER(_usuario), passwrd = _passwrd WHERE id_user = _codigo;
    
		CASE _nivel -- | 0: admin | 1: digitador | 2: runner |
			WHEN 0 THEN
				UPDATE ADMINISTRADOR SET nombre = UPPER(_nombre) , apellidos = UPPER(_apellidos) WHERE id_admin = _codigo;
			WHEN 1 THEN
				UPDATE DIGITADOR SET nombre = UPPER(_nombre) , apellidos = UPPER(_apellidos) WHERE id_digitador = _codigo;
			WHEN 2 THEN
				UPDATE RUNNER SET nombre = UPPER(_nombre) , apellidos = UPPER(_apellidos) WHERE id_runner = _codigo;
			ELSE
				ROLLBACK;
		END CASE;
    COMMIT;
    SELECT '0' as fallo;
END`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
