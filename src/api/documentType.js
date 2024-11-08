import { BASE_URL } from './config'

export const documentTypeFetch = async () => {
    const response = await fetch(`${BASE_URL}/reservas/api/identificaciones`)
    if (!response.ok) return null
    return await response.json()
}