import { BASE_URL } from './config'

export const userFetch = async (data) => {
    const response = await fetch(`${BASE_URL}/reservas/api/personas/consultar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) return null

    return await response.json()
}