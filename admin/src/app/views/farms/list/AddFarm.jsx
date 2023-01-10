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
import isEmpty from 'app/helper/isEmpty'
import { addForm, updateForm } from 'app/Api/Swapping'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Alert, Snackbar, CircularProgress } from '@mui/material'
import { red } from '@mui/material/colors'

const Error = styled('span')(({ theme }) => ({
    color: red,
}))

var initialvalue = {
    user: '',
    alloc: '',
    tokenSymbol: '',
    tokenAddresses: '',
    quoteTokenSymbol: '',
    quoteTokenAdresses: '',
    depositFee: '',
    lplogo: '',
    logoURI: '',
    risk: '',
    pid: '',
}
var validatationerror = {
    fromaddress: '',
    toaddress: '',
}
const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))
export default function AddFarm(props) {
    var { openfarm, setopenfarm, Edit, setEdit, Editdata, reload } = props
    const [formmodel, setformmodel] = React.useState()
    const [open2, setopen2] = React.useState(false)
    const [opensuccess, setopensuccess] = React.useState(false)
    const [errorMessages, seterrorMessages] = React.useState('')
    const [successMessages, setsuccessMessages] = React.useState('')
    const [validatation, setvalidatation] = React.useState(validatationerror)
    const [farmData, setfarmData] = React.useState(initialvalue)
    const [tokenimage, settokenimage] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [tokenaerror, settokenaerror] = React.useState(
        'This field is required'
    )
    const [tokenberror, settokenberror] = React.useState(
        'This field is required'
    )

    const IMG = styled('img')(() => ({
        width: '100%',
    }))

    useEffect(async () => {
        //await MetaMask()
        if (Edit && Editdata) {
            setfarmData((prev) => {
                return { ...prev, ...Editdata }
            })
        }
    }, [])

    const MetaMask = async (e) => {
        try {
            if (window.ethereum) {
                var web3 = new Web3(window.ethereum)
                let version = await web3.eth.getChainId()
                console.log(version, 'version------12')
                if (config.netWorkversion == version) {
                    let address = await web3.eth.getAccounts()
                    let data = address[0]
                    console.log(data, 'user123-------------12')
                    var addressData = {
                        user: data,
                    }
                    setfarmData((prev) => {
                        return { ...prev, ...addressData }
                    })
                } else {
                    seterrorMessages('Please Connect Binance Network')
                    setopen2(true)
                }
            }
        } catch (e) {}
    }

    async function SubmitFarm() {
        try {
            var web3 = new Web3(window.web3.currentProvider)
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            var errors = {}
            var fromtokens = web3.utils.isAddress(farmData.tokenAddresses)
            var totokens = web3.utils.isAddress(farmData.quoteTokenAdresses)

            setvalidatation({})

            if (!fromtokens) {
                errors.fromaddress = 'Please enter valid contract address'
                setvalidatation(errors)
                return
            }
            if (!totokens) {
                errors.toaddress = 'Please enter valid contract address'
                setvalidatation(errors)
                return
            }
            console.log(fromtokens, totokens, 'totokenstotokens')
            try {
                var BEP20ContractA = await new web3.eth.Contract(
                    BEP20ABI,
                    farmData.tokenAddresses
                )
                var isTokenA = await BEP20ContractA.methods.name().call()
                if (isTokenA == '' || !isTokenA) {
                    console.log('nvcnvnvn')
                    errors.fromaddress = 'Please enter valid contract address'
                    setvalidatation(errors)
                    return
                }
            } catch (err) {
                console.log(err, 'errrrrrrrdddddddd')
                errors.fromaddress = 'Please enter valid contract address'
                setvalidatation(errors)
                return
            }
            try {
                var BEP20ContractB = await new web3.eth.Contract(
                    BEP20ABI,
                    farmData.quoteTokenAdresses
                )
                var isTokenB = await BEP20ContractB.methods.name().call()
                if (isTokenB == '' || !isTokenB) {
                    errors.toaddress = 'Please enter valid contract address'
                    setvalidatation(errors)
                    return
                }
            } catch (err) {
                console.log(err, 'errrrrrrr1111')
                errors.toaddress = 'Please enter valid contract address'
                setvalidatation(errors)
                return
            }
            if(isEmpty(farmData.logoURI)){
                errors.logoURI = 'Please select logo'
                setvalidatation(errors)
                return
            }

            setLoading(true)
            var MasterContract = await new web3.eth.Contract(
                MasterChefABI,
                config.masterchef
            )
            var FactoryContract = await new web3.eth.Contract(
                FactoryABI,
                config.factory
            )
            try {
                var isowner = await MasterContract.methods.owner().call()
            } catch (err) {
                console.log(err, 'chef')
            }
            console.log(
                isowner,
                farmData.user,
                isowner == farmData.user,
                'owner------12'
            )

            let version = await web3.eth.getChainId()
            console.log(
                config.netWorkversion,
                version,
                'config.netWorkversion !== version'
            )
            seterrorMessages('')
            setopen2(false)
            if (config.netWorkversion !== version) {
                seterrorMessages('Please Connect Binance Network')
                setopen2(true)
                setLoading(false)
                return
            }

            var address = await web3.eth.getAccounts()
            var currAddr = address[0]
            console.log(currAddr, isowner, '+++++++++++*********>')
            if (isowner == currAddr) {
                console.log('^^^^^^^^^^^^^^^^^^^^')
                if (Edit) {
                    var pid = farmData.pid

                    // var allocPoint = farmData.alloc
                    // allocPoint = allocPoint * 100

                    var depositFee = farmData.depositFee * 100
                    // alert(pid+'&'+allocPoint+'&'+depositFee)
                    // return false;
                    try {
                        await MasterContract.methods
                            .set(pid, depositFee)
                            .send({ from: isowner })

                        const updateFormdata = {
                            _id: farmData._id,
                            pid: farmData.pid,
                            risk: farmData.risk,
                            lpSymbol: farmData.lpSymbol,
                            isTokenOnly: false,
                            lpAddresses: farmData.lpAddresses,
                            tokenSymbol: farmData.tokenSymbol,
                            tokenAddresses: farmData.tokenAddresses,
                            quoteTokenSymbol: farmData.quoteTokenSymbol,
                            quoteTokenAdresses: farmData.quoteTokenAdresses,
                            depositFee: farmData.depositFee,
                            user: farmData.user,
                            logoURI: farmData.lplogo,
                            file: tokenimage,
                        }
                        await updateForm(updateFormdata)
                        setLoading(false)
                        setopenfarm(false)
                        setsuccessMessages('Update Farm Successfully!')
                        setopensuccess(true)
                        reload()
                    } catch (err) {
                        console.log(err, 'error on farm update')
                        seterrorMessages('Error on Farm Update')
                        setopen2(true)
                        setLoading(false)
                    }
                } else {
                    // var allocPoint = farmData.alloc
                    // allocPoint = allocPoint * 100

                    var lpAddress = await FactoryContract.methods
                        .getPair(
                            farmData.tokenAddresses,
                            farmData.quoteTokenAdresses
                        )
                        .call()
                    console.log(lpAddress, 'lpaddress')
                    if (!web3.utils.toBN(lpAddress).isZero()) {
                        var pid = await MasterContract.methods
                            .poolLength()
                            .call()
                        console.log(pid, 'poolLength')

                        var depositFee = farmData.depositFee * 100

                        try {
                            var result = await MasterContract.methods
                                .add(lpAddress, depositFee)
                                .send({ from: isowner })

                            let fromsymbol = farmData.tokenSymbol.toUpperCase()
                            let tosymbol =
                                farmData.quoteTokenSymbol.toUpperCase()
                            let lpsymbol = `${fromsymbol}-${tosymbol} LP`
                            const newForm = {
                                pid: pid,
                                risk: farmData.risk,
                                lpSymbol: lpsymbol,
                                // alloc: allocPoint,
                                isTokenOnly: false,
                                lpAddresses: lpAddress,
                                tokenSymbol: fromsymbol,
                                tokenAddresses: farmData.tokenAddresses,
                                quoteTokenSymbol: tosymbol,
                                quoteTokenAdresses: farmData.quoteTokenAdresses,
                                depositFee: farmData.depositFee,
                                logoURI: farmData.lplogo,
                            }
                            let response = await addForm(newForm)
                            setopenfarm(false)
                            setsuccessMessages(response.message)
                            setopensuccess(true)
                            setLoading(false)
                            reload()
                        } catch (err) {
                            console.log(err, 'rejected')
                            seterrorMessages('Rejected')
                            setopen2(true)
                            setLoading(false)
                            return
                        }
                    } else {
                        seterrorMessages('Invalid pair')
                        setopen2(true)
                        setLoading(false)
                    }
                }
            } else {
                seterrorMessages('please switch to admin address')
                setopen2(true)
                setLoading(false)
            }
        } catch (err) {}
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
            var newData = {
                lplogo: file,
                logoURI: url,
            }
            setfarmData({ ...farmData, ...newData })
        }
    }

    function handleClose() {
        // setformmodel(false)
        setEdit(false)
        setopenfarm(false)
        // window.location.reload()
    }

    function handleSuccessClose() {
        setopensuccess(false)
    }

    function handleWarningClose() {
        setopen2(false)
    }

    console.log(farmData, '---------------farmdata12')
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
                        Update Farm
                    </DialogTitle>
                ) : (
                    <DialogTitle id="form-dialog-title">Add Farm</DialogTitle>
                )}
                <ValidatorForm onSubmit={SubmitFarm}>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                        <br></br>
                        {/* <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="alloc"
                            label="Multipier (x)"
                            onChange={onChange}
                            fullWidth
                            name="alloc"
                            type="text"
                            value={farmData.alloc}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        /> */}
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="tokenSymbol"
                            label="Token A Name"
                            onChange={onChange}
                            fullWidth
                            name="Token A Name"
                            type="text"
                            value={farmData.tokenSymbol}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="tokenAddresses"
                            label="Token A Address"
                            onChange={onChange}
                            fullWidth
                            name="Token A Address"
                            type="text"
                            value={farmData.tokenAddresses}
                            validators={['required']}
                            errorMessages={[tokenaerror]}
                        />
                        {validatation.fromaddress &&
                            validatation.fromaddress != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.fromaddress}
                                </Error>
                            )}
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="quoteTokenSymbol"
                            label="Token B Name"
                            onChange={onChange}
                            fullWidth
                            name="Token B Name"
                            type="text"
                            value={farmData.quoteTokenSymbol}
                            validators={['required']}
                            errorMessages={['This field is required']}
                        />
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="quoteTokenAdresses"
                            label="Token B Address"
                            onChange={onChange}
                            fullWidth
                            name="Token B Address"
                            type="text"
                            value={farmData.quoteTokenAdresses}
                            validators={['required']}
                            errorMessages={[tokenberror]}
                        />
                        {validatation.toaddress &&
                            validatation.toaddress != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.toaddress}
                                </Error>
                            )}
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="depositFee"
                            label="Deposit Fee"
                            onChange={onChange}
                            fullWidth
                            name="Deposit Fee"
                            type="text"
                            value={farmData.depositFee}
                            validators={['required','minNumber:0']}
                            errorMessages={['This field is required','Enter greater then zero']}
                        />

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
                        {console.log(`${farmData.logoURI}`,'tokenimagetokenimagetokenimage')}
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
                            {validatation.logoURI &&
                                    validatation.logoURI != '' && (
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
