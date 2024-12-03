// Mapear un objeto para cambiar las keys del mismo de acuerdo al objeto keyMapping 
export const mappingObject = (data, keyMapping) => {
    return Object.keys(data).reduce((acc, key) => {
        const newKey = keyMapping[key] || key
        acc[newKey] = data[key]
        return acc
    }, {})
}

// Funcion para limpiar las claves sin valores
export const cleanObject = (obj) => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined) {
            acc[key] = value
        }
        return acc
    }, {})
}