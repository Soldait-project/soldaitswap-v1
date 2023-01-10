import React, { useEffect,useState } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Select,
    Button,
    MenuItem,
    CircularProgress,
    Alert,
    Snackbar,
    
} from '@mui/material'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

import { siteurl,getUrlList } from '../../../Api/site'
import config from '../../../config/config'
import { dateFormat } from '../../../helper/dateFormat'
import Multiselect from 'multiselect-dropdown-react';


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

var sociallinks ={
    _id:"",
    facebook:"",
    twitter:"",
    linkedin:"",
    telegram: "",
}


const AppTable = () => {
    const [sitedata, setsitedata] = useState(sociallinks);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false)


    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [historylist, setHistorylist] = React.useState([])
    const [totalCount, settotalCount] = React.useState(0)

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        var response = await getUrlList()
        console.log(response,'response')
        var list1 =
            response && response.result
                ? response.result
                : {}
                console.log(list1,'list1')
        setsitedata(list1)
    }

    

     const handleChange=({ target: { name, value } })=>{
        let temp = { ...sitedata }
        temp[name] = value
        setsitedata(temp)
         console.log(value);
     } 

     const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
           let data = await siteurl(sitedata)
            setLoading(false)
            setOpen(true)
        } catch (e) {
            console.log(e)
            // setMessage(e.message)
            setLoading(false)
        }
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    
    
    return (
        <Container>
            <Box py="12px" />
            <SimpleCard title="Site Settings">
                <Box width="100%" overflow="auto">
                <SubTitle>FaceBook</SubTitle>
                <ValidatorForm onSubmit={handleFormSubmit}>
                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="facebook"
                                    type="text"
                                    value={sitedata.facebook}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                <SubTitle>Twitter</SubTitle>
                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="twitter"
                                    type="text"
                                    value={sitedata.twitter}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                  <SubTitle>Linkedin</SubTitle>              
                 <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="linkedin"
                                    type="text"
                                    value={sitedata.linkedin}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                 <SubTitle>Telegram</SubTitle>
                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="telegram"
                                    type="text"
                                    value={sitedata.telegram}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                <Box position="relative">
                                        <Button
                                            variant="contained"
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
                 </ValidatorForm>
                 <Snackbar  anchorOrigin={{vertical:'top',horizontal:'right'}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    Successfully Submited!
                </Alert>
            </Snackbar>
                </Box>
            </SimpleCard>
        </Container>
    )
} 

export default AppTable
