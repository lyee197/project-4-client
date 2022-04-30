import { useEffect, useState } from "react"
import { Spinner, Container, Card, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { getOneEvent, updateEvent, removeEvent } from "../../api/events"
import { showEventSuccess, showEventFailure } from '../shared/AutoDismissAlert/messages'
import EditEventModal from "./EditEventModal"


const ShowEvent = (props) => {

    const [event, setEvent] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showEvent', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneEvent(id)
        .then(res => setEvent(res.data.event))
        .then(() => {
            msgAlert({
                heading: 'Here is the Event!',
                message: showEventSuccess,
                variant: 'success',
            })
        })
        .catch(() => {
            msgAlert({
                heading: 'No event found',
                message: showEventFailure,
                variant: 'danger',
            })
        })
    }, [updated])
    
    const removeTheEvent = () => {
        removeEvent(user, event._id)
            .then(() => {
                msgAlert({
                    heading: 'Event Removed x_x',
                    message: 'No more event',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/events`)})
            .catch(() => {
                msgAlert({
                    heading: 'something went wrong',
                    message: 'that aint it',
                    variant: 'danger',
                })
            })
    }

    if (!event) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header> {event.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Host {event.owner}</small> <br/>
                            <small>Date of Event: {event.date}</small> <br/>
                            <small>Description: {event.description}</small> <br/>
                            <small>Event type: {event.event_type}</small> <br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Event
                        </Button>
                        <Button onClick={() => removeTheEvent()}className="m-2" variant="danger">
                            Delete Event
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            <EditEventModal
                event={event}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateEvent={updateEvent}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowEvent