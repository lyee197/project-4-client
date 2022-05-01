import React, { useState } from "react"

const EditPetModal = (props) => {
    const {user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props
    const [event, setEvent] = useState(props.pet)

    return (
        <>
            <h1>edit</h1>
        </>
    )
}

export default EditPetModal