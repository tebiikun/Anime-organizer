const supertest = require('supertest');
const app = require('../../server.js')

afterEach(async () => {
    await app.close()
} );

describe('Getting an existing user1', () => {
    
    it('GET without existent user should be throw an error1', async () => {
        const response = await supertest(app).get(`/api/user/aaaab6adfed6a746700aef0a`)
        expect(response.status).toBe(404)
    })

    it('GET with existent user should be get user correctly1', async () => {

        const newUser = {
            name: 'testUser',
            username: 'testUsername'
        }

        const userCreated = await supertest(app).post('/api/user').send(newUser)
        const response = await supertest(app).get(`/api/user/${userCreated.body.id}`)
        expect(response.status).toBe(200)
    })

});