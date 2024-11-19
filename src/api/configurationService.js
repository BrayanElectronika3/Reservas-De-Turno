import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

const getConfigurationServiceFetch = async (idTenant) => {
    const response = await fetch(`${BASE_URL}/reservas/api/configuracionservicios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': idTenant
        }
    })

    if (!response.ok) return null
    return await response.json()
}

export const getConfigurationService = async () => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null
    
    try {
        const response = await getConfigurationServiceFetch(IDTenant)
        if (!response.data) return null
        return response

    } catch (error) {
        console.error("Error fetching configuration service data:", error)
        return null
    }
}