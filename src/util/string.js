// Colocar a mayuscula la primer letra de un string
export const capitalizeFirstLetter = (string) => {
    if (!string) return ''
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}