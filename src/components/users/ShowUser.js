import { useState } from "react"
import { getOneUser } from "../../api/auth"
import { useParams, useNavigate } from "react-router-dom"
import { showUserFailure, showUserSuccess } from "../shared/AutoDismissAlert/messages"

const ShowUser = (props) => {
    const [user, setUser] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getOneUser(id)
        .then(res => setUser(res.data.user))
        .then(() => {
            msgAlert({
                heading: 'Here is the User!',
                message: showUserSuccess,
                variant: 'success',
            })
        })
        .catch(() => {
            msgAlert({
                heading: 'No user found',
                message: showUserFailure,
                variant: 'danger',
            })
        })
    }, [updated])


    let petCards
    if (user) {
        if (user.pets.length > 0) {
            commentCards = user.pets.map(comment => (
                // need to pass all props needed for updateComment func in edit modal
                <ShowUserPets
                    key={comment._id} comment={comment}
                    pets={user.pets}
                    user={user} msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }
    return (
        <>
            <h1>This is user!</h1>
        </>
    )
}

export default ShowUser