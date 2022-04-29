import React, { useState } from "react"
import { Modal } from 'react-bootstrap'
import EventForm from '../shared/EventForm'

const EditEventModal = (props) => {
    const { user, show, handleClose, updateEvent, msgAlert, triggerRefresh } = props
    const [event, setEvent] = useState(props.event)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setEvent(prevEvent => {
            const name = e.target.name
            let value = e.target.value
            console.log(e.target.type)
            const updatedValue = { [name]: value}

            console.log('prevEvent', prevEvent)
            console.log('updatedValue', updatedValue)

            return {...prevEvent, ...updatedValue}
        })
    }
    
    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('The Event to submit', event)
        updateEvent(user, event)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Event Updated! Success!',
                    message: 'u did it',
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
        console.log('this is the event', event)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <EventForm 
                    event={event}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Event!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditEventModal