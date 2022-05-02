import React, { useState } from "react"
import { createComment } from '../../api/comments'
import { useNavigate } from "react-router-dom"
import CommentForm from "../shared/CommentForm"

const CreateCommentModal = (props) => {
    const {user, event, msgAlert, triggerRefresh} = props
    const navigate = useNavigate()
    const [comment, setComment] = useState([])
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
    
    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        // console.log('the comment to submit', comment)
        // console.log('this is user', user)
        // console.log('this is user.id', props.user._id)
        console.log('this is event', event)
        console.log('this is event', event._id)
        // console.log('this is author', author)
        createComment(user, event._id, comment)
            // if create is successful, we should navigate to the show page
            .then(res => { navigate(`/events/${event._id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Comment given to event!',
                    message: 'great! the pet loves it!',
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
        <CommentForm
            user={user}
            event={event}
            comment={comment}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Comment on the event!"
        />
    )
}

export default CreateCommentModal