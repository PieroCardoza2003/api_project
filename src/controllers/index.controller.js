import {pool} from '../db.js'

export const ping = async (req, res) => {
    // const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta = `CREATE PROCEDURE sp_lista_administrador(
            IN codigo varchar(7)
        )
        BEGIN
            IF LENGTH(codigo) = 7 THEN
                SELECT * FROM ADMINISTRADOR a INNER JOIN DATOS d ON a.id_admin = d.id_user where a.id_admin = codigo;
            ELSEIF codigo = 'I' THEN
                SELECT * FROM ADMINISTRADOR a INNER JOIN DATOS d ON a.id_admin = d.id_user WHERE a.estado = 'I';
            ELSEIF codigo = 'A' THEN
                SELECT * FROM ADMINISTRADOR a INNER JOIN DATOS d ON a.id_admin = d.id_user WHERE a.estado = 'A';
            ELSE 
                SELECT '1' fallo;
            END IF;
        END`; 
    
     
        const [result] = await pool.query(consulta);

        res.json(result);

        }
        catch(error){
            res.json(error);
        }
    }
