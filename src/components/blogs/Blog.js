import React, { useEffect, useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const Blog = props => {
  const [blog, setBlog] = useState(null)
  const userId = props.user ? props.user._id : null

  useEffect(() => {
    axios(`${apiUrl}/blogs/${props.match.params.id}`)
      .then(res => setBlog(res.data.blog))
      .catch(() => props.alert({ heading: 'That didn\'t work', message: 'Sorry, couldn\'t retrieve the requested blog', variant: 'danger' }))
  }, [])

  const handleDelete = event => {
    axios({
      url: `${apiUrl}/blogs/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(() => {
        props.alert({ heading: 'Success', message: 'Blog deleted', variant: 'success' })
        props.history.push('/')
      })
      .catch(() => {
        props.alert({ heading: 'Oppy!', message: 'Enable to delete', variant: 'danger' })
      })
  }

  if (!blog) {
    return <p>Loading blogs...</p>
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>{blog.category}</h2>
        <h3 className="h5">{blog.title}</h3>
        {blog.category
          ? <p>{blog.content}</p>
          : <p className="text-muted">No content to show</p>
        }
        {userId === blog.owner && (
          <Fragment>
            <Link to={`/blogs/${props.match.params.id}/edit`}> <Button variant="primary" className="mr-2">Update</Button></Link>
            <Button onClick={handleDelete} variant="danger" className="mr-2">Delete</Button>
          </Fragment>
        )}
        <Button href="#/" variant="secondary">Back</Button>
      </div>
    </div>
  )
}

export default withRouter(Blog)
