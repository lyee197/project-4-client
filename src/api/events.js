import apiUrl from "../apiConfig";
import axios from "axios";

export const getAllEvents = () => {
    return axios(`${apiUrl}/events`)
}