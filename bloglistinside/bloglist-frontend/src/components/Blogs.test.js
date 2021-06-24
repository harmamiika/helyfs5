import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'
import CreateBlog from './CreateBlog'

const testBlog = {
    likes: 15,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    id: "5a422a851b54a676234d17f7"
}

const renderBlog = (props = {}) => {
    return render(
        <Blog blog={testBlog} { ...props } />
    )
} 

const viewBlogDetails = (component) => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
}

describe('blog tests', () => {


    test('component renders blog title and author, but not url or likes', () => {

        const component = renderBlog()
        
        component.getByText('React patterns')
        const tarpeetonElementti = component.getByText('Michael Chan')

        const url = component.queryByText('https://reactpatterns.com/')

        expect(url).toBeNull()

        const likes = component.queryByText('like')
        expect(likes).toBeNull()
    })

    test('component renders likes and url after view button is pressed', () => {
        const component = renderBlog()
        
        viewBlogDetails(component)
        
        component.getByText('https://reactpatterns.com/')
        component.getByText('15')
    })

    test('when button is pressed twice the event handler is invoked two times', () => {
        const onLike = jest.fn()
        const component = renderBlog({ onLike })

        viewBlogDetails(component)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(onLike.mock.calls.length).toBe(2)

    })

    //CreateBlog test

    test('form invokes the callback function passed down as props with the correct information', () => {

        const onCreate = jest.fn()

        const component = render(
            <CreateBlog onCreate={onCreate} />
        )


        const title = component.container.querySelector('#title')
        console.log(title, '12313')

        
        const submitButton = component.getByText('create blog')
        fireEvent.click(submitButton)
        
        console.log(onCreate.mock.instances)

        // expect(onCreate).toHaveBeenCalledWith(title)

        

    })


})


// import React from 'react'
// import { render } from '@testing-library/react'

// const HelloWorld = () => <h1>Hello World</h1>
// const { debug } = render(<HelloWorld />)
// debug()