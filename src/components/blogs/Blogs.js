import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Blogs = props => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/blogs`)
      .then(response => {
        setBlogs(response.data.blogs.reverse())
      })
      .then(() => props.alert({ heading: 'Success', message: 'Viewing all posts', variant: 'success' }))
      .catch(() => props.alert({ heading: 'Not able to retrieve posts', message: 'Sorry this isn\'t working', variant: 'success' }))
  }, [])

  const blogsJsx = blogs.map(blog => (
    <ListGroup.Item
      key={blog.id}
      action
      href={`#blogs/${blog.id}`}
    >
      {blog.title}
    </ListGroup.Item>
  ))

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Category</h1>
          {props.user && <Link to="/create-post">Add a post</Link>}
        </div>
        <ListGroup>
          {blogsJsx}
        </ListGroup>
      </div>
    </div>
  )
}

export default Blogs
