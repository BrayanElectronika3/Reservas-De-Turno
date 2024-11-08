import { z } from "zod"

// Mensajes de error centralizados
const ERROR_MESSAGES = {
    invalidDropdown: "Selecciona una opción",
    invalidCellPhone: "Debe ser un número de celular válido de 10 dígitos",
    termsNotAccepted: "Debe aceptar los términos y condiciones"
}

const priorityAttention = z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown })
const cellPhoneNumber = z.preprocess(
    (value) => {
        if (typeof value === "string" && value.trim() === "") return NaN
        const parsed = Number(value)
        return isNaN(parsed) ? NaN : parsed
    },
    z.number({ invalid_type_error: ERROR_MESSAGES.invalidCellPhone})
        .int({ message: ERROR_MESSAGES.invalidCellPhone })
        .min(1000000000, { message: ERROR_MESSAGES.invalidCellPhone })
        .max(9999999999, { message: ERROR_MESSAGES.invalidCellPhone })
)
const termsAccepted = z.literal(true).refine(value => value === true, { message: ERROR_MESSAGES.termsNotAccepted })

// Esquema de validación de login con Zod
export const schemaReservation = z.object({
    priorityAttention: priorityAttention,
    cellPhoneNumber: cellPhoneNumber,
    termsAndConditions: termsAccepted,
})