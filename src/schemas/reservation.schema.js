import { z } from "zod"

// Mensajes de error centralizados
const ERROR_MESSAGES = {
    invalidDropdown: "Selecciona una opción",
    invalidDateTime: "Selecciona una fecha y hora",
    termsNotAccepted: "Debe aceptar los términos y condiciones"
}

const service = z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown })
const category = z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown })
const subCategory = z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown })
const headquarters = z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown })
const dateTime = z.preprocess((val) => {
    if (typeof val === 'string' && !isNaN(Date.parse(val))) return new Date(val).toISOString()
    return val
}, z.string({ message: ERROR_MESSAGES.invalidDateTime }).datetime({ message: ERROR_MESSAGES.invalidDateTime }))
const termsAccepted = z.literal(true, { errorMap: () => ({ message: ERROR_MESSAGES.termsNotAccepted }) })

// Esquema de validación de login con Zod
export const schemaReservation = z.object({
    service: service,
    category: category,
    subCategory: subCategory,
    headquarters: headquarters,
    dateTime: dateTime,
    termsAndConditions: termsAccepted,
})