import {axios} from '../../utils/axios'

export const loginService = async ({email, password}) => {
    
    return await axios.post('/login', {
        username: email,
        password,
    })
}

export default loginService
