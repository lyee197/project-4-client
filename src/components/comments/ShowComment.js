import { useState } from "react"
import { Card } from "react-bootstrap"

const ShowComment = (props) => {
    console.log('the props in showcomment', props)
    // most of these are simply to pass to edit modal
    const {comment, event, user, triggerRefresh, msgAlert } = props

    const [showEditModal, setShowEditModal] = useState(false)

    return (
        <Card key={comment._id} className="m-2">
            <Card.Header>{comment.author.email}</Card.Header>
            <Card.Body>
                <p>{comment.comment}</p>
            </Card.Body>
        </Card>
    )
}

export default ShowComment