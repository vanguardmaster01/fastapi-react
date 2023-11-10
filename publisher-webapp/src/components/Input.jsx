// eslint-disable-next-line react/prop-types
const Input = ({id, type, label, value, onChange, placeholder, classname, ...rest}) => {
    return (
        <div className={classname}>
            <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                {label}
            </label>
            <input
                type={type}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                id={id}
                name={id}
                {...rest}
            />
        </div>
    )
}

export default Input
