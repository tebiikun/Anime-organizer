const supertest = require('supertest');
const app = require('../../server.js')

afterEach(async () => {
    await app.close()
} );

describe('THIS IS A TEST OF TEST', () => {
    it('POST without NOTHING', async () => {
        const response = await supertest(app).post('/api/user')
    })
});