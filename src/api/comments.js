import axios from "axios"
import apiUrl from "../apiConfig"

// POST -> create function
export const createComment = (user, eventId, newComment) => {
    console.log('user', user)
    console.log('this is newEvent', newComment)
    return axios({
        url: `${apiUrl}/comments/${eventId}`,
        method: 'POST',
        data: { comment: newComment}
    })
}

// PATCH -> update function
export const updateComment = (user, eventId, commentId, updatedComment) => {
    console.log('user', user)
    console.log('this is newComment', updatedComment)
    return axios({
        url: `${apiUrl}/comments/${eventId}/${commentId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: updatedComment}
    })
}

