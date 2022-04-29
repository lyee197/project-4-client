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

    return (
        <>
            <h1>Index Page for Events</h1>
        </>
    )
}

export default IndexEvents