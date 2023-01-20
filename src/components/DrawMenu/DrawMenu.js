import { Avatar, Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import "./DrawMenu.scss"

const navItems = [{ icon: <ImportContactsIcon />, name: "문제풀기" }
    , { icon: <TrackChangesIcon />, name: "성적보기" }
    , { icon: <LineAxisIcon />, name: "학습분석" }]


const DrawMenu = ({ onDrawerToggle }) => {

    const [userName, setUserName] = useState("Ayun Kim")

    const drawer = (
        <Box onClick={onDrawerToggle} sx={{ width: 180 }}>
            <Typography variant="h6" sx={{ my: 2, marginLeft: 2 }}>
                <div className='header'>
                    <Avatar alt="Ayun" src="ayun_ski.jpg" />
                    <span className='title'>{userName}</span>
                </div>
            </Typography>
            <Divider />
            <List className='menu_list'>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton className='item'>
                            {item.icon}
                            <ListItemText className="name" primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return <>{drawer}</>
}

export default DrawMenu