import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [update, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showPet', id)
    // empty dependency array in useEffect to act like component did mount


    return(
        <>
            <h1>This is ShowPet</h1>
        </>
    )
}

export default ShowPet