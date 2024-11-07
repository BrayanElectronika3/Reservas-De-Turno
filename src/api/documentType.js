const BASE_URL = 'http://92.204.40.114:8443';

export const documentTypeFetch = async () => {
    const response = await fetch(`${BASE_URL}/reservas/api/identificaciones`)
    if (!response.ok) return null
    return await response.json()
}