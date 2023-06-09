import app from './app.js';
import { PORT } from './config.js';
import { initWebSocketServer } from './socket/websocket.js';

const server = app.listen(PORT, () => {
  console.log('Servidor API en funcionamiento');
});

initWebSocketServer(server);
