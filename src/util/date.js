import { capitalizeFirstLetter } from "./string"

// Dar formato a la fecha en formato DD/MM/YYYY
export function formatDate(dateString) {
    const date = new Date(dateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
}

// Dar formato a la fecha en formato Day, Day de Month de Year
export const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split('-')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
    const dateStringConvert = new Intl.DateTimeFormat('es-ES', options).format(date)
    return capitalizeFirstLetter(dateStringConvert)
}