'use client'

import React from "react";
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";

import './CustomDropdown.css';

const CustomInput = ({ name, control, label, type = "text", error, placeholder, defaultValue, dropdownOptions }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) =>
                    type === "select" ? (
                        <select
                            id={name}
                            {...field}
                            className={`input-field ${error ? "is-invalid" : ""}`}
                        >
                            <option value="">{placeholder}</option>
                            {dropdownOptions.map((option: any) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            {...field}
                            className={`input-field ${error ? "is-invalid" : ""}`}
                        />
                    )
                }
            />
            {error ? (
                <p className="error-message">{error.message}</p>
            ) : (
                <div className="placeholder-space"></div>
            )}
        </div>
    );
};

CustomInput.propTypes = {
    name: PropTypes.any,
    control: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.object,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dropdownOptions: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
};

export default CustomInput;
