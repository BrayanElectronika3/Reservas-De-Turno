import { z } from "zod"

import { ERROR_MESSAGES } from "./dataType"

export const schemaRegister = z.object({
    firstName: z.string().min(1, { message: ERROR_MESSAGES.invalidName }),
    firstLastName: z.string().min(1, { message: ERROR_MESSAGES.invalidName }),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: ERROR_MESSAGES.invalidEmail }),
    cellPhone: z.preprocess(
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
})