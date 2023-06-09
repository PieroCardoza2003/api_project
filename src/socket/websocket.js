import { WebSocketServer } from 'ws';
import { pool } from '../db.js'

let wss;

const initWebSocketServer = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', async (ws) => {
    console.log('Nuevo cliente WebSocket conectado');

    //ws.send('Bienvenido al servidor WebSocket');

    const data = await getData();
    ws.send(JSON.stringify(data));

    // Manejar el cierre de la conexión del cliente
    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });
};

const broadcastMessage = async(req, res, next) => {

  wss.clients.forEach(async(client) => {

    if (client.readyState === client.OPEN) {
      //client.send('SE REGISTRO UNA SUCURSAL NUEVA');
      const data = await getData();
      client.send(JSON.stringify(data));
    }
  });

  //next();
};


const getData = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM SUCURSAL WHERE estado = ?', 'A')
    return rows;
  } catch (error) {
    console.log('Error al obtener los datos de la tabla:', error);
    return null;
  }
};


export { initWebSocketServer, broadcastMessage };
