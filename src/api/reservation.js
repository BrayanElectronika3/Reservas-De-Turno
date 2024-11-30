import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

export const reservationFetch = async (data) => {
    const response = await fetch(`${BASE_URL}/reservas/api/reservas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': getIDTenant()
        },
        body: JSON.stringify(data)
    })
    
    if (!response.ok) { 
        console.log(await response.json())
        return null
    }
    return await response.json()
}