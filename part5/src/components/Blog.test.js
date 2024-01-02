import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders appropriate default content', () => {
  const blog = {
    title: 'Test Title',
    url: 'Test URL',
    likes: 522,
    author: 'Test Author',
    user: {
      username: 'Test Username'
    }
  }

  render(<Blog
    blog={blog}
    handleLike={() => {}}
    currentUserPublisher={false}
    handleRemove={() => {}}
  />)

  const element_title = screen.findByText('Test Title')
  expect(element_title).toBeDefined()

  const element_author = screen.findByText('Test Author')
  expect(element_author).toBeDefined()
})

test('renders additional content when view button is clicked', async () => {
  const blog = {
    title: 'Test Title',
    url: 'Test URL',
    likes: 522,
    author: 'Test Author',
    user: {
      username: 'Test Username'
    }
  }

  render(<Blog
    blog={blog}
    handleLike={() => {}}
    currentUserPublisher={false}
    handleRemove={() => {}}
  />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element_url = screen.findByText('Test URL')
  expect(element_url).toBeDefined()

  const element_likes = screen.findByText('522')
  expect(element_likes).toBeDefined()

  const element_username = screen.findByText('Test Username')
  expect(element_username).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Test Title',
    url: 'Test URL',
    likes: 522,
    author: 'Test Author',
    user: {
      username: 'Test Username'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog
    blog={blog}
    handleLike={mockHandler}
    currentUserPublisher={false}
    handleRemove={() => {}}
  />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})