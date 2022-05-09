import { Button } from "bootstrap"
import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getAllPets, addPetToEvent, removeAPet } from "../../api/pets"

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const PetsToEvent = (props) => {
    const [pets, setPets] = useState(null)
    const {eventId, petId, user, triggerRefresh, msgAlert } = props
    const navigate = useNavigate()
    useEffect(() => {
        getAllPets()
        .then(res => {
            setPets(res.data.pets)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    const addAPetToEvent = (petId) => {
        addPetToEvent(user, eventId, petId)
            .then(() => {triggerRefresh()})
            // .then(() => 
            //     msgAlert({
            //         heading: 'Pets added to event!',
            //         message: 'Nice!',
            //         variant: 'success',
            //     })
            // )
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
        removeAPet(user, eventId, petId)
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
        petButtons = pets.map((pet) => {
            <Card className="m-2">
                <Card.Header>
                    <h1>Add Pets to Event!</h1>
                </Card.Header>
                <Card.Body>
                    <Button id={pet._id} onClick={() => {addAPetToEvent(pet._id)}}>
                        <span key={pet._id}>{pet.name}</span>
                    </Button>
                    <Button id={pet._id} onClick={() => {removeThePet(pet._id)}}>
                        <span key={pet._id}>x</span>
                    </Button>
                </Card.Body>
            </Card>
        })
    } else {
        <div>
            <h1>no pets? what?</h1>
        </div>
    }

    return (
        <>
            <h1>This is where you add Pets to events</h1>
            <div style={cardContainerLayout}>
                {petButtons}
            </div>
        </>
    )
}

export default PetsToEvent