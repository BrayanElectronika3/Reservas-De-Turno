// IDTenant
export const setTenantData = (IDTenant) => {
    try {
        if (IDTenant === null || IDTenant === undefined || IDTenant === '') throw new Error ('Error al obtener los datos del IDTenant')
        localStorage.setItem("tenant", IDTenant)
        return IDTenant
    } catch (error) {
        console.error('Error al obtener los datos del IDTenant', error)
        return null
    }
}

export const getTenantData = () => {
    try {
        const data = localStorage.getItem('tenant')
        return data ? data : ''
    } catch (error) {
        console.error('Error al obtener los datos del ID Tenant:', error)
        return ''
    }
}

// Document Type
export const setDocumentType = (data) => {
    try {
        if (data === null || data === undefined || data === '') throw new Error ('Error al obtener los datos del tipo de documento')
        localStorage.setItem('documentType', JSON.stringify(data))
        return data
    } catch (error) {
        console.error('Error al obtener los datos del tipo de documento', error)
        return null
    }
}

export const getDocumentType = () => {
    try {
        const data = localStorage.getItem('documentType')
        return data ? JSON.parse(data) : {}
    } catch (error) {
        console.error('Error al obtener los datos de los tipos de documento:', error)
        return {}
    }
}

// User
export const setuser = (data) => {
    try {
        if (data === null || data === undefined || data === '') throw new Error ('Error al obtener los datos del usuario')
        localStorage.setItem('user', JSON.stringify(data))
        return data
    } catch (error) {
        console.error('Error al obtener los datos del usuario', error)
        return null
    }
}

export const getUser = () => {
    try {
        const data = localStorage.getItem('user')
        return data ? JSON.parse(data) : {}
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
        return {}
    }
}

// Reservation
export const getReservationData = () => {
    try {
        const data = localStorage.getItem('reservation')
        return data ? JSON.parse(data) : {}
    } catch (error) {
        console.error('Error al obtener los datos de la reserva:', error)
        return {}
    }
}

export const setReservationData = (data) => {
    try {
        if (data === null || data === undefined || data === '') throw new Error ('Error al obtener los datos de la reserva')
        localStorage.setItem('reservation', JSON.stringify(data))
        return data
    } catch (error) {
        console.error('Error al obtener los datos de la reserva', error)
        return null
    }
}