import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BlogForm from './BlogForm'

const BlogEdit = (props) => {
  const [blog, setBlog] = useState({ category: '', title: '', content: '', picture: '' })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/blogs/${props.match.params.id}`)
      .then(res => setBlog(res.data.blog))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setBlog(blog => ({ ...blog, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/blogs/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      },
      data: { blog }
    })
      .then(response => {
        props.alert({ heading: 'Success', message: 'You edited a blog', variant: 'success' })
        setUpdated(true)
      })
      .catch(() => props.alert({ heading: 'Nah...', message: 'That didn\'t work', variant: 'danger' }))
  }

  if (updated) {
    return <Redirect to={`/blogs/${props.match.params.id}`} />
  }

  return (
    <BlogForm
      blog={blog}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      cancelPath={`#blogs/${props.match.params.id}`}
    />
  )
}

export default withRouter(BlogEdit)
