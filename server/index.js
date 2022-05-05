const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);
const { PORT } = config;

server.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});