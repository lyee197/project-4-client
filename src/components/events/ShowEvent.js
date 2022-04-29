import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"


const ShowEvent = (props) => {

    const [event, setEvent] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showEvent', id)
    // empty dependency array in useEffect to act like component did mount
    return (
        <>
            <h1>This is Show Page (｡･∀･)ﾉﾞ</h1>
        </>
    )
}

export default ShowEvent