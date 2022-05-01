import { Container, Form, Button } from "react-bootstrap"

const CommentForm = (props) => {

    const { user, comment, handleChange, handleSubmit, heading } = props
    console.log('this is user', user)

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                placeholder="Enter you comment!"
                value={comment.comment}
                />
            </Form>
            <Button type="submit">Submit</Button>
        </Container>
    )
}

export default CommentForm