import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreatePet = (props) => {
    const { user, msgAlert } = props
    console.log('user in create', user)
    const navigate = useNavigate()
    const [pet, setPet] = useState({name: '', birthday: '', animalType: ''})
    console.log('Pet in create', pet)

    return (
        <>
            <h1>Where We create Our pet!</h1>
        </>
    )
}

export default CreatePet