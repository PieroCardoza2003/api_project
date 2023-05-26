import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta3 = `CREATE TABLE RUNNER(
	id_runner varchar(7) primary key,
	nombre varchar(80) not null,
	apellidos varchar(80) not null,
	estado char(1) not null,
    CONSTRAINT ck_estado CHECK (estado IN ('A', 'I')),
    CONSTRAINT fk_datos_runner FOREIGN KEY (id_runner) REFERENCES DATOS(id_user) ON DELETE CASCADE
)`; 
        
    
        const [res3] = await pool.query(consulta3);
        res.json(res3);

        }
        catch(error){
            res.json(error);
        }
    }
