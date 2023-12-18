import * as crypto from 'crypto'
const algorithm = 'aes-256-ctr'
const secretKey = 'KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZ'

export const encrypthPassword = (password: string): string =>{
    if(!password){
        throw new Error('Internal Server Error')
    }
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(password).digest('base64')
    return salt + '$' + hash
}
