import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Web3 from 'web3'
import { styled, Box } from '@mui/system'
import MasterChefABI from '../../../ABI/MasterChef.json'
import FactoryABI from '../../../ABI/FactoryABI.json'
import BEP20ABI from '../../../ABI/BEP20.json'
import config from '../../../config/config'
import { addToken, updateToken } from 'app/Api/Swapping'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Alert, Snackbar, CircularProgress } from '@mui/material'
import { red } from '@mui/material/colors'
import {
    Multicall,
    ContractCallResults,
    ContractCallContext,
} from 'ethereum-multicall'
import { getFormatMulticall } from '../../../helper/multicallreturn'
import isEmpty from 'app/helper/isEmpty'
import { toastAlert } from 'app/helper/toastAlert'

var initialvalue = {
    _id: '',
    name: '',
    symbol: '',
    decimals: '',
    totalSupply: '',
    address: '',
    lplogo: '',
    logoURI: '',
}

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))
const Error = styled('span')(({ theme }) => ({
    color: red,
}))

export default function AddToken(props) {
    var { openfarm, setopenfarm, Edit, setEdit, Editdata, reload } = props
    const [formmodel, setformmodel] = React.useState()
    const [open2, setopen2] = React.useState(false)
    const [opensuccess, setopensuccess] = React.useState(false)
    const [errorMessages, seterrorMessages] = React.useState('')
    const [successMessages, setsuccessMessages] = React.useState('')
    const [farmData, setfarmData] = React.useState(initialvalue)
    const [tokenimage, settokenimage] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [validatation, setvalidatation] = React.useState({})

    const IMG = styled('img')(() => ({
        width: '100%',
    }))
    console.log(Editdata, 'EditdataEditdataEditdata')
    useEffect(async () => {
        await MetaMask()
        if (Edit && Editdata) {
            console.log('MetaMaskMetaMask--MetaMask')
            Editdata.alloc = Editdata.alloc / 100
            Editdata.depositFee = Editdata.depositFee / 100
            setfarmData((prev) => {
                return { ...prev, ...Editdata }
            })
        }
    }, [])

    const MetaMask = async (e) => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum)
                let version = await web3.eth.getChainId()
                if (config.netWorkversion == version) {
                    let address = await web3.eth.getAccounts()
                    let data = address[0]
                    console.log(data, 'address2')
                    var addressData = {
                        user: data,
                    }
                    setfarmData((prev) => {
                        return { ...prev, ...addressData }
                    })
                } else {
                    seterrorMessages('Please Connect Binance Network')
                    setopen2(true)
                    console.log('please connect Binance')
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function SubmitFarm() {
        try {
            var imageFormat = /\.(png)$/;
            var errors = {};
            if(!farmData.lplogo){
                errors.logoURI = "Please Select logo";
                setvalidatation(errors)
                return;
            }
            if (tokenimage) {

                    console.log(farmData.lplogo.name, "Name")
                    if (!imageFormat.test(farmData.lplogo.name)) {
                        errors.logoURI = "Please Select PNG format only";
                        setvalidatation(errors)
                        return;
                    }
            }
            var web3 = new Web3(window.web3.currentProvider)
            var fromtokens = web3.utils.isAddress(farmData.address)
            setLoading(true)
            setvalidatation({})
            if (!fromtokens) {
                errors.address = 'Please enter valid contract address'
                setvalidatation(errors)
                setLoading(false)
                return
            }
            try {
                var web3 = new Web3(window.web3.currentProvider)
                const multicall = new Multicall({ web3Instance: web3 })

                const contractCallContext: ContractCallContext[] = {
                    reference: 'Eth20contract',
                    contractAddress: farmData.address,
                    abi: BEP20ABI,
                    calls: [
                        {
                            reference: 'name',
                            methodName: 'name',
                        },
                        {
                            reference: 'symbol',
                            methodName: 'symbol',
                        },
                        {
                            reference: 'decimals',
                            methodName: 'decimals',
                        },
                        {
                            reference: 'totalSupply',
                            methodName: 'totalSupply',
                        },
                    ],
                }
                const results: ContractCallResults = await multicall.call(
                    contractCallContext
                )

                var getname = await getFormatMulticall(
                    results,
                    'Eth20contract',
                    0
                )
                var getsymbol = await getFormatMulticall(
                    results,
                    'Eth20contract',
                    1
                )
                var getdecimals = await getFormatMulticall(
                    results,
                    'Eth20contract',
                    2
                )
                var gettotalSupply = await getFormatMulticall(
                    results,
                    'Eth20contract',
                    3
                )
                console.log(
                    getname,
                    getsymbol,
                    getdecimals,
                    gettotalSupply,
                    'results'
                )
                if (isEmpty(getname)) {
                    errors.address = 'Please enter valid contract address'
                    toastAlert('warning', 'Name not found this contract')
                    setvalidatation(errors)
                    setLoading(false)
                    return
                } else if (isEmpty(getsymbol)) {
                    errors.address = 'Please enter valid contract address'
                    toastAlert('warning', 'symbol not found this contract')
                    setvalidatation(errors)
                    setLoading(false)
                    return
                } else if (isEmpty(getdecimals)) {
                    errors.address = 'Please enter valid contract address'
                    toastAlert('warning', 'decimals not found this contract')
                    setLoading(false)
                    setvalidatation(errors)
                    return
                } else if (isEmpty(gettotalSupply)) {
                    errors.address = 'Please enter valid contract address'
                    toastAlert('warning', 'totalsupply not found this contract')
                    setLoading(false)
                    setvalidatation(errors)
                    return
                }
            } catch (err) {
                errors.address = 'Please enter valid contract address'
                setvalidatation(errors)
                setLoading(false)
                return
            }

            if (Edit) {
                try {
                    const updateFormdata = {
                        _id: farmData._id,
                        name: getname,
                        address: farmData.address,
                        symbol: getsymbol,
                        decimals: getdecimals,
                        totalSupply: gettotalSupply,
                        logoURI: farmData.lplogo,
                        file: tokenimage,
                    }
                    console.log('updateform', updateFormdata)
                    await updateToken(updateFormdata)

                    setopenfarm(false)
                    toastAlert('success', 'Update Token Successfully!')
                    setopensuccess(true)
                    setLoading(false)
                    //reload()
                } catch (err) {
                    seterrorMessages('Error on Pool Update')
                    setopen2(true)
                    setLoading(true)
                }
            } else {
                try {
                    const newForm = {
                        name: getname,
                        symbol: getsymbol,
                        decimals: getdecimals,
                        address: farmData.address,
                        totalSupply: gettotalSupply,
                        logoURI: farmData.lplogo,
                    }
                    let response = await addToken(newForm)
                    setopenfarm(false)
                    console.log(response.message, 'message')
                    toastAlert('success', 'Token added Successfully!')
                    setopensuccess(true)
                    reload()
                    console.log(newForm, 'farmData')
                    setLoading(false)
                } catch (err) {
                    seterrorMessages('Rejected')
                    setopen2(true)
                    setLoading(true)
                    setEdit(false)
                    setopenfarm(false)
                    return
                }
            }
        } catch (err) {
            setLoading(false)
            console.log('errerrerrerr', err)
        }
    }

    const onChange = (event) => {
        var newData = {
            [event.target.id]: event.target.value,
        }
        setfarmData({ ...farmData, ...newData })
    }

    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            settokenimage(true)
            var file = event.target.files[0]
            var url = URL.createObjectURL(file)
            console.log(url, 'url')
            var newData = {
                lplogo: file,
                logoURI: url,
            }
            setfarmData({ ...farmData, ...newData })
        }
    }

    function handleSuccessClose() {
        setopensuccess(false)
    }

    function handleClose() {
        setEdit(false)
        setopenfarm(false)
    }

    function handleWarningClose() {
        setopen2(false)
    }

    console.log(farmData, 'farmData')
    return (
        <div>
            <Dialog
                open={openfarm}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                onBackdropClick="escapeKeyDown"
            >
                {Edit ? (
                    <DialogTitle id="form-dialog-title">
                        Upated Token
                    </DialogTitle>
                ) : (
                    <DialogTitle id="form-dialog-title">Add Token</DialogTitle>
                )}
                <ValidatorForm onSubmit={SubmitFarm}>
                    <DialogContent>
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="address"
                            label="Token Address"
                            onChange={onChange}
                            fullWidth
                            name="Token Address"
                            type="text"
                            value={farmData.address}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        {validatation.address && validatation.address != '' && (
                            <Error style={{ color: 'red' }}>
                                {validatation.address}
                            </Error>
                        )}
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="lplogo"
                            onChange={handleChange}
                            fullWidth
                            type="file"
                        // validators={['required']}
                        // errorMessages={['This field is required']}
                        />
                        {farmData &&
                            farmData.logoURI &&
                            farmData.logoURI != '' &&
                            (tokenimage ? (
                                <IMG
                                    src={farmData.logoURI}
                                    alt=""
                                    style={{
                                        maxWidth: '100%',
                                        width: 'unset',
                                    }}
                                />
                            ) : (
                                <IMG
                                    src={`${farmData.logoURI}`}
                                    alt=""
                                    style={{
                                        maxWidth: '100%',
                                        width: 'unset',
                                    }}
                                />
                            ))}
                        {validatation.logoURI && validatation.logoURI != '' && (
                            <Error style={{ color: 'red' }}>
                                {validatation.logoURI}
                            </Error>
                        )}
                        <br></br>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        &nbsp;
                        {Edit ? (
                            <Box position="relative">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled={loading}
                                    type="submit"
                                >
                                    Update
                                </Button>
                                {loading && (
                                    <StyledProgress
                                        size={24}
                                        className="buttonProgress"
                                    />
                                )}
                            </Box>
                        ) : (
                            <Box position="relative">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled={loading}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                {loading && (
                                    <StyledProgress
                                        size={24}
                                        className="buttonProgress"
                                    />
                                )}
                            </Box>
                        )}
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open2}
                            autoHideDuration={6000}
                            onClose={handleWarningClose}
                        >
                            <Alert
                                onClose={handleWarningClose}
                                severity="warning"
                                sx={{ width: '100%' }}
                                variant="filled"
                            >
                                {errorMessages}
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={opensuccess}
                            autoHideDuration={6000}
                            onClose={handleSuccessClose}
                        >
                            <Alert
                                onClose={handleSuccessClose}
                                severity="success"
                                sx={{ width: '100%' }}
                                variant="filled"
                            >
                                {successMessages}
                            </Alert>
                        </Snackbar>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}
