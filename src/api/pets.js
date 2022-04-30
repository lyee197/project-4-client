import apiUrl from "../apiConfig";
import axios from "axios";

export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

