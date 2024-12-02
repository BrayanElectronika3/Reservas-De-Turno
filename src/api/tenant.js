import { BASE_URL } from './config'

export const getTenant = async (nameTenant) => {
    const response = await fetch(`${BASE_URL}/reservas/api/tenants/${nameTenant}`)
    if (!response.ok) return null
    return await response.json()
}