import apiUrl from "../apiConfig";
import axios from "axios";

export const getAllEvents = () => {
    return axios(`${apiUrl}/events`)
}

// show function
export const getOneEvent = (eventId) => {
    return axios(`${apiUrl}/products/${eventId}`)
}

