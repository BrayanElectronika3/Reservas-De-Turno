import { z } from "zod"

// Mensajes de error centralizados
const ERROR_MESSAGES = {
    invalidDropdown: "Selecciona una opción",
    invalidNumber: "Debe ser un número de al menos 5 dígitos"
};

const documentType = z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown })
const documentNumber = z.preprocess(
    (value) => {
        if (typeof value === "string" && value.trim() === "") return NaN
        const parsed = Number(value)
        return isNaN(parsed) ? NaN : parsed
    },
    z.number({ invalid_type_error: ERROR_MESSAGES.invalidNumber})
        .int({ message: ERROR_MESSAGES.invalidNumber })
        .min(10000, { message: ERROR_MESSAGES.invalidNumber })
);

// Esquema de validación de login con Zod
export const schemaLogin = z.object({
    documentType: documentType,
    documentNumber: documentNumber,
})