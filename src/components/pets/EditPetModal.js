import { Modal } from "react-bootstrap"
import React, { useState } from "react"
import PetForm from "../shared/PetForm"

const EditPetModal = (props) => {
    const {user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props
    const [pet, setPet] = useState(props.pet)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            const name = e.target.name
            let value = e.target.value
            console.log(e.target.type)
            const updatedValue = { [name]: value}

            console.log('prevPet', prevPet)
            console.log('updatedValue', updatedValue)

            return {...prevPet, ...updatedValue}
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <PetForm
                    pet={pet}
                    handleChange={handleChange}
                    heading="Edit Pet!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPetModal