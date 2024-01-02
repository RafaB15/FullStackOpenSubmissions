import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const sendButton = screen.getByText('create')
  const inputTitle = screen.getByTestId('title')
  const inputAuthor = screen.getByTestId('author')
  const inputUrl = screen.getByTestId('url')

  await user.type(inputTitle, 'Test Title')
  await user.type(inputAuthor, 'Test Author')
  await user.type(inputUrl, 'Test URL')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test URL')
})