import { formatDateString } from "./date"

// Transformar una lista en un arreglo para los campos tipo dropdown
export const dropdownList = (data) => {
    if (Array(data).length === 0) return []
    return data.map(item => ({
        value: item,
        label: item
    }))
}

// Transformar un objeto en un arreglo para los campos tipo dropdown
export const dropdownObject = (data, value) => {
    if (!data[value]) return []
    return Object.keys(data[value]).map(key => ({
        value: key,
        label: key
    }))
}

// Transformar un objeto de fechas en un arreglo para los campos tipo dropdown
export const dropdownDate = (data, value) => {
    if (!data[value]) return []
    return Object.keys(data[value]).map(key => ({
        value: key,
        label: formatDateString(key)
    }))
}