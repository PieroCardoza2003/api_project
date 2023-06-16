import { WebSocketServer } from 'ws';
import { getOrdenDisponible, getOrdenRuta, getOrdenTomada } from '../controllers/ordenes.controller.js'

let wss;

const initWebSocketServer = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', async (ws) => {
    console.log('Nuevo cliente WebSocket conectado');


    ws.on('message', async (message) => {
      
      if(message.toString() === 'ordenesTomadas'){
        const data = await getOrdenTomada();
        ws.send("OT"+JSON.stringify(data));
      }

      if(message.toString() === 'ordenesDisponibles'){
        const data = await getOrdenDisponible();
        ws.send("OD"+JSON.stringify(data));
      }

      if(message.toString() === 'ordenesRuta'){
        const data = await getOrdenRuta();
        ws.send("OR"+JSON.stringify(data));
      }

    });


    ws.on('close', () => {
      console.log('Cliente desconectado');
    });
  });
};


const broadcastOD = async(req, res, next) => {
  console.log('En broadcast OD');
  wss.clients.forEach(async(client) => {

    if (client.readyState === client.OPEN) {
      const data = await getOrdenDisponible();
      client.send("OD"+JSON.stringify(data));
    }
  });
};

const broadcastOT = async(req, res, next) => {
  console.log('En broadcast OT');
  wss.clients.forEach(async(client) => {

    if (client.readyState === client.OPEN) {
      const data = await getOrdenTomada();
      client.send("OT"+JSON.stringify(data));
    }
  });
  await broadcastOD(req, res, next); //enviar actualizacion por broadcastOD
};

const broadcastOR = async(req, res, next) => {
  console.log('En broadcast OR');
  wss.clients.forEach(async(client) => {

    if (client.readyState === client.OPEN) {
      const data = await getOrdenRuta();
      client.send("OR"+JSON.stringify(data));
    }
  });
  await broadcastOT(req, res, next); //enviar actualizacion por broadcastOT
};


export { initWebSocketServer, broadcastOD, broadcastOT,  broadcastOR};
