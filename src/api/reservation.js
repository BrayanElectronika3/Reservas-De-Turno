import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

export const postReservation = async (data) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null

    const response = await fetch(`${BASE_URL}/reservas/api/reservas`, {
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