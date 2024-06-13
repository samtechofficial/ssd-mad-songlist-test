export const getYear =(params:string)=>{
    return new Date(params).getFullYear()
}

export const formateDate =(params:string)=>{
    return new Date(params).toLocaleDateString()
}