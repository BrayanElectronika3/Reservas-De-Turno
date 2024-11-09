import { z } from "zod"

import { ERROR_MESSAGES } from "./dataType"

export const schemaReservation = z.object({
    service: z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown }),
    category: z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown }),
    subCategory: z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown }),
    headquarters: z.string().min(1, { message: ERROR_MESSAGES.invalidDropdown }),
    dateTime: z.preprocess((val) => {
        if (typeof val === 'string' && !isNaN(Date.parse(val))) return new Date(val).toISOString()
        return val
    }, z.string({ message: ERROR_MESSAGES.invalidDateTime }).datetime({ message: ERROR_MESSAGES.invalidDateTime })),
    termsAndConditions: z.literal(true, { errorMap: () => ({ message: ERROR_MESSAGES.termsNotAccepted }) }),
})