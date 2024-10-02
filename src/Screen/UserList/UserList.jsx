import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './userlist.module.css';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AnchorModel from '../../components/TableAnchor/AnchorModel';
import SearchBar from '../../components/SearchBar/SearchBar';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import OptionInput from '../../components/OptionInput/OptionInput';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const usersPerPage = 10;
    const navigate = useNavigate();



    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/users?page=${currentPage}&limit=${usersPerPage}`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, [currentPage]);


    if (loading) return <p>Loading...</p>;


    const handleClick = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];


    const deleteUser = async (id) => {
        if (!id) return;

        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_URL}/api/users/${id}`);
                alert('User deleted successfully');
                setUsers((prev) => prev.filter(user => user._id !== id));
            } catch (err) {
                console.error('Error deleting user:', err);
            }
        } else {
            navigate('/');
        }
    };


    const searchUser = async (searchQuery) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/users/search/query`, {
                params: { searchQuery }
            });
            const users = response.data;
            return users;
        } catch (error) {
            console.log('Error searching users:', error);
        }
    };


    const exportToCSV = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/api/users/exports/csvfile`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `users_${Math.floor(Math.random() * 1000000)}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    };

    return (
        <div className={styles.list_container}>
            <div className="w-full md:w-3/5 mx-auto">
                <div >
                    <div className={styles['nav-section']}>
                        <div className='w-full md:w-3/5'>
                            <SearchBar searchUsers={searchUser} />
                        </div>

                        <div className={styles['nav-buttons']}>
                            <button className={styles['add-user-button']} onClick={() => navigate('/add')}>+ Add User</button>
                            <button className={styles['export-button']} onClick={exportToCSV}>
                                Export To CSV
                            </button>
                        </div>
                    </div>
                    <div className={styles['table-container']}>
                        <table className={styles.table}>
                            <thead className={styles['table-header']}>
                                <tr>
                                    <th className="table-cell">ID</th>
                                    <th className="table-cell">FullName</th>
                                    <th className="table-cell">Email</th>
                                    <th className="table-cell">Gender</th>
                                    <th className="table-cell">Status</th>
                                    <th className="table-cell">Profile</th>
                                    <th className="table-cell">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className={styles['table-row']}>
                                        <td className={styles['table-cell']}>{user.user_id}</td>
                                        <td className={styles['table-cell']}>{user.firstName + " " + user.lastName}</td>
                                        <td className={styles['table-cell']}>{user.email}</td>
                                        <td className={styles['table-cell']}>{user.gender}</td>
                                        <td className={styles['table-cell']}>

                                            <OptionInput
                                                // label="Status"
                                                value={user.status}
                                                options={statusOptions}
                                                disabled={true}
                                                className={styles['input-field']}
                                            />
                                        </td>
                                        <td className={styles['table-cell']}>
                                            <img src={`${process.env.REACT_APP_URL}${user.profile}`} alt="Profile" className={styles['profile-img']} />
                                        </td>
                                        <td className={styles['table-cell']}>
                                            <MoreVertIcon onClick={(e) => handleClick(e, user)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <AnchorModel
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                close={handleClose}
                                user={selectedUser}
                                UserDelete={deleteUser}
                            />
                        </table>
                    </div>
                </div>



                <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>

    );
};

export default UserList;
