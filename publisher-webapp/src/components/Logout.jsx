import {useEffect, useState} from 'react'
import logoutService from '../services/auth/logoutService'
import {useNavigate} from 'react-router'

const Logout = () => {
    const navigate = useNavigate()
    const [isLoginSuccessfull, isSetLoginSuccessfull] = useState(false)

    const handleLogoOut = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        try {
            const {data} = await logoutService(user)
            isSetLoginSuccessfull(data.logout_successful)
            localStorage.removeItem('user')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!isLoginSuccessfull) return
        const timer = setTimeout(() => {
            navigate('/')
        }, 500)
        return () => timer
    }, [isLoginSuccessfull, navigate])

    return (
        <button type='button' className='bg-blue-300 py-2 px-4 rounded' onClick={handleLogoOut}>
            Logout
        </button>
    )
}

export default Logout
