import { z } from "zod"

import { ERROR_MESSAGES } from './dataType'

export const schemaLogin = z.object({
    documentType: z.string().min(1, { 
        message: ERROR_MESSAGES.invalidDropdown 
    }),
    documentNumber: z.preprocess(
        (value) => {
            if (typeof value === "string" && value.trim() === "") return NaN
            const parsed = Number(value)
            return isNaN(parsed) ? NaN : parsed
        },
        z.number({ invalid_type_error: ERROR_MESSAGES.invalidNumber})
            .int({ message: ERROR_MESSAGES.invalidNumber })
            .min(10000, { message: ERROR_MESSAGES.invalidNumber })
    ),
})