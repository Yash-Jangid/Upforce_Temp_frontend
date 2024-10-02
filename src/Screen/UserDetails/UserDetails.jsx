import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../../components/FormInput/FormInput';
import OptionInput from '../../components/OptionInput/OptionInput';
import RadioInput from '../../components/RadioInput/RadioInput';
import styles from './UserDetails.module.css';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL}/api/users/${id}`)
            .then(response => setUser(response.data))
            .catch(error => console.log('Error fetching user details:', error));
    }, [id]);

    if (!user) return <p>Loading...</p>;

    const genderOptions = [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
    ];

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles['form-container']}>
                <h1 className={styles.title}>Your Details</h1>

                <div className={styles['profile-picture']}>
                    <img src={`${process.env.REACT_APP_URL}${user.profile}`} alt="Profile" className={styles['profile-image']} />
                </div>

                <div className={styles['form-grid']}>
                    <FormInput
                        id="firstName"
                        label="First Name"
                        type="text"
                        placeholder="Enter First Name"
                        value={user.firstName}
                        className={styles['input-field']}
                    />

                    <FormInput
                        id="lastName"
                        label="Last Name"
                        type="text"
                        placeholder="Enter Last Name"
                        value={user.lastName}
                        className={styles['input-field']}
                    />

                    <FormInput
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="Enter Email"
                        value={user.email}
                        className={styles['input-field']}
                    />

                    <FormInput
                        id="mobile"
                        label="Mobile"
                        type="text"
                        placeholder="Enter Mobile"
                        value={user.mobile}
                        className={styles['input-field']}
                    />

                    <RadioInput
                        label="Gender"
                        value={user.gender}
                        options={genderOptions}
                        disabled={!isEditMode}
                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                        className={styles['input-field']}
                    />

                    <OptionInput
                        label="Status"
                        value={user.status}
                        options={statusOptions}
                        disabled={!isEditMode}
                        onChange={(e) => setUser({ ...user, status: e.target.value })}
                        className={styles['input-field']}
                    />

                    <FormInput
                        id="location"
                        label="Location"
                        type="text"
                        placeholder="Enter Location"
                        value={user.location}
                        className={styles['input-field']}
                    />

                </div>

                {/* <button className={styles['submit-button']}>Submit</button> */}
            </div>

            <Link to="/" className={styles['back-link']}>Back to List</Link>
        </div>
    );
};

export default UserDetails;
