import React from 'react';
import PropTypes from 'prop-types';
import styles from './OptionInput.module.css';

const OptionInput = ({ label, value, options = [], onChange = () => {}, disabled = true }) => {
    return (
        <div className={styles['form-option']}>
            <label htmlFor={label} className={styles['form-label']}>
                {label}
            </label>
            <select
                id={label}
                className={styles['form-select']}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label || option.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

OptionInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    onChange: PropTypes.func, 
    disabled: PropTypes.bool, 
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
            label: PropTypes.string, 
        })
    ).isRequired, 
};

export default OptionInput;
