import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Card, Grid, Button,Alert,
    Snackbar,
    Icon, } from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import logo from '../../../assets/images/logo.png'
import {forgotpassword} from '../../Api/site';



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
    padding: '52px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = useState(false)
    const [alertmessage,setalertmessage] = useState('')

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    var randHex = function (len) {
        var maxlen = 10;
        var min = Math.pow(16, Math.min(len, maxlen) - 1);
        var max = Math.pow(16, Math.min(len, maxlen)) - 1;
        var n = Math.floor(Math.random() * (max - min + 1)) + min;
        var r = n.toString(16);
        while (r.length < len) {
          r = r + randHex(len - maxlen);
        }
        return r;
      };

    const handleFormSubmit = async (event) => {
        console.log(state)
        let { email } = state
        let protocal = randHex(8);
        let mail ={
            'email': email,
            'identifier':"User_forgot",
            'protocal': protocal
        }
       let res =await forgotpassword(mail)
       if(res.status){
        setalertmessage(res.message);
        setOpen(true)
       }else{
        setalertmessage(res.message);
        setOpen2(true)
       }
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    function handleClose2(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen2(false)
    }

    let { email } = state

    return (
        <ForgotPasswordRoot>
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
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    size="small"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <FlexBox>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Forgot Password
                                    </Button>
                                    <Span sx={{ mr: 1, ml: '16px' }}></Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                </FlexBox>
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
            <Snackbar  anchorOrigin={{vertical:'top',horizontal:'right'}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {alertmessage}
                </Alert>
            </Snackbar>
            <Snackbar  anchorOrigin={{vertical:'top',horizontal:'right'}} open={open2} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose2}
                    severity="warning"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {alertmessage}
                </Alert>
                </Snackbar>
        </ForgotPasswordRoot>
    )
}

export default ForgotPassword
