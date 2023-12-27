const dummy = (blogs) => {
    return 1
}

const total_likes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.find(blog => blog.likes === maxLikes)
}

module.exports = {
    dummy,
    total_likes,
    favoriteBlog
}