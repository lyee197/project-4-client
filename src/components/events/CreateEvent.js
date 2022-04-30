import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvent } from "../../api/events"
import EventForm from '../shared/EventForm'
import { createEventFailure, createEventSuccess } from "../shared/AutoDismissAlert/messages"

const CreateEvent = (props) => {
    const { user, msgAlert } = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [event, setEvent] = useState({name: '', description: '', date: '', event_type: ''})
    console.log('Event in create', event)
    //  an empty event object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
    const handleChange = (e) => {
        // e === event
        e.persist()

        setEvent(prevEvent => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevEvent', prevEvent)
            console.log('updatedValue', updatedValue)

            return {...prevEvent, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createEvent(user, event)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/events/${res.data.event._id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Event Added! Success!',
                    message: createEventSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createEventFailure,
                    variant: 'danger',
                }))
        // console.log('this is the event', event)
    }

    return (
        <EventForm
            event={event}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new event!"
        />
    )
}

export default CreateEvent