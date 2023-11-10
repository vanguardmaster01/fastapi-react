/* eslint-disable react/prop-types */
import Login from '../components/pages/Login'
import loginService from '../services/auth/loginService'

const LoginPage = () => {
    return <Login loginService={loginService} />
}

export default LoginPage
