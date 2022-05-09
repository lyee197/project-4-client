import { useEffect, useState } from "react"
import { Card, Button, Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getAllPets, addPetToEvent, removeAPet } from "../../api/pets"
import { indexPetsSuccess, indexPetsFailure } from "../shared/AutoDismissAlert/messages"

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const PetsToEvent = (props) => {
    const [pets, setPets] = useState(null)
    const {event, show, petId, user, triggerRefresh, msgAlert, handleClose } = props
    const navigate = useNavigate()
    useEffect(() => {
        getAllPets()
            .then(res => {
                console.log('this is the res', res)
                setPets(res.data.pets)
            })
            .then(() => {
                msgAlert({
                    heading: "Found Pets",
                    mesage: indexPetsSuccess,
                    variant: 'success'
                })
            })
            .catch(() => {
                msgAlert({
                    heading: "No pet?!",
                    message: indexPetsFailure,
                    variant: 'danger'
                })
            })
    },[])

    const addAPetToEvent = (petId) => {
        addPetToEvent(user, event._id, petId)
            .then(() => {triggerRefresh()})
            .then(() => 
                msgAlert({
                    heading: 'Pets added to event!',
                    message: 'Nice!',
                    variant: 'success',
                })
            )
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'couldnt add pet to event',
                    variant: 'danger',
            }))
        // console.log('this is the pet', pet)
    }

    const removeThePet = (petId) => {
        removeAPet(user, event._id, petId)
            .then(() => {triggerRefresh()})
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'couldnt add pet to event',
                    variant: 'danger',
            }))
    }

    if (!pets) {
        return <p>Loading ...</p>
    } else if (pets.length === 0) {
        return <p>No Pets yet, go add some</p>
    }

    let petButtons

    if (pets.length > 0) {
        petButtons = pets.map(pet => (
            <>
                <Modal.Body key={pet._id}>
                    <Button id={pet._id} onClick={() => {addAPetToEvent(pet._id)}}>
                        <span key={pet._id}>{pet.name}<br/>{pet.animalType}</span>
                    </Button>
                    <Button id={pet._id} onClick={() => {removeThePet(pet._id)}}>
                        <span key={pet._id}>x</span>
                    </Button>
                </Modal.Body>
            </>
        ))
    }


    return (
            <div style={cardContainerLayout}>
                <Modal show={show} className="m-2" onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h1>Add Pets to Event!</h1>
                    </Modal.Header>
                    {petButtons}
                </Modal>
            </div>
    )
}

export default PetsToEvent