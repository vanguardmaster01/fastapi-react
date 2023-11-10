/* eslint-disable react/prop-types */
const Message = ({message, type}) => {
    return (
        <div className={`text-center p-1 bg-${type}-200 text-${type}-800 border border-${type}-600 rounded`}>
            {message}
        </div>
    )
}

export default Message
