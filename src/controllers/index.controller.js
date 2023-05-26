import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE FUNCTION fn_generar_codigo() RETURNS varchar(7)
    READS SQL DATA
    DETERMINISTIC
BEGIN
    DECLARE codigo VARCHAR(7);
    DECLARE codigo_existe INT;

    REPEAT
        SET codigo = LPAD(FLOOR(RAND() * 10000000), 7, '0');
        SELECT COUNT(*) INTO codigo_existe FROM DATOS WHERE id_user = codigo;
    UNTIL codigo_existe = 0 END REPEAT;

	RETURN codigo;
END`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
