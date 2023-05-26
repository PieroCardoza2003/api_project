import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE FUNCTION fn_generar_usuario(nombre varchar(80), apellido varchar(80), nivel int) RETURNS varchar(80)
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE _usuario VARCHAR(80);
    DECLARE existe INT;

    REPEAT
        SET _usuario = LOWER(CONCAT(TRIM(SUBSTRING_INDEX(nombre, ' ', 1)) ,'.', TRIM(SUBSTRING_INDEX(apellido, ' ', 1)) , LPAD(FLOOR(RAND() * 100), 2, '0') , nivel));
        SELECT COUNT(*) INTO existe FROM DATOS WHERE usuario = _usuario;
    UNTIL existe = 0 END REPEAT;

	RETURN _usuario;
END`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
