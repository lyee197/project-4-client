import { useState, useEffect } from "react"
import { Card, Container, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { getOnePet } from "../../api/pets"
import { showPetSuccess, showPetFailure } from "../shared/AutoDismissAlert/messages"

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showPet', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOnePet(id)
        .then(res => setPet(res.data.pet))
        .then(() => {
            msgAlert({
                heading: 'Here is the Pet!',
                message: showPetSuccess,
                variant: 'success',
            })
        })
        .catch(() => {
            msgAlert({
                heading: 'No pet found',
                message: showPetFailure,
                variant: 'danger',
            })
        })
    },[])

    if (!pet) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return(
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header> {pet.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Owner {pet.owner}</small><br/>
                            <small>Date of Birth: {pet.birthday}</small><br/>
                            <small>Animal Type: {pet.animalType}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowPet