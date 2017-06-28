const supertest = require('supertest');
const app = require('../index');

const nock = require('nock');

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

nock.back.fixtures = `${process.cwd()}/test/cassettes`;
nock.back.setMode('record');

const request = supertest(app.listen());

describe('index', () => {
  test('records the response', async () => {
    // Fails too: TypeError: Cannot read property 'status' of undefined
    // ...and the recorded fixture is an empty array.
    /* await new Promise((resolve, reject) => {
      nock.back('fixture.json', async (done) => {
        try {
          const { body } = await request.get('/test').set('Accept', 'application/json').set('Content-Type', 'application/json').expect(200)

          expect(body).toMatchSnapshot();

          resolve();
        } catch (err) {
          reject(err);
        }

        done();
      });
    }); */

    const { body } = await request.get('/test').set('Accept', 'application/json').set('Content-Type', 'application/json').expect(200)

    expect(body).toMatchSnapshot();
  });
});