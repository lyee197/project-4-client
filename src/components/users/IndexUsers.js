import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { getAllUsers } from "../../api/auth"
import { indexUsersFailure, indexUsersSuccess } from "../shared/AutoDismissAlert/messages"

const IndexUsers = (props) => {
    const [ users, setUsers ] =  useState(null)
    const {user, msgAlert} = props

    useEffect(() => {
        getAllUsers()
            .then(res => {
                setUsers(res.data.users)
            })
            .then(()=> {
                msgAlert({
                    heading: "Found Users",
                    message: indexUsersSuccess,
                    variant: "success"
                })
            })
            .catch(() => {
                msgAlert({
                    heading: "No users?!",
                    message: indexUsersFailure,
                    variant: "danger"
                })
            })
    },[])

    if (!users) {
        return <p>loading...</p>
    } else if (users.length === 0) {
        return <p>no users yet, Create an event or wait for some</p>
    }

    let userCards

    if (users.length > 0 ) {
        userCards = users.map(user => (
            <Card key={user._id} style={{ width: '30%' }} className="m-2" >
                <Card.Header>{user.email}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>{user.pets}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return(
        <>
            <h1>this is users</h1>
            <div>
                {userCards}
            </div>
        </>
    )
}

export default IndexUsers