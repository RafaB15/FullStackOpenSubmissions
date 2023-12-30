const BlogForm = ({ onSubmit, handleTitleChange, titleValue, handleAuthorChange, authorValue, handleURLChange, urlValue}) => {
    return (
      <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={onSubmit}>
        <div>
          title:
          <input 
            type="text"
            value={titleValue}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={authorValue}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={urlValue}
            name="Url"
            onChange={handleURLChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
      </div>
    )
}

export default BlogForm