import { z } from "zod"

const documentType = z.string().min(1, { message: 'Campo obligatorio' })
const documentNumber = z.number().min(5, { message: 'Campo obligatorio' })

export const squemaLogin = z.object({
    documentType: documentType,
    documentNumber: documentNumber,
})