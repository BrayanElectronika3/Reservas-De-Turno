import { BASE_URL } from './config'

export const getDocumentTypeData = async () => {
    const response = await fetch(`${BASE_URL}${import.meta.env.VITE_DOCUMENT_TYPE_CONSULTAR}`)
    if (!response.ok) return null
    return await response.json()
}