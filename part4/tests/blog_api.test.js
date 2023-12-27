const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('React patterns')
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('we can make a post request succesfully', async () => {
    const newBlog = {
        title: "Test blog",
        url: "http://www.test.com",
        likes: 7
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.title).toBe(newBlog.title)
    
    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
})

test('if likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: "Test blog",
        url: "http://www.test.com",
    }
    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
})

test('if title or url properties are missing from the request, the backend responds with the status code 400 Bad Request', async () => {
    const newBlog = {
        url: "http://www.test.com",
    }
    await api.post('/api/blogs').send(newBlog).expect(400)

    const newBlog2 = {
        title: "Test blog",
    }
    await api.post('/api/blogs').send(newBlog2).expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
})