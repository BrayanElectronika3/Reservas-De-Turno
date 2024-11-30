import { formatDateString } from "./date"

// Transformar una lista en un arreglo para los dropdown
export const dropdownList = (data) => {
    if (Array(data).length === 0) return []
    return data.map(item => ({
        value: item,
        label: item
    }))
}

// Transformar el objeto de las fechas en un arreglo para el dropdown
export const dropdownDate = (data, value) => {
    if (!data[value]) return []
    return Object.keys(data[value]).map(key => ({
        value: key,
        label: formatDateString(key)
    }))
}

// Transformar el objeto general en un arreglo para los dropdown
export const dropdownObject = (data, value) => {
    if (!data[value]) return []
    return Object.keys(data[value]).map(key => ({
        value: key,
        label: key
    }))
}