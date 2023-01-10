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
import {LockUser} from '../../../Api/Swapping'
import config from '../../../config/config'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Alert, Snackbar, CircularProgress ,Select ,MenuItem,InputLabel} from '@mui/material'
import { red } from '@mui/material/colors'

var initialvalue = {
   
    "_id": "", //Price Conversion Id
  
} 

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))
const Error = styled('span')(({ theme }) => ({
    color: red,
}))

export default function UpdateUser(props) {
    var { openfarm, setopenfarm, Edit, setEdit, Editdata, reload } = props
    console.log(props,'props')
    
    const [errorMessages, seterrorMessages] = React.useState('')
    const [successMessages, setsuccessMessages] = React.useState('')
    const [farmData, setfarmData] = React.useState(initialvalue)
    const [open2, setopen2] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const IMG = styled('img')(() => ({
        width: '100%',
    }))

   
    useEffect(async () => {
        if (Edit && Editdata) {
            console.log(Editdata,' priceconvv')
              if(Editdata){
                    let formData = {
                        _id:Editdata._id,
                     
                    
                        
                      };
                      setfarmData((prev) => {
                        return { ...prev, ...formData }
                    })
                }
                
           
        }
      
      
    }, [])

   

    async function SubmitFarm() {
     console.log(farmData,'PRICEE')
     let reqData = farmData;
     const {success,message} = await LockUser(reqData)
     
     if(success==true){
         setsuccessMessages(message)
         setOpen(true)
         setLoading(false)
         setTimeout(() => {
           reload()
           }, "1000")
     }
     if(success==false){
        seterrorMessages(message)
        setopen2(true)
        // setLoading(false)
        // setTimeout(() => {
        //   reload()
        //   }, "1000")
    }
    }

    const onChange = (event) => {
        var newData = {
            [event.target.id]: event.target.value,
        }
        console.log(newData,'newData')
        setfarmData({ ...farmData, ...newData })
    }
   
    

    function handleSuccessClose() {
        setOpen(false)
    }

    function handleClose() {
        setEdit(false)
        setopenfarm(false)
    }

    function handleWarningClose() {
        setopen2(false)
    }

    return (
        <div>
            <Dialog
                open={openfarm}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                onBackdropClick="escapeKeyDown"
            >
               
                    <DialogTitle id="form-dialog-title">
                      Do you really want to Lock user?
                    </DialogTitle>
               
                  
                <ValidatorForm onSubmit={SubmitFarm}>
                    
                    <DialogActions>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                        >
                            No
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
                                    Yes
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
                            open={open}
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
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}
