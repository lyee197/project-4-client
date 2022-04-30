import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPet } from "../../api/pets"
import PetForm from "../shared/PetForm"
import { createPetFailure, createPetSuccess } from "../shared/AutoDismissAlert/messages"


const CreatePet = (props) => {
    const { user, msgAlert } = props
    console.log('user in create', user)
    const navigate = useNavigate()
    const [pet, setPet] = useState({name: '', birthday: '', animalType: ''})
    console.log('Pet in create', pet)
    //  an empty event object
    // and a createdId (used to navigate)
    // we'll need handleChange and handleSubmit funcs
    const handleChange = (e) => {
        e.persist()

        setPet(prevPet => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevPet', prevPet)
            console.log('updatedValue', updatedValue)

            return {...prevPet, ...updatedValue}
        })

        
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createPet(user, pet)
            //if create is successful, we should navigate to the show page
            .then(res => {navigate(`/pets/${res.data.pet._id}`)})
            // then we send a success message
            .then(() =>
            msgAlert({
                heading: 'Event Added! Success!',
                message: createPetSuccess,
                variant: 'success',
            }))
        // if there is an error, we'll send an error message
        .catch(() =>
            msgAlert({
                heading: 'Oh No!',
                message: createPetFailure,
                variant: 'danger',
            }))
        // console.log('this is the pet', pet)
    }

    return (
        <PetForm
        pet={pet}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        />
    )
}

export default CreatePet