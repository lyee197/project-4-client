import React from 'react'
import { Container, Form, Button } from "react-bootstrap"

const CommentForm = (props) => {

    const { comment, event, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                type='text'
                name='comment'
                placeholder="Enter you comment!"
                // value={comment.comment}
                onChange={handleChange}
                />
                <Button className='show-buttons' type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm