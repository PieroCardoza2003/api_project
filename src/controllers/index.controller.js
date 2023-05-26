import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE TABLE SUCURSAL(
	id_sucursal int auto_increment primary key,
	razonSocial varchar(128) not null,
	email varchar(128) null,
    estado char(1),
    CONSTRAINT uq_razonSocial UNIQUE (razonSocial),
    CONSTRAINT ck_estado_sucursal CHECK (estado IN ('A', 'I')),
    CONSTRAINT ck_email_sucursal CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
)`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
