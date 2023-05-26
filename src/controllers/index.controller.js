import {pool} from '../db.js'

export const ping = async (req, res) => {
    //const [result] = await pool.query('SELECT "SI HAY CONEXION CON LA BD" AS result')

    try{
        const consulta = `CREATE TABLE DATOS(
            id_user varchar(7) primary key,
            dni char(8) not null,
            telefono char(9) null,
            email varchar(128) not null,
            usuario varchar(80) not null,
            passwrd varchar(80) not null,
            CONSTRAINT uq_dni UNIQUE (dni),
            CONSTRAINT uq_usuario UNIQUE (usuario),
            CONSTRAINT ck_dni CHECK (dni REGEXP '^[0-9]{8}$'),
            CONSTRAINT ck_telefono CHECK (telefono REGEXP '^[0-9]{9}$'),
            CONSTRAINT ck_email CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
        )`; 
    
     
        const [result] = await pool.query(consulta);
    
    
        res.json(result);

        }
        catch(error){
            res.json('ocurrio un error');
        }
    }