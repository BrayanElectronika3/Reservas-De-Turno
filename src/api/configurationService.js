import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

// Obtener los servicios y sedes de la configuracion de reservas de acuerdo al IDTenant
export const getServicesHeadquarters = async () => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null
    
    try {
        const response = await fetch(`${BASE_URL}/reservas/api/configuracion/serviceheadquarters`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Tenant': IDTenant
            }
        })
        if (!response.ok) return null
        return await response.json()

    } catch (error) {
        console.error("Error getting services headquarters data:", error)
        return null
    }
}

// Obtener los dias y horas disponibles de la configuracion de reservas de acuerdo al IDTenant
export const getDaysHoursService = async (id) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null
    
    try {
        const response = await fetch(`${BASE_URL}/reservas/api/configuracion/daysHoursService/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Tenant': IDTenant
            }
        })
    
        if (!response.ok) return null
        return await response.json()

    } catch (error) {
        console.error("Error getting days and hours data:", error)
        return null
    }
}