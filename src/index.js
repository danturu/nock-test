const Koa = require('koa');
const Router = require('koa-router');
const request = require('superagent');

const app = new Koa();
const router = new Router();

router.get('/test', async (ctx) => {
  const { body } = await request.get('http://echo.jsontest.com/key/value');

  ctx.body = body;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;