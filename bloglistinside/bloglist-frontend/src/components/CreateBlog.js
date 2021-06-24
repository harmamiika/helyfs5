import React, { useState } from 'react'

import blogsService from '../services/blogs'

const CreateBlog = ({ onCreate }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [showComponent, setShowComponent] = useState(false)

    //Send form
    const handleFormSubmit = (event) => {
        event.preventDefault()
        const createdBlog = { title, author, url }

        onCreate(createdBlog)

        setTitle('')
        setAuthor('')
        setUrl('')
        setShowComponent(!showComponent)
    }

    //field onchange



    const renderForm = () => {
        if (showComponent) {
            return (
                <div>
                    <h2>create new</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>title: <input id='title' type='text' name='title' value={title} 
                            onChange={({ target }) => setTitle(target.value)} ></input></div>
                        <div>author: <input id='author' type='text' name='author' value={author} 
                            onChange={({ target }) => setAuthor(target.value)} ></input></div>
                        <div>url: <input type='text' name='url' value={url} 
                            onChange={({ target }) => setUrl(target.value)} ></input></div>
                        <button>create</button>
                    </form>
                </div>
            )
        }
    }

    return (
        <div>
            <div>
                {renderForm()}
            </div>
            <button onClick={() => setShowComponent(!showComponent)}>{showComponent ? 'cancel' : 'create blog'}</button>
        </div>
    )
}

export default CreateBlog