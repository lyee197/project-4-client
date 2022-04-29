import { useState } from "react"

const EditEventModal = (props) => {
    const { user, show, handleClose, updateEvent, msgAlert, triggerRefresh } = props
    const [event, setEvent] = useState(props.event)

    return (
        <>
            <h1>Edit</h1>
        </>
    )
}

export default EditEventModal