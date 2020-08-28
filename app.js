const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const appConfig = require('./configs/app');
const ExchangeRoute = require('./routes/exchange');
const cors = require('@koa/cors');
const app = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(ExchangeRoute.routes());

const server = app.listen(appConfig.NODE_PORT).on('error', err => {
   console.log(err);
});
module.exports = server;