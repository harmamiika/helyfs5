import React, { useState } from 'react'

import loginService from '../services/login'
import blogsService from '../services/blogs'

const Login = ({ user, setUser, notifyWith }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    const handleLogin = async (event) => {
        console.log(event)
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )
            blogsService.setToken(user.token)
            
            notifyWith('Logged in')
            setUsername('')
            setPassword('')
            setUser(user)
        } catch (exception) {
            console.log(exception)
            notifyWith('Invalid username or password', 'error')
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                    onChange={({ target }) => setUsername(target.value)} 
                    type='text' value={username} name='Username' />
                </div>
                <div>
                    password
                    <input 
                    onChange={({ target }) => setPassword(target.value)}
                    type='password' value={password} name='password' />
                </div>
                <button type='submit'>log in</button>
            </form>
        </div>
    )
}

export default Login