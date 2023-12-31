import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        Title: {blog.title}, Author: {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>Url: {blog.url}</div>
        <div>Likes: {blog.likes}</div>
      </div>
    </div>
  )
}

export default Blog