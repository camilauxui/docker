// utils/generateToken.ts  
export const generateToken = (payload: any) => {  
    const header = {  
        alg: 'HS256',  
        typ: 'JWT'  
    };  
    const encodedHeader = btoa(JSON.stringify(header));  
    const encodedPayload = btoa(JSON.stringify(payload));  
    const signature = btoa(encodedHeader + encodedPayload + 'your-secret'); // Replace 'your-secret'  
    return `${encodedHeader}.${encodedPayload}.${signature}`;  
};