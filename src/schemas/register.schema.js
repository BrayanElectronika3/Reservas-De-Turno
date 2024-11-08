import { z } from "zod"

// Mensajes de error centralizados
const ERROR_MESSAGES = {
    invalidName: "Campo obligatorio",
    invalidDropdown: "Selecciona una opción",
    invalidEmail: "Correo inválido",
    invalidCellPhone: "Debe ser un número de celular válido de 10 dígitos"
};

const firstName = z.string().min(1, { message: ERROR_MESSAGES.invalidName })
const firstLastName = z.string().min(1, { message: ERROR_MESSAGES.invalidName })
const email = z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: ERROR_MESSAGES.invalidEmail })
const cellPhone = z.preprocess(
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

// Esquema de validación de login con Zod
export const schemaRegister = z.object({
    firstName: firstName,
    firstLastName: firstLastName,
    email: email,
    cellPhone: cellPhone
})