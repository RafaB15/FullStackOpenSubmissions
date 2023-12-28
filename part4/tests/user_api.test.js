const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const Test = require('supertest/lib/test')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await User.find({})
        
        const newUser = {
            username: 'Rafiña',
            name: 'Rafael',
            password: '123456',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const newUser = new User({
            username: 'root',
            name: 'Superuser',
            password: '123456'
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with proper statuscode and message if username is less than 3 characters long', async () => {
        const newUser = new User({
            username: 'ro',
            password: '123456'
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })  

    test('creation fails with proper statuscode and message if password is less than 3 characters long', async () => {
        const newUser = new User({
            username: 'Elefante',
            password: '12'
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with proper statuscode and message if username is missing', async () => {
        const newUser = new User({
            password: '123456'
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('creation fails with proper statuscode and message if password is missing', async () => {
        const newUser = new User({
            username: 'Eliot',
        })

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})