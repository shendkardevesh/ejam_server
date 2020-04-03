require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const logger = require('tracer').colorConsole();
const app = express();
const morgan = require('morgan');

const apiRoutes = require('./routes/api');

app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('API running');
});
app.use('/weather', apiRoutes);

const port = app.get('port');
const server = http.createServer(app);
server.listen(port);

server.on('error', (error) => {
  logger.error(error);
});

server.on('listening', () => {
  logger.info('server started successfully on port:', port);  
})
