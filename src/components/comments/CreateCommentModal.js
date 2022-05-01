import { useState } from "react"
import CommentForm from "../shared/CommentForm"

const CreateCommentModal = (props) => {
    const {user, event, show, handleClose, msgAlert, triggerRefresh } = props
    const [comment, setComment] = useState({})

    const handleChange = (e) => {
        // e === event
        e.persist()

        setComment(prevComment => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }
            const updatedValue = { [name]: value }

            console.log('prevComment', prevComment)
            console.log('updatedValue', updatedValue)

            return {...prevComment, ...updatedValue}
        })
    }

    return (
        <CommentForm
            comment={comment}
            handleChange={handleChange}
            heading="Comment on the event!"
        />
    )
}

export default CreateCommentModal