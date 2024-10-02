import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const AnchorModel = ({ anchorEl, open, close, user, UserDelete }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/view/${user._id}`)
        close();
    };

    const handleEdit = () => {
        navigate(`/edit/${user._id}`)
        close();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={close}
            onClick={close}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleView}>
                <ListItemIcon>
                    <VisibilityIcon fontSize="small" />
                </ListItemIcon>
                View
            </MenuItem>
            <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                Edit
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { UserDelete(user._id) }} >
                <ListItemIcon>
                    <DeleteIcon fontSize="small"  />
                </ListItemIcon>
                Delete
            </MenuItem>
        </Menu>
    );
};

export default AnchorModel;
