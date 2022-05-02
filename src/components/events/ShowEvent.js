import { useEffect, useState } from "react"
import { Spinner, Container, Card, Button } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"
import { getOneEvent, updateEvent, removeEvent } from "../../api/events"
import { showEventSuccess, showEventFailure } from '../shared/AutoDismissAlert/messages'
import EditEventModal from "./EditEventModal"
import ShowComment from '../comments/ShowComment'
import CreateCommentModal from "../comments/CreateCommentModal"

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowEvent = (props) => {
    const [event, setEvent] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [commentModalOpen, setCommentModalOpen] = useState(false)
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

    let commentCards
    if (event) {
        if (event.comments.length > 0) {
            commentCards = event.comments.map(comment => (
                // need to pass all props needed for updateComment func in edit modal
                <ShowComment
                    key={comment._id} comment={comment} event={event}
                    user={user} msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
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
                            <small>Host {event.owner._id}</small> <br/>
                            <small>Date of Event: {event.date}</small> <br/>
                            <small>Description: {event.description}</small> <br/>
                            <small>Event type: {event.event_type}</small> <br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Event
                        </Button>
                        <Button onClick={() => removeTheEvent()} className="m-2" variant="danger">
                            Delete Event
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {commentCards}
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
            <CreateCommentModal
                event={event}
                show={commentModalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default ShowEvent