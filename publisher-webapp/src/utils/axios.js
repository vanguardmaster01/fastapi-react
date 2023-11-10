import axios from 'axios'

const axiosInstanc = axios.create({
	baseURL: 'https://sea-turtle-app-wd93j.ondigitalocean.app',
	withCredentials: true,
})

export {axiosInstanc as axios}
