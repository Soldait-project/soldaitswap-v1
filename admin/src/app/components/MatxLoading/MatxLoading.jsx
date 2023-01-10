import React from 'react'
import { Box, styled } from '@mui/system'
import { CircularProgress } from '@mui/material'
import config from '../../config/config'
import Logo from '../../../assets/images/logo.png'

var imageUrl = config.imageUrl

const StyledLoading = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
        width: 'auto',
        height: '25px',
    },
    '& .circleProgress': {
        position: 'absolute',
        left: -7,
        right: 0,
        top: 'calc(50% - 25px)',
    },
}))

const Loading = () => {
    return (
        <StyledLoading>
            <Box position="relative">
                <img src={Logo} alt="" />
                <CircularProgress className="circleProgress" />
            </Box>
        </StyledLoading>
    )
}

export default Loading
