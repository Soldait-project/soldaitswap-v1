import useAuth from 'app/hooks/useAuth'
import React, { useState, useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Checkbox, FormControlLabel, Grid, Button,Alert,
    Snackbar,
    Icon, } from '@mui/material'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import logo from '../../../assets/images/logo.png'
import { getverify, resetpassword } from '../../Api/site';
import CryptoJS from 'crypto-js';
import config from '../../config/config'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(JustifyBox)(() => ({
    height: '100%',
    padding: '32px',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRegister = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const JwtRegister = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const [verify, setverify] = useState()
    const [opensuccess, setopensuccess] = useState()
    const { register } = useAuth()
    const { id } = useParams();


    useEffect(()=>{
        getcheck(id)
    },[])

    const getcheck=async(data)=>{
        let send ={
            "protocal":data
        }
       let res = await getverify(send)
       console.log(res.state,'state')
       setverify(res.state)
       if(!res.state){
        navigate('/processing');
    }
    }

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = async(event) => {
        try {
            var passwords = CryptoJS.AES.encrypt(password, config.secretkey).toString();
            let data ={
                "protocal":id,
                'password':passwords
            }
            await resetpassword(data)
            setopensuccess(true)
            setTimeout(() => { //Don't use function, use arrow function so 'this' refers to 'func' and not window
                navigate('/')
              }, 1000);  
            
        } catch (e) {
            console.log(e)
        }
    }

    let { password, confirmpassword } = state

    const handleSuccessClose =()=>{
        setopensuccess(false);
    }

    return (
    <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <ContentBox>
                            <IMG
                                src={logo}
                                alt=""
                            />
                        </ContentBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <Box p={4} height="100%">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="password"
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="confirmpassword"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="confirmpassword"
                                    type="password"
                                    value={confirmpassword}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FlexBox>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        Reset Password
                                    </Button>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/login")}
                                    >
                                        cancel
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={opensuccess} autoHideDuration={6000} onClose={handleSuccessClose}>
                            <Alert
                                onClose={handleSuccessClose}
                                severity="success"
                                sx={{ width: '100%' }}
                                variant="filled"
                            >
                                Reset password Successfully!!!
                            </Alert>
            </Snackbar>
        </JWTRegister>
    )
}

export default JwtRegister
