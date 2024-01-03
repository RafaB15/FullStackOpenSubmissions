import { useState } from 'react'

const Blog = ({ blog, handleLike, currentUserPublisher, handleRemove }) => {
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
    <div className='blog' style={blogStyle}>
      <div>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>Url: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={handleLike} id='like-button'>like</button>
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