import React, {useState, useEffect} from 'react'
import { getAllEvents } from '../../api/events'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { indexEventsFailure, indexEventsSuccess } from '../shared/AutoDismissAlert/messages'
import CreateEvent from './CreateEvent'

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexEvents = (props) => {
    const [events, setEvents ] = useState(null)
    const { user, msgAlert } = props

    useEffect(() => {
        getAllEvents()
            .then(res => {
                console.log('this is the res', res)
                setEvents(res.data.events)
            })
            .then(() => {
                msgAlert({
                    heading: "Found Events",
                    message: indexEventsSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: "No event?!",
                    message: indexEventsFailure,
                    variant: 'danger'
                })
            })
    },[])

    if (!events) {
        return <p>loading...</p>
    } else if (events.length === 0) {
        return <p>no events yet, Create an event or wait for some</p>
    }

    let eventCards

    if (events.length > 0) {
        eventCards = events.map(event => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={event.id} style={{ width: '30%' }} className="m-2" >
                <Card.Header>
                    <Link to={`/events/${event._id}`}>{event.name}</Link>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {event.description}<br/>
                        <small>Date: {event.date}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the Events</h3>
            <div>
                {eventCards}
            </div>
        </>
    )
}

export default IndexEvents