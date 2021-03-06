import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = (props) => {
  const { blog, handleChange, handleSubmit, cancelPath } = props
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2>Create/Edit Post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Enter your title"
              value={blog.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='select'
              placeholder="Enter the category"
              value={blog.category}
              name="category"
              onChange={handleChange}
            >
              <option value="">Choose the Category</option>
              <option>Art</option>
              <option>Sports</option>
              <option>Entertainment</option>
              <option>Culture</option>
              <option>General</option>
            </Form.Control>

          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as='textarea'
              rows='7'
              placeholder="Enter blog post content here"
              value={blog.content}
              name="content"
              onChange={handleChange}
            />

          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Picture</Form.Label>
            <Form.Control
              as='textarea'
              rows='2'
              placeholder="Insert link to picture here"
              value={blog.picture}
              name="picture"
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">Submit</Button>
          <Button type="button" href={cancelPath} variant="secondary" className="ml-2">Cancel</Button>
        </Form>
      </div>
    </div>
  )
}

export default BlogForm
