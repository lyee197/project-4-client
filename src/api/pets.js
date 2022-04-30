import apiUrl from "../apiConfig";
import axios from "axios";

export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// show function
export const getOnePet = (petId) => {
    return axios(`${apiUrl}/pets/${petId}`)
}

// post -> create
export const createPet = (user, newPet) => {
    return axios({
        url:`${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {pet: newPet}
    })
}