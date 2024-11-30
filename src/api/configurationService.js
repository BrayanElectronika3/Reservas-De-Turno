import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

// Obtener los servicios y sedes de la configuracion de reservas
const getServicesHeadquartersFetch = async (idTenant) => {
    const response = await fetch(`${BASE_URL}/reservas/api/configuracion/serviceheadquarters`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': idTenant
        }
    })

    if (!response.ok) return null
    return await response.json()
}

// Obtener los dias y horas disponibles de la configuracion de reservas
const getServiceHoursFetch = async (id, idTenant) => {
    const response = await fetch(`${BASE_URL}/reservas/api/configuracion/servicehours/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': idTenant
        }
    })

    if (!response.ok) return null
    return await response.json()
}

// Obtener los servicios y sedes de la configuracion de reservas pasando el IDTenant
export const getServicesHeadquarters = async () => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null
    
    try {
        const response = await getServicesHeadquartersFetch(IDTenant)
        if (!response.data) return null
        return response

    } catch (error) {
        console.error("Error fetching services headquarters service data:", error)
        return null
    }
}

// Obtener los servicios y sedes de la configuracion de reservas pasando el IDTenant
export const getServiceHours = async (id) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null
    
    try {
        const response = await getServiceHoursFetch(id, IDTenant)
        if (!response.data) return null
        return response

    } catch (error) {
        console.error("Error fetching service hours data:", error)
        return null
    }
}