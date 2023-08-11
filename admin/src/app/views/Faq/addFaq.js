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
import { AddFaq ,updateFaq } from 'app/Api/Faq'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Alert, Snackbar, CircularProgress, Select, MenuItem, InputLabel } from '@mui/material'
import { red } from '@mui/material/colors'
import { AddFaqVal } from '../../validation/p2p Validation'

var initialvalue = {
    name: '',
    question:'',
    answer:''
}

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))
const Error = styled('span')(({ theme }) => ({
    color: red,
}))

export default function AddSupportCategory(props) {
    var { openfarm, setopenfarm, Edit, setEdit, Editdata, reload } = props

    const [successMessages, setsuccessMessages] = React.useState('')
    const [farmData, setfarmData] = React.useState(initialvalue)
    const [loading, setLoading] = React.useState(false)
    const [validatation, setvalidatation] = React.useState({})
    const [open, setOpen] = React.useState(false)
    const [categoryOptions,setcategoryOptions] =React.useState([''])
    const IMG = styled('img')(() => ({
        width: '100%',
    }))


    useEffect(async () => {
        
        if (Edit && Editdata) {
            if (Editdata) {
                let formData = {
                    id: Editdata._id,
                    question:Editdata.question,
                    answer:Editdata.answer,
                    
                };
                setfarmData((prev) => {
                    return { ...prev, ...formData }
                })
            }
        }
    }, [])



    async function SubmitFarm() {
        if (Edit) {

            const errorDatas = await AddFaqVal(farmData)
            if (errorDatas) {
                return setvalidatation(errorDatas)
            }
            else {
                const { success, message, errors } = await updateFaq(farmData);
                try {
                    if (success == true) {
                        setsuccessMessages(message)
                        setOpen(true)
                        setLoading(false)
                        setTimeout(() => {
                            reload()
                        }, "500")
                    }
                    if (errors) {
                        return setvalidatation(errors)
                    }
                }
                catch (err) {
                    console.log(err)
                }

            }
        }
        else {
            const errorDatas = await AddFaqVal(farmData)
            if (errorDatas) {
                return setvalidatation(errorDatas)
            }
            else {

                const { success, message, errors } = await AddFaq(farmData);

                if (success == true) {
                    setsuccessMessages(message)
                    setOpen(true)
                    setLoading(false)
                    setTimeout(() => {
                        reload()
                    }, "500")

                }
                if (errors) {
                    return setvalidatation(errors)
                }

            }
        }

    }

    const onChange = (event) => {
        var newData = {
            [event.target.id]: event.target.value,
        }
        setfarmData({ ...farmData, ...newData })
        setvalidatation({})
    }



    function handleSuccessClose() {
        setOpen(false)
    }

    function handleClose() {
        setEdit(false)
        setopenfarm(false)
    }

    function handleWarningClose() {
        setOpen(false)
    }


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
                        Update Category
                    </DialogTitle>
                ) : (
                    <DialogTitle id="form-dialog-title">Add FAQ </DialogTitle>
                )}

                <ValidatorForm  onSubmit={SubmitFarm}>
                 <DialogContent>

                           

<TextValidator
                                sx={{ mb: '12px',  width: '500px' }}
                                variant="outlined"
                                size="medium"
                                id="question"
                                label="Question"
                                onChange={onChange}
                                fullWidth
                                name="question"
                                type="text"
                                value={farmData.question}

                            />
                            {validatation.question &&
                                validatation.question != '' && (
                                    <Error style={{ color: 'red' }}>
                                        {validatation.question}
                                    </Error>
                                )}
                                <TextValidator
                                sx={{ mb: '12px', width: '500px' }}
                                variant="outlined"
                                size="medium"
                                id="answer"
                                label="Answer"
                                onChange={onChange}
                                fullWidth
                                name="answer"
                                type="text"
                                value={farmData.answer}

                            />
                            {validatation.answer &&
                                validatation.answer != '' && (
                                    <Error style={{ color: 'red' }}>
                                        {validatation.answer}
                                    </Error>
                                )}
 
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

                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    )
}
