/* eslint-disable react/prop-types */

const Button = ({children, extendClasses, ...rest}) => {
    return (
        <button
            className={`w-full bg-gray-900 hover:bg-transparent border border-gray-900 text-white hover:text-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 uppercase ease-in duration-150 ${extendClasses}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
