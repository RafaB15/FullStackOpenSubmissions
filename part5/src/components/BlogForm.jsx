import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="Title"
            onChange={event => setNewBlogTitle(event.target.value)}
            data-testid='title'
            id='title'
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="Author"
            onChange={event => setNewBlogAuthor(event.target.value)}
            data-testid='author'
            id='author'
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="Url"
            onChange={event => setNewBlogUrl(event.target.value)}
            data-testid='url'
            id='url'
          />
        </div>
        <button type="submit" id='create-blog-button'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm