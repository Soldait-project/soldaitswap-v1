import React, { useState, useEffect } from 'react'
import { Box, styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { Span } from 'app/components/Typography'
import { Breadcrumb, SimpleCard } from 'app/components'
import {
    Card,
    Grid,
    Button,
    Alert,
    Snackbar,
    Icon,
    CircularProgress,
    Table,
} from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { forgotpassword } from '../../../Api/site'
import { red } from '@mui/material/colors'
import Web3 from 'web3'
import config from '../../../config/config'
import Masterchef from '../../../ABI/MasterChef'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
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

const Error = styled('span')(({ theme }) => ({
    color: red,
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const SubTitle = styled('span')(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))
var validatationerror = {
    email: '',
}

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = useState(false)
    const [alertmessage, setalertmessage] = useState('')
    const [validatation, setvalidatation] = React.useState({})

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    useEffect(() => {
        // gettransactionlist()
        // getsocketlist()
    })

    var randHex = function (len) {
        var maxlen = 10
        var min = Math.pow(16, Math.min(len, maxlen) - 1)
        var max = Math.pow(16, Math.min(len, maxlen)) - 1
        var n = Math.floor(Math.random() * (max - min + 1)) + min
        var r = n.toString(16)
        while (r.length < len) {
            r = r + randHex(len - maxlen)
        }
        return r
    }

    const handleFormSubmit = async (event) => {
        console.log(state)
        let { email } = state
        let protocal = randHex(8)
        let mail = {
            email: email,
            identifier: 'User_change_password',
            protocal: protocal,
        }
        var { status, error, message } = await forgotpassword(mail)
        console.log(error, 'error')
        if (status) {
            setalertmessage(message)
            setOpen(true)
        } else {
            setalertmessage(message)
            setOpen2(true)
            console.log(error, 'errr')
            let errorMessages = { email: error }
            setvalidatation(errorMessages)
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
    console.log(validatation, 'validatation')
    return (
        <Container>
            <SimpleCard title="Change password">
                <Card className="card">
                    <Grid container>
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
                                            'This field is required',
                                            'email is not valid',
                                        ]}
                                    />
                                    {validatation && validatation.email && (
                                        <Error style={{ color: 'red' }}>
                                            {validatation.email}
                                        </Error>
                                    )}
                                    <FlexBox>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                        >
                                            Change Password
                                        </Button>
                                    </FlexBox>
                                </ValidatorForm>
                            </ContentBox>
                        </Grid>
                    </Grid>
                </Card>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        {alertmessage}
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open2}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose2}
                        severity="warning"
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        {alertmessage}
                    </Alert>
                </Snackbar>
            </SimpleCard>
        </Container>
    )
}

export default ForgotPassword
