import React from 'react';

const FormInput = ({
    id,
    label,
    value,
    type = 'text',
    placeholder = '',
    register = () => { },
    errors = {},
    validation = {},
    disabled = false,
}) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <input
            {...register(id, validation)}
            type={type}
            id={id}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            className={`mt-1 block w-full p-2 border ${errors[id] ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
        {errors[id] && (
            <span className="text-red-500 text-sm mt-1">{`${label} is required`}</span>
        )}
    </div>
);

export default FormInput;
