import React, {useState, useEffect} from 'react'
import { getAllEvents } from '../../api/events'
import { Link } from 'react-router-dom'

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
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    headking: "No event?!",
                    varian: 'danger'
                })
            })
    },[])

    if (!events) {
        return <p>loading...</p>
    } else if (events.length === 0) {
        return <p>no events yet, Create an event or wait for some</p>
    }

    let eventCards

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