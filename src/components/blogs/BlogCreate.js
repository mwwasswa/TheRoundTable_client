import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import BlogForm from './BlogForm'

const BlogCreate = (props) => {
  const [blog, setBlog] = useState({ category: '', title: '', content: '' })

  const handleChange = event => {
    event.persist()
    setBlog({ ...blog, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/blogs`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { blog }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'Blog created', variant: 'success' })
        props.history.push('/blogs')
      })
      .catch(() => props.alert({ heading: 'Errr...', message: 'Something went wrong', variant: 'danger' }))
  }

  return (
    <BlogForm blog={blog} handleChange={handleChange} handleSubmit={handleSubmit} cancelPath='/' />
  )
}

export default withRouter(BlogCreate)
