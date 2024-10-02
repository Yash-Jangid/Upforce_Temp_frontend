import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import FormInput from '../../components/FormInput/FormInput';
import { styled } from '@mui/material';
import styles from "./userForm.module.css"
import OptionInput from '../../components/OptionInput/OptionInput';
import RadioInput from '../../components/RadioInput/RadioInput';

const UserForm = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            axios
                .get(`${process.env.REACT_APP_URL}/api/users/${id}`)
                .then((response) => setUser(response.data))
                .catch((error) => console.log('Error fetching user details:', error));
        }
    }, [id]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: user,
    });

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        console.log('data', data);

        try {
            if (data.profile.length > 0) {
                const formData = new FormData();
                formData.append('image', data.profile[0]);
                const uploadResponse = await axios.post(`${process.env.REACT_APP_URL}/api/users/upload/assets`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const filePath = uploadResponse.data.filePath;

                if (filePath) {
                    const userData = { ...data, profile: filePath };
                    if (isEdit) {
                        await axios.put(`${process.env.REACT_APP_URL}/api/users/${id}`, userData);
                        alert('User updated successfully');
                        setLoading(false)
                    } else {
                        await axios.post(`${process.env.REACT_APP_URL}/api/users`, userData);
                        alert('User added successfully');
                        setLoading(false)
                    }

                    navigate('/');
                }
            } else {
                setLoading(false)
                console.error("Image not uploaded correctly. Please try again.");
            }
        } catch (error) {
            setLoading(false)
            console.error("Error during submission:", error);
            alert('An error occurred. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles['UserFrom-container']}>
            <div className=" p-6 bg-white rounded-lg shadow-2xl md:w-3/5">
                <div className={styles['profile-picture']}>
                    <img src={`${process.env.REACT_APP_URL}${user.profile}`} alt="Profile" className={styles['profile-image']} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-6 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6">
                        <FormInput
                            id="firstName"
                            label="First Name"
                            type="text"
                            placeholder="Enter First Name"
                            register={register}
                            errors={errors}
                            validation={{ required: true }}
                        />

                        <FormInput
                            id="lastName"
                            label="Last Name"
                            type="text"
                            placeholder="Enter Last Name"
                            register={register}
                            errors={errors}
                            validation={{ required: true }}
                        />

                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Enter Email"
                            register={register}
                            errors={errors}
                            validation={{ required: true }}
                        />

                        <FormInput
                            id="mobile"
                            label="Mobile"
                            type="text"
                            placeholder="Enter Mobile"
                            register={register}
                            errors={errors}
                            validation={{ required: true }}
                        />

                        <div>

                            <RadioInput
                                label="Gender"
                                value={watch('gender') || ''}
                                onChange={(e) => setValue('gender', e.target.value)}
                                options={[
                                    { value: 'M', label: 'Male' },
                                    { value: 'F', label: 'Female' },
                                ]}
                                disabled={false}
                            />

                        </div>

                        <div>
                            <OptionInput
                                label="Status"
                                value={watch('status') || ''}
                                onChange={(e) => setValue('status', e.target.value)}
                                options={[
                                    { value: '', label: 'Select...' },
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                ]}
                                disabled={false}
                            />
                            {errors.status && <span className="text-red-500 text-sm">Status is required</span>}
                        </div>

                        <FormInput
                            id="location"
                            label="Location"
                            type="text"
                            placeholder="Enter Location"
                            register={register}
                            errors={errors}
                            validation={{ required: true }}
                        />

                        <div >
                            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                            <input
                                type="file"
                                {...register('profile')}
                                className={styles['form-select']}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="btn-submit w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-quinary">
                            {isEdit ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>

            </div>
        </div>


    );
};

export default UserForm;
// /upload/assets