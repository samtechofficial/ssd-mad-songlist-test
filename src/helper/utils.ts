export const getYear =(params:string)=>{
    return new Date(params).getFullYear()
}

export const formateDate =(params:string)=>{
    return new Date(params).toLocaleDateString()
}

export function generateRandomString(length:any) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}