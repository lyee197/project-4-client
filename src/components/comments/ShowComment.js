import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import { deleteComment } from "../../api/comments"

const ShowComment = (props) => {
    console.log('the props in showcomment', props)
    // most of these are simply to pass to edit modal
    const {comment, event, user, triggerRefresh, msgAlert } = props

    const [showEditModal, setShowEditModal] = useState(false)

    const destroyComment = () => {
        // console.log('this is user', user)
        // console.log('this is event', event._id)
        // console.log('this is comment', comment._id)
        deleteComment(user, event._id, comment._id)
            .then(() =>
                msgAlert({
                    heading: 'Comment deleted',
                    message: 'Rip Comment',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'that aint it',
                    variant: 'danger',
            }))
    }

    return (
        <Card key={comment._id} className="m-2">
            <Card.Header>{comment.author.email}</Card.Header>
            <Card.Body>
                <p>{comment.comment}</p>
            </Card.Body>
        <Card.Footer>
            <Button onClick={() => destroyComment()} variant="danger">
                Delete Comment
            </Button>
        </Card.Footer>
        </Card>
    )
}

export default ShowComment