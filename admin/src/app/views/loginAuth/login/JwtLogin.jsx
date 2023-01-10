import { Card, Grid, Button, CircularProgress ,InputLabel } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import config from '../../../config/config'
import isEmpty from 'is-empty'
import useAuth from 'app/hooks/useAuth'
import { loginValidate } from './validation'
import { loginCheck } from '../../../Api/UserActions'
import { toastAlert } from '../../../helper/toastAlert'
import logo from '../../../../assets/images/logo.png'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
    background: '#3881ac',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '50px 30px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.0)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

var initialData = {
    emailid: '',
    password: '',
}

var imageUrl = config.imageUrl

const JwtLogin = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [fromValue, setfromValue] = useState(initialData)
    const [errors, seterrors] = useState({})

    const { login } = useAuth()

    const handleChange = async ({ target: { name, value } }) => {
        var formData = { ...fromValue, ...{ [name]: value } }
        var isError = await loginValidate(formData)
        seterrors({})
        if (!isEmpty(isError)) {
            seterrors(isError)
        }
        setfromValue(formData)
    }

    const { palette } = useTheme()
    const textPrimary = palette.primary.main

    const handleFormSubmit = async (event) => {
        var isError = await loginValidate(fromValue)
        console.log(isError, 'isErrorisError')
        setLoading(true)
        seterrors({})
        if (!isEmpty(isError)) {
            seterrors(isError)
            setLoading(false)
        } else {
            var { message, errors, token } = await loginCheck(fromValue)
            await login(token)
            console.log(errors, 'errors')
            if (!isEmpty(errors)) {
                seterrors(errors)
            } else if (message === 'true') {
                toastAlert('success', 'Successfully login', 'login')
                navigate('/')
            }
            setLoading(false)
        }
    }

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src={logo}
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                            <InputLabel htmlFor="currencytype">Email</InputLabel>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    // label="Email"
                                    onChange={handleChange}
                                    type="text"
                                    name="email"
                                    value={fromValue.email}
                                />
                                {errors &&
                                    errors.emailid &&
                                    errors.emailid !== '' && (
                                        <p style={{ color: 'red' }}>
                                            {errors.emailid}
                                        </p>
                                    )}
 <InputLabel htmlFor="currencytype">Password</InputLabel>
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    // label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={fromValue.password}
                                    errorMessages={['this field is required']}
                                />
                                {errors &&
                                    errors.password &&
                                    errors.password !== '' && (
                                        <p style={{ color: 'red' }}>
                                            {errors.password}
                                        </p>
                                    )}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                </FlexBox>
                                <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() =>
                                        navigate('/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
