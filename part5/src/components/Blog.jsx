import { useState } from "react"

const Blog = ({ blog, handleLike, currentUserPublisher, handleRemove}) => {
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
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        {blog.user && <div>User: {blog.user.username}</div>}
      </div>
      <div>
        {currentUserPublisher && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog