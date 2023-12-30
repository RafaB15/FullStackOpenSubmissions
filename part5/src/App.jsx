import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const userData = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(userData)
      )

      blogService.setToken(userData.token)
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')

      setNotification(`${blogObject.title} was added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification(`Error adding blog: ${exception.message}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input 
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogsForm = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>{
        return (
          <Blog key={blog.id} blog={blog} />
        )
      }
      )}
      <Togglable buttonLabel="new blog">
        <BlogForm
          onSubmit={addBlog}
          handleTitleChange={({ target }) => setNewBlogTitle(target.value)}
          titleValue={newBlogTitle}
          handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
          authorValue={newBlogAuthor}
          handleURLChange={({ target }) => setNewBlogUrl(target.value)}
          urlValue={newBlogUrl}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message = {notification}/>
      {user === null ?
        loginForm() :
        blogsForm()
      }
    </div>
  )
}

export default App