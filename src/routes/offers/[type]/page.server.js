export const load = async({ params }) => {
    const type = params.type;



    return {
        type,
        typeName: type.replace("-", " ")
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.substring(1))
            .join(' ')
    }
}