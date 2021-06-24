import React, { useState } from 'react'

import blogsService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, notifyWith, onLike = () => {} }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  console.log(blog)

  const handleLikeClick = () => {
    setLikes(likes + 1)
    onLike(likes + 1)
  }

  const handleDeleteClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const notificationInfo = { title: blog.title, author: blog.author, id: blog.id }
      const response = await blogsService.remove(blog.id)
      setBlogs(blogs.filter(blog => blog.id !== notificationInfo.id))
      notifyWith(`deleted blog: ${notificationInfo.title} by ${notificationInfo.author}`)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const renderRemoveButton = () => {
    if (!blog.user) {
      return null
    }
    if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedInUser')).username) {
      return (
        <div>
          <button id={`${blog.title} remove`} onClick={handleDeleteClick}>remove</button>
        </div>
      )
    } 
    return null
  }

  const renderDetail = () => {
    if (showDetail) {
      return (
        <div>

          <div>{blog.url}</div>
          <div>{likes}</div>
          <button onClick={handleLikeClick}>like</button>
          <br />
          {blog.user?.username}
          {/* huom syntaksi ^ */}
          {renderRemoveButton()}
        </div>
      )
    }
    return null
  }

  return (
    <div style={blogStyle}>
      <div><span>{blog.title}</span> {blog.author} 
        <button id={blog.title} onClick={() => setShowDetail(!showDetail)}>{!showDetail ? 'view' : 'hide'}</button></div>
      {renderDetail()}
    </div>
  )
}

export default Blog