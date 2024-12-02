// Mapear un objeto para cambiar las keys del mismo de acuerdo al objeto keyMapping 
export const mappingObject = (data, keyMapping) => {
    return Object.keys(data).reduce((acc, key) => {
        const newKey = keyMapping[key] || key
        acc[newKey] = data[key]
        return acc
    }, {})
}