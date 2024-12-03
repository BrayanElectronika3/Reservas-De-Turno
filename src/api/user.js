import { BASE_URL } from './config'
import { getIDTenant } from '../util/localStorage'

export const postUser = async (data) => {
    const response = await fetch(`${BASE_URL}/reservas/api/personas/consultar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) return null
    return await response.json()
}

export const postCreateUser = async (data) => {
    const IDTenant = getIDTenant()
    if (!IDTenant) return null

    const response = await fetch(`${BASE_URL}/reservas/api/personas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Tenant': IDTenant
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const responseError = await response.json()
        console.log(responseError)

        const messageErrors = {
            'Error the user already exists registered': 2,
        }
        
        return { error: messageErrors[responseError?.error] || 1}
    }

    return await response.json()
}