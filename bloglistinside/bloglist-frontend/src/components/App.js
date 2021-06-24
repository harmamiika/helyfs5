import React, { useState, useEffect } from 'react'

import blogsService from '../services/blogs'
import Login from './Login'
import BlogList from './BlogList'
import CreateBlog from './CreateBlog'
import Notification from './Notification'

import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogsService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //loginservice?? noteService.setToken(user.token) ei myöskään importattu
    }
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const onCreate = async (createdBlog) => {
    const res = await blogsService.create(createdBlog).catch((e) => console.log(e))
    console.log(res)

    setBlogs(blogs.concat(res))
    notifyWith(`a new blog: ${createdBlog.title} by ${createdBlog.author} added`)
  }


  const displayContent = () => {
    return user === null ?
      <Login user={user} setUser={setUser} notifyWith={notifyWith} /> :
      <div>
        <BlogList blogs={blogs} setBlogs={setBlogs} user={user} setUser={setUser} notifyWith={notifyWith} />
        <CreateBlog onCreate={onCreate} />
      </div>
  }

  return (
    <div>
      <Notification notification={notification} />
      {displayContent()}
    </div>
  )
}

App.propTypes = {
  notifyWith: PropTypes.func.isRequired,
  blogs: PropTypes.array
}



export default App