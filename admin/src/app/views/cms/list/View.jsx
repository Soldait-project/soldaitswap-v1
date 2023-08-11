import React, { useEffect, useState } from 'react'
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
    Alert,
    Snackbar,
    Icon,
} from '@mui/material'

import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { CKEditor } from 'ckeditor4-react'
import { Span } from 'app/components/Typography'
import { getUserList } from '../../../Api/Swapping'
import { getuserMail, updateTemplate, gettemplate } from '../../../Api/site'
import config from '../../../config/config'
import { dateFormat } from '../../../helper/dateFormat'
import Multiselect from 'multiselect-dropdown-react'
import isEmpty from '../../../helper/isEmpty'

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

const AppTable = () => {
    const [mailContent, setmailContent] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [email, setemail] = useState([])
    const [email1, setemail1] = useState([])
    const [allReciever, setallReciever] = useState(true)
    const [email_assigned, setemail_assigned] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [templatename, settemplatename] = useState('terms')

    useEffect(() => {
        geturls()
        // setinitialtemplate()
    }, [])
    const ChangeEditor = (e) => {
        // console.log(e.editor.getData())
        setmailContent(e.editor.getData())
    }
    const geturls = async () => {
        var { result } = await gettemplate(templatename)

        if (result) {
            var template = result.content
        } else {
            var template = `<h1>No Templates</h1>`
        }

        setmailContent(template)
    }

    const result = (params) => {
        console.log(params, 'selecte')
        setemail1(params)
    }

    const mailreciever = async (e) => {
        console.log('mailreciever', e.target.value)
        let value = e.target.value
        var { result } = await gettemplate(value)
        //console.log(result.subject)
        if (result) {
            var template = result.content
        } else {
            var template = `<h1>No Templates</h1>`
        }
        console.log(template, 'templatetemplate-template')
        setmailContent('')
        setmailContent(template)
        settemplatename(value)
    }

    const onemailsend = async (e) => {
        if (isEmpty(mailContent) || isEmpty(templatename)) {
            setOpen3(true)
            return
        }
        let formdata = { template: mailContent, identifier: templatename }
        console.log(formdata, 'email1')
        let report = await updateTemplate(formdata)
        setOpen(true)
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
    function handleClose3(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen3(false)
    }
    //console.log(mailContent, '-----------181')
    return (
        <Container>
            <Box py="12px" />
            <SimpleCard title="CMS Page">
                <Box width="100%" overflow="auto">
                    <Select
                        onChange={mailreciever}
                        size="small"
                        defaultValue="terms"
                    >
                        <MenuItem value="terms">Terms and Condition</MenuItem>
                        <MenuItem value="privacy">Privacy Policy</MenuItem>
                        {/* <MenuItem value="faq">FAQ</MenuItem> */}
                    </Select>
                    {mailContent && (
                        <CKEditor
                            id="mailContent"
                            name="mailContent"
                            config={{
                                extraAllowedContent: 'div(*)',
                                allowedContent: true,
                                height: 500,
                            }}
                            initData={mailContent}
                            onChange={ChangeEditor}
                        />
                    )}
                </Box>
                <br></br>
                <Button
                    onClick={onemailsend}
                    color="primary"
                    variant="contained"
                    type="submit"
                >
                    <Icon>thumb_up</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Update
                    </Span>
                </Button>
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
                        Updated Successfully!
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
                        Please Select Mail!
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open3}
                    autoHideDuration={6000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose3}
                        severity="warning"
                        sx={{ width: '100%' }}
                        variant="filled"
                    >
                        Please Enter Content!
                    </Alert>
                </Snackbar>
            </SimpleCard>
        </Container>
    )
}

export default AppTable
