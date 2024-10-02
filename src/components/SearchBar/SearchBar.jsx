import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ searchUsers, onOptionSelect = () => { }, disabled = false }) {
    const [searchText, setSearchText] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
    };

    const handleSearch = async () => {
        if (searchText) {
            const users = await searchUsers(searchText);
            if (users && users.length > 0) {
                const filteredUsers = users.filter(user =>
                    user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchText.toLowerCase())
                );

                setFilterOptions(filteredUsers.map(user => ({
                    id: user._id,
                    Name: `${user.firstName} ${user.lastName}`,
                    email: user.email
                })));
            } else {
                setFilterOptions([]);
            }
        } else {
            setFilterOptions([]);
        }
    };

    const handleOptionSelect = (selectedValue) => {
        console.log('selectedValue', selectedValue);

        onOptionSelect(selectedValue);
        navigate(`/view/${selectedValue}`)
        setSearchText('');
        setFilterOptions([]);
    };

    return (
        <div className="relative flex flex-col space-y-2 w-full">
            <div className={styles['search-Section']}>
                <input
                    type="text"
                    placeholder="Search"
                    className={`border rounded p-2 w-full`}
                    value={searchText}
                    onChange={handleInputChange}
                    disabled={disabled}
                >
                </input>
                <button
                    type="button"
                    onClick={handleSearch}
                    className={styles.searchButton}
                    disabled={disabled || !searchText}
                >
                    Search
                </button>

            </div>
            {filterOptions.length > 0 && (
                <div className={`flex flex-col space-y-2 border-2 border-red-400 rounded-b-sm ${styles.suggestionBox}`}>
                    {filterOptions.map((option) => (
                        <div
                            key={option.id}
                            className={`flex justify-start gap-x-4 p-2 hover:bg-gray-200 cursor-pointer`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <h5 className="text-[#000]">{option.Name}</h5>
                            <h6 className="text-[#555]">{option.email}</h6>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

SearchBar.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    onOptionSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};
