import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getAllPets } from "../../api/pets"
import { indexPetsSuccess, indexPetsFailure } from "../shared/AutoDismissAlert/messages"

// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexPets = (props) => {
    const [pets, setPets] = useState(null)
    const {user, msgAlert } = props

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

    if (!pets) {
        return <p>loading...</p>
    } else if (pets.length === 0) {
        return <p>no pets yet, Create an event or wait for some</p>
    }

    let petCards

    if (pets.length > 0) {
        petCards = pets.map(pet => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={pet.id} style={{ width: '30%' }} className="m-2" >
                <Card.Header>
                    <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Animal Type: {pet.animalType}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the Pets</h3>
            <div>
                {petCards}
            </div>
        </>
    )
}

export default IndexPets