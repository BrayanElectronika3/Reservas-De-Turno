import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

export const postReservationData = async (data) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null

    const response = await fetch(`${BASE_URL}${import.meta.env.VITE_RESERVATION_CREAR}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': IDTenant
        },
        body: JSON.stringify(data)
    })
    
    if (!response.ok) {
        const responseError = await response.json()

        const messageErrors = {
            'There is already a reservation for the same person on the same date': 1,
        }
        
        return { error: messageErrors[responseError?.error]}
    }
    
    return await response.json()
}

export const patchReservationData = async (idReservation, data) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null

    const response = await fetch(`${BASE_URL}${import.meta.env.VITE_RESERVATION_ACTUALIZAR}${idReservation}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': IDTenant
        },
        body: JSON.stringify(data)
    })
    
    if (!response.ok) return null
    return await response.json()
}

export const getReservationsByPersonData = async (idPerson) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null

    try {
        const response = await fetch(`${BASE_URL}${import.meta.env.VITE_RESERVATION_CONSULTAR}${idPerson}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Tenant': IDTenant
            }
        })
        if (!response.ok) return null
        return await response.json()

    } catch (error) {
        console.error("Error getting reservations by person data:", error)
        return null
    }
}