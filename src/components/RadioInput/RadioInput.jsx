import React from 'react';
import PropTypes from 'prop-types';
import styles from './RatioInput.module.css';

const RadioInput = ({ label, value, options = [], onChange = () => {}, disabled = true }) => {
    return (
        <div>
            <label>{label}</label>
            <div className={styles.gender_options  }>
                {options.map((option, index) => (
                    <label key={index} className="inline-flex items-center gap-x-2">
                        <input
                            type="radio"
                            value={option.value}
                            checked={value === option.value}
                            className="form-radio"
                            onChange={onChange}
                            disabled={disabled}
                        />
                        <span className="">{option.label || option.value}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

RadioInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired, 
            label: PropTypes.string, 
        })
    ).isRequired, 
};

export default RadioInput;
