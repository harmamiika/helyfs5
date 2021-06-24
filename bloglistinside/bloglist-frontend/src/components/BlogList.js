import React, { useState } from 'react'

import Blog from './Blog'
import blogsService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, user, setUser, notifyWith }) => {
    const [showComponent, setShowComponent] = useState(true)

    if (!user) {
        return null
    }

    const onLogoutClick = () => {
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
    }

    const handleShowClick = () => {
        setShowComponent(!showComponent)
    }

    const handleLike = async (blog, likes) => {
        const updatedBlog = { ...blog, likes }
        await blogsService.update(updatedBlog.id, updatedBlog).catch(e => console.log(e))
    }

    const renderContent = () => {
        if (showComponent) {
            return (
                <div>
                    {
                        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                            <Blog key={blog.id} blog={blog} blogs={blogs} 
                            setBlogs={setBlogs} notifyWith={notifyWith} onLike={(likes) => handleLike(blog, likes)} />
                        )
                    }
                </div>
            )
        }
    }


    return (
        <div>
            <h2>blogs</h2>
            <p>
                {`${user.name} logged in.`}
                <button onClick={onLogoutClick} >
                    log out
                </button>
            </p>
            {renderContent()}
            <button onClick={handleShowClick}>{showComponent ? 'hide blogs' : 'show blogs'}</button>
        </div>
    )
}

export default BlogList

// window.localStorage.removeItem('loggedNoteappUser')
// tai local storagen tilan kokonaan nollaavan komennon
// window.localStorage.clear()