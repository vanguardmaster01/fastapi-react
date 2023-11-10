/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import Input from '../Input'
import Button from '../Button'
import {useNavigate} from 'react-router-dom'
import Message from '../Message'

const Login = ({loginService}) => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setSuccess] = useState(false)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const {email, password} = formData
        setError('')
        setSuccess(false)
        setLoading(true)

        try {
            await loginService({
                email,
                password,
            })
            localStorage.setItem('user', JSON.stringify({
                "username": email
            }))
            setSuccess(true)
        } catch (error) {
            setError(error?.response?.data?.detail)
        }
        setLoading(false)
    }

    useEffect(() => {
        let timeOut
        if (isSuccess) {
            timeOut = setTimeout(() => {
                navigate('/article-list')
            }, 500)
        }
        return () => clearTimeout(timeOut)
    }, [isSuccess, navigate])

    return (
        <section className='bg-gray-50 dark:bg-gray-900'>
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                    <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                            Sign in to your account
                        </h1>
                        <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
                            <Input
                                type='text'
                                id='email'
                                placeholder='Enter your username'
                                value={formData.email}
                                label={'Your username'}
                                onChange={handleChange}
                            />

                            <Input
                                type='password'
                                id='password'
                                placeholder='Enter your password'
                                value={formData.password}
                                label={'Your password'}
                                onChange={handleChange}
                            />

                            {error && <Message message={error} type='red' />}
                            {isSuccess && <Message message='Sign in Successful!' type='green' />}

                            <Button text='Login' type='submit' disabled={isLoading}>
                                {isLoading ? 'Sign In...' : isSuccess ? 'Successfull' : 'Sign In'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
