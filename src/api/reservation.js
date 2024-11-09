import { BASE_URL } from './config'

export const reservationFetch = async () => {
    const response = await fetch(`${BASE_URL}/reservas/api/information`)
    if (!response.ok) return null
    return await response.json()
}