const supertest = require('supertest');
const app = require('../../server.js')

// const request = supertest(app)

afterEach(async () => {
    await app.close()
} );


describe('Creating a new user', () => {

    it('POST without request body should be throw an error', async () => {
        const response = await supertest(app).post('/api/user')
        expect(response.status).toBe(400)
    })

    it('POST without user should be throw an error', async () => {
        const response = await supertest(app).post('/api/user').send({})
        expect(response.status).toBe(400)
    })

    it('user should be created correctly', async () => {

        const testUser = {
            name: 'testUser',
            username: 'testUsername'
        }

        const response = await supertest(app).post('/api/user').send(testUser)
        expect(response.status).toBe(201)
    })
    
});

describe('Updating an existing user', () => {
    
    it('PUT without existent user should be thrown an error', async () => {
        const response = await supertest(app).put('/api/user/NOUSER')
        expect(response.status).toBe(404)
    })

    it('PUT with existent user should be updated correctly', async () => {

        const newUser = {
            name: 'testUser',
            username: 'testUsername'
        }

        const userCreated = await supertest(app).post('/api/user').send(newUser)

        const updatedUser = {
            name: 'testUserModified',
            username: 'testUsernameModified'
        }

        const response = await supertest(app).put(`/api/user/${userCreated.body.id}`).send(updatedUser)
        expect(response.status).toBe(200)
    })

});

describe('Updating an existing user', () => {
    
    it('PUT without existent user should be thrown an error', async () => {
        const response = await supertest(app).put('/api/user/INEXISTENT_USER')
        expect(response.status).toBe(404)
    })

    it('PUT with existent user should be updated correctly', async () => {

        const newUser = {
            name: 'testUser',
            username: 'testUsername'
        }

        const userCreated = await supertest(app).post('/api/user').send(newUser)

        const updatedUser = {
            name: 'testUserModified',
            username: 'testUsernameModified'
        }

        const response = await supertest(app).put(`/api/user/${userCreated.body.id}`).send(updatedUser)
        expect(response.status).toBe(200)
    })

});

describe('Deleting an existing user', () => {
    
    it('DELETE without existent user should be throw an error', async () => {

        const response = await supertest(app).delete(`/api/user/aaaaa6adfed6a746700aef0a`)
        expect(response.status).toBe(404)
    })

    it('DELETE with existent user should be deleted correctly', async () => {

        const newUser = {
            name: 'testUser',
            username: 'testUsername'
        }

        const userCreated = await supertest(app).post('/api/user').send(newUser)
        const response = await supertest(app).delete(`/api/user/${userCreated.body.id}`)
        expect(response.status).toBe(200)
    })

});

describe('Getting an existing user', () => {
    
    fit('GET without existent user should be throw an error', async () => {
        const response = await supertest(app).get(`/api/user/aaaab6adfed6a746700aef0a`)
        
        console.log(response.body)
        expect(response.status).toBe(404)
    })

    it('GET with existent user should be get user correctly', async () => {

        const newUser = {
            name: 'testUser',
            username: 'testUsername'
        }

        const userCreated = await supertest(app).post('/api/user').send(newUser)
        const response = await supertest(app).get(`/api/user/${userCreated.body.id}`)
        expect(response.status).toBe(200)
    })

});