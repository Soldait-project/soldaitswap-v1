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

import config from '../../../config/config'
import { Addcurrency ,Updatecurrency} from 'app/Api/Currency'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Alert, Snackbar, CircularProgress ,Select ,MenuItem,InputLabel} from '@mui/material'
import { red } from '@mui/material/colors'
import {currencyValidations} from '../../../validation/currencyValidation'
var initialvalue = {
   

    currencyName: '',
    currencySymbol: '',
    withdrawFee:'',
    minimumWithdraw:'',
    currencyImage: '',
    logoURI: '',
    type:'crypto',
    tokenType: 'erc20',
    contractAddress:'',
    minABI:'',
    decimals:'',
    bankName:'',
    accountNo:'',
    bankcode:'',
    country:'',
    status:'',
    gateWay:'CoinPayment',
    CoinpaymetNetWorkFee:'1',
    withdrawLimit:'',
    depositFee:'',
    minimumdeposit:''
}

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))
const Error = styled('span')(({ theme }) => ({
    color: red,
}))

export default function AddCurrency(props) {
    var { openfarm, setopenfarm, Edit, setEdit, Editdata, reload } = props
    console.log(props,'props')
    const [formmodel, setformmodel] = React.useState()
    const [open2, setopen2] = React.useState(false)
    const [opensuccess, setopensuccess] = React.useState(false)
    const [errorMessages, seterrorMessages] = React.useState('')
    const [successMessages, setsuccessMessages] = React.useState('')
    const [farmData, setfarmData] = React.useState(initialvalue)
    const [tokenimage, settokenimage] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [validatation, setvalidatation] = React.useState({})
    const [open, setOpen] = React.useState(false)

    const IMG = styled('img')(() => ({
        width: '100%',
    }))

    useEffect(async () => {
        if (Edit && Editdata) {
            console.log(Editdata,'Editdata')
              if(Editdata.type=='crypto'){
                    let formData = {
                        currencyId: Editdata._id,
                        currencyName: Editdata.currencyName,
                        currencySymbol: Editdata.currencySymbol,
                        currencyImage: Editdata.currencyImage,
                        type: Editdata.type,
                        withdrawFee: Editdata.withdrawFee,
                        minimumWithdraw: Editdata.minimumWithdraw,
                        status: Editdata.status,
                        gateWay:Editdata.gateWay,
    CoinpaymetNetWorkFee:Editdata.CoinpaymetNetWorkFee,
    withdrawLimit:Editdata.withdrawLimit
                      };
                      setfarmData((prev) => {
                        return { ...prev, ...formData }
                    })
                }
                else if(Editdata.type=='token'){
                    let formData = {
                        currencyId: Editdata._id,
                        currencyName: Editdata.currencyName,
                        currencySymbol: Editdata.currencySymbol,
                        currencyImage: Editdata.currencyImage,
                        type: Editdata.type,
                        tokenType:Editdata.tokenType,
                        withdrawFee: Editdata.withdrawFee,
                        minimumWithdraw: Editdata.minimumWithdraw,
                        contractAddress:Editdata.contractAddress,
                        minABI:Editdata.minABI,
                        decimals:Editdata.decimals,
                        status: Editdata.status,
                        gateWay:Editdata.gateWay,
                        CoinpaymetNetWorkFee:Editdata.CoinpaymetNetWorkFee,
                        withdrawLimit:Editdata.withdrawLimit,
                      
                      };
                      setfarmData((prev) => {
                        return { ...prev, ...formData }
                    })
                }
                else if(Editdata.type=='fiat'){
                    let formData = {
                        currencyId: Editdata._id,
                        currencyName: Editdata.currencyName,
                        currencySymbol: Editdata.currencySymbol,
                        currencyImage: Editdata.currencyImage,
                        type: Editdata.type,
                        withdrawFee: Editdata.withdrawFee,
                        minimumWithdraw: Editdata.minimumWithdraw,
                        bankName: Editdata.bankDetails.bankName,
                        accountNo: Editdata.bankDetails.accountNo,
                        holderName: Editdata.bankDetails.holderName,
                        bankcode: Editdata.bankDetails.bankcode,
                        country: Editdata.bankDetails.country,
                        status: Editdata.status,
                        withdrawLimit:Editdata.withdrawLimit,
                        depositFee:Editdata.depositFee,
                        minimumdeposit:Editdata.minimumdeposit
                        
                      };
                      setfarmData((prev) => {
                        return { ...prev, ...formData }
                    })
                }
           
        }
     
    }, [])

   

    async function SubmitFarm() {
     console.log(farmData,'farmData')
     
     if (Edit) {

if (farmData.currencyImage &&farmData.currencyImage.size > 20000) {
    setvalidatation({ currencyImage: "Image size should be less than  20 Kb" })
 
  return false
}
const errorDatas = await currencyValidations(farmData)
if (errorDatas) {
   return setvalidatation(errorDatas)
 }
 else{
    const formData = new FormData();
    formData.append("currencyId", farmData.currencyId);
    formData.append("type", farmData.type);
    formData.append("tokenType", farmData.tokenType);
    formData.append("currencyName",farmData.currencyName);
    formData.append("currencySymbol", farmData.currencySymbol);
    formData.append("contractAddress", farmData.contractAddress);
    formData.append("minABI", farmData.minABI);
    formData.append("decimals", farmData.decimals);
    formData.append("withdrawFee", farmData.withdrawFee);
    formData.append("minimumWithdraw", farmData.minimumWithdraw);
    formData.append("bankName", farmData.bankName);
    formData.append("accountNo", farmData.accountNo);
    formData.append("holderName", farmData.holderName);
    formData.append("bankcode", farmData.bankcode);
    formData.append("country", farmData.country);
    formData.append("currencyImage", farmData.currencyImage);
    formData.append("status", farmData.status);
  
    formData.append("withdrawLimit", farmData.withdrawLimit);
    formData.append("depositFee", farmData.depositFee);
    formData.append("minimumdeposit", farmData.minimumdeposit);
    const { success, message, errors } = await Updatecurrency(formData);
    if(success==true){
        setsuccessMessages(message)
        setOpen(true)
        setLoading(false)
        setTimeout(() => {
          reload()
          }, "500")
}
    if(errors){
        return setvalidatation(errors)
           } 
 }
     }
     else{


        if (farmData.currencyImage &&farmData.currencyImage.size > 20000) {
            setvalidatation({ currencyImage: "Image size should be less than  20 Kb" })
         
          return false
        }
        const errorDatas = await currencyValidations(farmData)
        if (errorDatas) {
           return setvalidatation(errorDatas)
         }
         else{
           const formData = new FormData();
           formData.append("type", farmData.type);
           formData.append("tokenType", farmData.tokenType);
           formData.append("currencyName",farmData.currencyName);
           formData.append("currencySymbol", farmData.currencySymbol);
           formData.append("contractAddress", farmData.contractAddress);
           formData.append("minABI", farmData.minABI);
           formData.append("decimals", farmData.decimals);
           formData.append("withdrawFee", farmData.withdrawFee);
           formData.append("minimumWithdraw", farmData.minimumWithdraw);
           formData.append("bankName", farmData.bankName);
           formData.append("accountNo", farmData.accountNo);
           formData.append("holderName", farmData.holderName);
           formData.append("bankcode", farmData.bankcode);
           formData.append("country", farmData.country);
           formData.append("currencyImage", farmData.currencyImage);
           formData.append("withdrawLimit", farmData.withdrawLimit);
           formData.append("depositFee", farmData.depositFee);
           formData.append("minimumdeposit", farmData.minimumdeposit);
           const { success, message, errors } = await Addcurrency(formData);
           console.log(message,'message')
           
    if(success==true){
        setsuccessMessages(message)
        setOpen(true)
        setLoading(false)
        setTimeout(() => {
          reload()
          }, "500")
    }
           if(errors){
       return setvalidatation(errors)
          } 
   
          }
     }
    
    }

    const onChange = (event) => {
        var newData = {
            [event.target.id]: event.target.value,
        }
        console.log(newData,'newData')
        setfarmData({ ...farmData, ...newData })
    }
   
    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            settokenimage(true)
            var file = event.target.files[0]
            var url = URL.createObjectURL(file)
            console.log(url, 'url')
            var newData = {
                currencyImage: file,
                logoURI: url,
            }
            setfarmData({ ...farmData, ...newData })
        }
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

    console.log(validatation, 'validatation')

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
                        Update Currency
                    </DialogTitle>
                ) : (
                    <DialogTitle id="form-dialog-title">Add Currency </DialogTitle>
                )}
                  
                <ValidatorForm onSubmit={SubmitFarm}>
                    <DialogContent>
                    <InputLabel htmlFor="currencytype">Choose CurrencyType</InputLabel>
                    <Select 
                      sx={{ mb: '12px', width: '100%' }}
                    native    
                    value={farmData.type}
                                            onChange={onChange}
                                            labeltext="CurrencyType"
                                            inputProps={{
                                                name: 'type',
                                                id:"type"
                                            }}
                               
                                        >
                                          
                                       <option value={'crypto'}>Crypto</option>
                                       <option value={'token'}>Token</option>
                                         <option value={"fiat"}>Fiat</option>
                                        </Select>
                            

                            {farmData.type=='token' && 
                            <div>
                                <InputLabel htmlFor="currencytype">Choose TokenType</InputLabel>
                    <Select 
                      sx={{ mb: '12px', width: '100%' }}
                    native    
                    value={farmData.tokenType}
                                            onChange={onChange}
                                            labeltext="Tokentype"
                                            inputProps={{
                                                name: 'tokenType',
                                                id:"tokenType"
                                            }}
                               
                                        >
                                           
                                           <option value={'erc20'}>ERC 20</option>
                                            <option value={'bep20'}>BEP 20</option>
                                            <option value={"matic20"}>Matic 20</option>
                                            <option value={"sol20"}>SOL 20</option>
                                        </Select>
                                       
                            </div>
                            }
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="currencyName"
                            label="currencyName"
                            onChange={onChange}
                            fullWidth
                            name="currencyName"
                            type="text"
                            value={farmData.currencyName}
                           
                        />
                        {validatation.currencyName &&
                            validatation.currencyName != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.currencyName}
                                </Error>
                            )}
  
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="currencySymbol"
                            label="currency Symbol"
                            onChange={onChange}
                            fullWidth
                            name="currency Symbol"
                            type="text"
                            value={farmData.currencySymbol}
                           
                        />
                         {validatation.currencySymbol &&
                            validatation.currencySymbol != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.currencySymbol}
                                </Error>
                            )}

   {farmData.type!='fiat' &&
   <div>

{/* <InputLabel htmlFor="currencytype">Gateway Type</InputLabel>
                    <Select 
                      sx={{ mb: '12px', width: '100%' }}
                    native    
                    value={farmData.gateWay}
                                            onChange={onChange}
                                            labeltext="GateWay Type"
                                            inputProps={{
                                                name: 'gateWay',
                                                id:"gateWay"
                                            }}
                               
                                        >
                                          
                                          <option value="CoinPayment">CoinPayment</option>
                                          <option value="ERC">ERC.20</option>
                       
                                        </Select> */}
                                        
                                       {/* {farmData.gateWay=='CoinPayment'&&
                                       <div>
                                             <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="CoinpaymetNetWorkFee"
                            label="Coinpaymet NetWorkFee  "
                            onChange={onChange}
                            fullWidth
                            name="CoinpaymetNetWorkFee"
                            type="text"
                            value={farmData.CoinpaymetNetWorkFee}
                          
                        />
                        {validatation.CoinpaymetNetWorkFee &&
                            validatation.CoinpaymetNetWorkFee != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.CoinpaymetNetWorkFee}
                                </Error>
                            )}
                                           </div>
                                       }  */}
       </div>}
                                     
{farmData.type=='token' &&
<div>
<TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="contractAddress"
                            label="contract Address"
                            onChange={onChange}
                            fullWidth
                            name="contractAddress"
                            type="text"
                            value={farmData.contractAddress}
                           
                        />
                         {validatation.contractAddress &&
                            validatation.contractAddress != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.contractAddress}
                                </Error>
                            )}
                               <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="minABI"
                            label="Min Abi"
                            onChange={onChange}
                            fullWidth
                            name="minABI"
                            type="textarea"
                            value={farmData.minABI}
                           
                        />
                         {validatation.minABI &&
                            validatation.minABI != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.minABI}
                                </Error>
                                
                                
                            )}
                            <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="decimals"
                            label="Decimals"
                            onChange={onChange}
                            fullWidth
                            name="decimals"
                            type="text"
                            value={farmData.decimals}
                           
                        />
                         {validatation.decimals &&
                            validatation.decimals != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.decimals}
                                </Error>
                                
                                
                            )}
</div>
 }
 {farmData.type=='fiat' &&
 <div>
     <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="bankName"
                            label="Bank Name "
                            onChange={onChange}
                            fullWidth
                            name="bankName"
                            type="text"
                            value={farmData.bankName}
                          
                        />
                        {validatation.bankName &&
                            validatation.bankName != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.bankName}
                                </Error>
                            )}
                              <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="accountNo"
                            label="Account Number "
                            onChange={onChange}
                            fullWidth
                            name="accountNo"
                            type="text"
                            value={farmData.accountNo}
                          
                        />
                        {validatation.accountNo &&
                            validatation.accountNo != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.accountNo}
                                </Error>
                            )}
                             <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="holderName"
                            label="Holder Name"
                            onChange={onChange}
                            fullWidth
                            name="holderName"
                            type="text"
                            value={farmData.holderName}
                          
                        />
                        {validatation.holderName &&
                            validatation.holderName != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.holderName}
                                </Error>
                            )}
                             <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="bankcode"
                            label="IBAN Code"
                            onChange={onChange}
                            fullWidth
                            name="bankcode"
                            type="text"
                            value={farmData.bankcode}
                          
                        />
                        {validatation.bankcode &&
                            validatation.bankcode != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.bankcode}
                                </Error>
                            )}
                            <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="country"
                            label="Country"
                            onChange={onChange}
                            fullWidth
                            name="country"
                            type="text"
                            value={farmData.country}
                          
                        />
                        {validatation.country &&
                            validatation.country != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.country}
                                </Error>
                            )}
                            <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="depositFee"
                            label="Deposit Fee  "
                            onChange={onChange}
                            fullWidth
                            name="depositFee"
                            type="text"
                            value={farmData.depositFee}
                          
                        />
                        {validatation.depositFee &&
                            validatation.depositFee != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.depositFee}
                                </Error>
                            )}
                         <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="minimumdeposit"
                            label="Minimum Deposit "
                            onChange={onChange}
                            fullWidth
                            name="minimumdeposit"
                            type="text"
                            value={farmData.minimumdeposit}
                           
                        />
                         {validatation.minimumdeposit &&
                            validatation.minimumdeposit != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.minimumdeposit}
                                </Error>
                            )}
                               
 </div>
 }
                         <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="withdrawFee"
                            label="Withdraw Fee (%) "
                            onChange={onChange}
                            fullWidth
                            name="withdrawFee"
                            type="text"
                            value={farmData.withdrawFee}
                          
                        />
                        {validatation.withdrawFee &&
                            validatation.withdrawFee != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.withdrawFee}
                                </Error>
                            )}
                         <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="minimumWithdraw"
                            label="Minimum Withdraw "
                            onChange={onChange}
                            fullWidth
                            name="minimumWithdraw"
                            type="text"
                            value={farmData.minimumWithdraw}
                           
                        />
                         {validatation.minimumWithdraw &&
                            validatation.minimumWithdraw != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.minimumWithdraw}
                                </Error>
                            )}
                               <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="withdrawLimit"
                            label="withdraw Limit "
                            onChange={onChange}
                            fullWidth
                            name="withdrawLimit"
                            type="text"
                            value={farmData.withdrawLimit}
                           
                        />
                         {validatation.withdrawLimit &&
                            validatation.withdrawLimit != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.withdrawLimit}
                                </Error>
                            )}
                            {Edit &&
                   <div>
                       <InputLabel htmlFor="currencytype">Status</InputLabel>
                    <Select 
                      sx={{ mb: '12px', width: '100%' }}
                    native    
                    value={farmData.status}
                                            onChange={onChange}
                                            labeltext="Status"
                                            inputProps={{
                                                name: 'status',
                                                id:"status"
                                            }}
                               
                                        >
                                          
                                          <option value={"active"}>Active</option>
                                         <option value={"deactive"}>Deactive</option>
                                        </Select>
                            
                   </div>
}
                        <TextValidator
                            sx={{ mb: '12px', width: '100%' }}
                            variant="outlined"
                            size="medium"
                            id="currencyImage"
                            onChange={handleChange}
                            fullWidth
                            type="file"
                            // validators={['required']}
                            // errorMessages={['This field is required']}
                        />
                         {validatation.currencyImage &&
                            validatation.currencyImage != '' && (
                                <Error style={{ color: 'red' }}>
                                    {validatation.currencyImage}
                                </Error>
                            )}



                        {farmData &&
                            
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
                                    src={`${config.p2pimageUrl}/currency/${farmData.currencyImage}`}
                                    alt=""
                                    style={{
                                        maxWidth: '100%',
                                        width: 'unset',
                                    }}
                                />
                            ))}
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
