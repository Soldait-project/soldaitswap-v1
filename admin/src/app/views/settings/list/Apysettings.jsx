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
import { updateAPY,getAPY } from '../../../Api/site'
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
    _id: '',
    apy: '',
}

const Apysettings = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = useState(false)
    const [alertmessage, setalertmessage] = useState('')
    const [validatation, setvalidatation] = React.useState({})
    const [disable,setdisable] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    useEffect(() => {
        geymyAPY()
    },[])

    const geymyAPY=(async()=>{
        let {result} = await getAPY();
        console.log(result,"result")
        let req = {"_id": result._id,"apy": result.apy}
        setState({
            ...state,
            ...{"_id": result._id,"apy": result.apy}
        })
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
        console.log(state,"statevalue")
        let { _id,apy } = state
        setdisable(true)
        let wallet  =  await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log(wallet,"wallet");
        wallet = wallet[0];
        var web3 = new Web3(window.web3.currentProvider)

        var Mastercontract = new web3.eth.Contract(
            Masterchef,
            config.masterchef
        )
        let owneraddrss = await Mastercontract.methods.owner().call()
        owneraddrss = owneraddrss.toLowerCase()
        if(owneraddrss != wallet){
            setalertmessage("Please use Owner address")
            setOpen2(true)
            setdisable(false)
            return;
        }
        try{
        let apyvalue = apy * 100;
        var results = await Mastercontract.methods.updateEmissionRate(apyvalue).send({
            from: wallet
        })
        let reqdata = {
            _id: _id,
            apy: apy,
        }
        var { status, error, message } = await updateAPY(reqdata)
        console.log(error, 'error')
        if (status) {
            setalertmessage(message)
            setOpen(true)
            setdisable(false)

        } else {
            setalertmessage(message)
            setOpen2(true)
            setdisable(false)
            console.log(error, 'errr')
            let errorMessages = { apy: error }
            setvalidatation(errorMessages)
        }
    }catch(err){
        console.log(err,"walleterror");
        setalertmessage("Rejected!!!")
        setOpen2(true)
        setdisable(false)
    }
    }

    const gettransactionlist = async () => {
        var web3 = new Web3(window.web3.currentProvider)
        var Mastercontract = new web3.eth.Contract(
            Masterchef,
            config.masterchef
        )
        var results = await Mastercontract.getPastEvents('Withdraw', {
            // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest',
        })
        console.log(results, 'results')
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

    let { apy } = state
    console.log(validatation, 'validatation')
    return (
        <Container>
            <SimpleCard title="APY settings">
                <Card className="card">
                    <Grid container>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <ContentBox>
                                <ValidatorForm onSubmit={handleFormSubmit}>
                                    <TextValidator
                                        sx={{ mb: 3, width: '100%' }}
                                        variant="outlined"
                                        label="APY"
                                        onChange={handleChange}
                                        type="apy"
                                        name="apy"
                                        size="small"
                                        value={state.apy || ''}
                                        validators={['required','minNumber:0']}
                                        errorMessages={[
                                            'This field is required',
                                            'Value must be positive',
                                        ]}
                                    />
                                    {validatation && validatation.apy && (
                                        <Error style={{ color: 'red' }}>
                                            {validatation.apy}
                                        </Error>
                                    )}
                                    <FlexBox>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            disabled ={disable}
                                        >
                                            Update APY
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

export default Apysettings;
