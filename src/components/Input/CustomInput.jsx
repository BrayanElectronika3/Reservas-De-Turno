import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'

import './CustomInput.css'

const CustomInput = ({ name, control, label, type = "text", error, placeholder, defaultValue}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Controller 
                name={name} 
                control={control} 
                defaultValue={defaultValue}
                render={({ field}) => 
                    <input 
                        id={name} 
                        type={type} 
                        placeholder={placeholder}
                        {...field} 
                        className={`input-field ${error ? "is-invalid" : ""}`}
                    />
            }/>
            {error ? (
                <p className="error-message">{error.message}</p>
            ) : (
                <div className="placeholder-space"></div>
            )}
        </div>
    )
}

CustomInput.propTypes = {
    name: PropTypes.any,
    control: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.object,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.oneOfType([ PropTypes.string, PropTypes.string ])
};

export default CustomInput