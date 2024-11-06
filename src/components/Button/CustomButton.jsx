import './CustomButton.css'

// eslint-disable-next-line react/prop-types
const CustomButton = ({ name, label, type = "button", onClick }) => {
    return (
        <button name={name} type={type} onClick={onClick} className="custom-button">
            {label}
        </button>
    )
}

export default CustomButton