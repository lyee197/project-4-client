import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PetForm from "../shared/PetForm"

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

    return (
        <PetForm
        pet={pet}
        handleChange={handleChange}
        />
    )
}

export default CreatePet