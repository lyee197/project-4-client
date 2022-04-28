import apiUrl from "../apiConfig";
import axios from "axios";

export const getAllEvents = () => {
    return axios(`${apiUrl}/events`)
}

// show function
export const getOneEvent = (eventId) => {
    return axios(`${apiUrl}/events/${eventId}`)
}

// post -> create
export const createEvent = (user, newEvent) => {
    return axios({
        url:`${apiUrl}/events`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {event: newEvent}
    })
}

// PATCH -> updated function
export const updateEvent = (user, updatedEvent) => {
    console.log('user', user)
    console.log('this is newEvent', updatedEvent)
    return axios({
        url: `${apiUrl}/events/${updatedEvent._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { event: updatedEvent }
    })
}

//  DELETE -> remove function
export const removeEvent = (user, eventId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/events/${eventId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
