import React, { useEffect, useState } from 'react';

import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    FireTruckTwoTone
} from "@mui/icons-material"
import UserImage from '../../components/UserImage';
import Flexbetween from '../../components/Flexbetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Divider, Typography } from '@mui/material';

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const data = await response.json();
        setUser(data)
    };



    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    if (!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;


    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <Flexbetween
                gap={"0.5rem"}
                pb={"1.1rem"}
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <Flexbetween gap={"1rem"} >
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight={"500"}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>

                        <Typography color={medium}  >{friends.length} friends</Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </Flexbetween>
                <Divider />
            </Flexbetween>
            <Divider />
            {/* Second Row */}

            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize='large' sx={{
                        color: main
                    }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize='large' sx={{
                        color: main
                    }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0" >
                <Flexbetween mb={"0.5rem"} >
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight={"500"} >{viewedProfile}</Typography>
                </Flexbetween>
                <Flexbetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </Flexbetween>
            </Box>

            <Divider />


            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <Flexbetween gap="1rem" mb="0.5rem">
                    <Flexbetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </Flexbetween>
                    <EditOutlined sx={{ color: main }} />
                </Flexbetween>

                <Flexbetween gap="1rem">
                    <Flexbetween gap="1rem">
                        <img src="../assets/linkedin.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>Network Platform</Typography>
                        </Box>
                    </Flexbetween>
                    <EditOutlined sx={{ color: main }} />
                </Flexbetween>
            </Box>
        </WidgetWrapper>
    );
}

export default UserWidget;
