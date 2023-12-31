const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 })
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const blogBody = request.body

  const user = request.user

  if (!blogBody.title || !blogBody.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog({
    title: blogBody.title,
    url: blogBody.url,
    likes: blogBody.likes,
    author: blogBody.author,
    user: user._id
  })
  
  const savedBlog = await blog.save()
  const populatedBlog = await Blog.populate(savedBlog, { path: 'user', select: 'username _id' })
  response.status(201).json(populatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)

  if(!blogToDelete) {
    return response.status(204).end()
  }

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: 'only the creator of the blog can delete it'
    })
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blogBody = request.body
  if (!blogBody.title || !blogBody.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = {
    title: blogBody.title,
    url: blogBody.url,
    likes: blogBody.likes,
    author: blogBody.author,
    user: blogBody.user ? blogBody.user.id : undefined,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter