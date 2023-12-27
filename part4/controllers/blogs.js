const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
  const blogBody = request.body

  if (!blogBody.title || !blogBody.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = new Blog(blogBody)
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blogBody = request.body
  console.log(blogBody)
  if (!blogBody.title || !blogBody.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = {
    title: blogBody.title,
    url: blogBody.url,
    likes: blogBody.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter