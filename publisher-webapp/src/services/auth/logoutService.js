import {axios} from '../../utils/axios'

export const logoutService = async ({username}) => {
    return await axios.post('/logout', {
        username,
    })
}
export default logoutService
