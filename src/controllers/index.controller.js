import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE PROCEDURE sp_insertar(
	IN _nombre varchar(80),
	IN _apellidos varchar(80),
	IN _dni char(8),
	IN _telefono char(9),
	IN _email varchar(128),
	IN _nivel int
)
BEGIN
    DECLARE codigo VARCHAR(7);
    DECLARE _usuario VARCHAR(80);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT '1' as fallo;
    END;

    START TRANSACTION;
    
    SET codigo = fn_generar_codigo();
    SET _usuario = fn_generar_usuario(_nombre, _apellidos, _nivel);
    
    INSERT INTO DATOS VALUES(codigo , _dni , _telefono, LOWER(_email), _usuario, _dni);
    
		CASE _nivel -- | 0: admin | 1: digitador | 2: runner |
			WHEN 0 THEN
				INSERT INTO ADMINISTRADOR VALUES(codigo , UPPER(_nombre) , UPPER(_apellidos) , 'A');
			WHEN 1 THEN
				INSERT INTO DIGITADOR VALUES(codigo , UPPER(_nombre) , UPPER(_apellidos) , 'A');
			WHEN 2 THEN
				INSERT INTO RUNNER VALUES(codigo , UPPER(_nombre) , UPPER(_apellidos) , 'A');
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
