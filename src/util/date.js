import { capitalizeFirstLetter } from "./string"

export function formatDateTime(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
}

// Dar formato visual a la fecha
export const formatDateString = (dateString) => {
    const [year, month, day] = dateString.split('-')
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
    const dateStringConvert = new Intl.DateTimeFormat('es-ES', options).format(date)
    return capitalizeFirstLetter(dateStringConvert)
}