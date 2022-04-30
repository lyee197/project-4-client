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

// PATCH -> updated function
export const updatePet = (user, updatedPet) => {
    console.log('user', user)
    console.log('this is newPet', updatedPet)
    return axios({
        url: `${apiUrl}/pets/${updatedPet._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet }
    })
}

//  DELETE -> remove function
export const removePet = (user, petId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/pets/${petId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
