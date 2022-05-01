import axios from "axios"

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