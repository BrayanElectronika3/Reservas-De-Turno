import { z } from "zod"

import { ERROR_MESSAGES } from "./dataType"

export const schemaReservation = z.object({
    service: z.string().min(1, { 
        message: ERROR_MESSAGES.invalidDropdown 
    }),

    headquarters: z.string().min(1, { 
        message: ERROR_MESSAGES.invalidDropdown 
    }),

    date: z.preprocess((val) => {
        if (typeof val === 'string' && !isNaN(Date.parse(val))) return new Date(val).toISOString()
        return val
    }, z.string({ 
        message: ERROR_MESSAGES.invalidDate 
    }).datetime({ 
        message: ERROR_MESSAGES.invalidDate 
    })),

    time: z.string().min(1, { 
        message: ERROR_MESSAGES.invalidTime 
    }),
    
    termsAndConditions: z.literal(true, { 
        errorMap: () => ({ 
            message: ERROR_MESSAGES.termsNotAccepted 
        }) 
    }),
})