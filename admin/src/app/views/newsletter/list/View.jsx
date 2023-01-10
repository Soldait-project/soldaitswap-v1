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
import { getuserMail, sendnewsletter, getUrlList } from '../../../Api/site'
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

var initurls = {
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    telegram: 'https://www.telegram.com',
    linkedin: 'https://www.linkedin.com',
}

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
    const [urls, seturls] = useState(initurls)

    useEffect(() => {
        getData()
        geturls()
        // setinitialtemplate()
    }, [])

    const ChangeEditor = (e) => {
        setmailContent(e.editor.getData())
    }
    const geturls = async () => {
        var { result } = await getUrlList()
        console.log(result, 'UrlList')
        if (result) {
            var template = `<p>&nbsp;</p>\n<table\n    style="padding: 0px; background: url(\'https://soldait.com/static/cms_images/emailBg.jpg\') 0px 0px no-repeat scroll #121a23; max-width: 650px; height: 381px; width: 100%;"\n    border="0" width="100%" cellspacing="0" cellpadding="0" align="center">\n    <tbody>\n        <tr style="height: 38px;">\n            <td style="height: 38px;">\n                <table style="margin: 0; padding: 15px;" border="0" width="100%" cellspacing="0" cellpadding="0">\n                    <tbody>\n                        <tr>\n                            <td><a href=http://soldait.wealwin.com/><img width=100px src=https://indxapi.alwin.io/images/favicon.png /></a></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </td>\n        </tr>\n        <tr style="height: 21px;">\n            <td style="height: 21px;" height="10">&nbsp;</td>\n        </tr>\n        <tr style="height: 168px;">\n            <td style="height: 168px;">\n                <table style="margin: 0px auto; background: rgba(26, 36, 47, 0.7); padding: 20px; height: 286px;"\n                    border="0" width="95%" cellspacing="0" cellpadding="0" align="center">\n                    <tbody>\n                        <tr>\n                            <td style="margin: 0; padding: 0;">\n                                <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 15px 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal;">\n                                    Dear valued customer,</p>\n                                <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 5px 0; padding: 0; color: #ffffff; font-size: 14px; font-weight: normal;">\n                                    Welcome to Soldait! Thank you visit our page.</p>\n                                                           <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 18px 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal;">\n                                                                   <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 18px 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal;">\n                                    <a style="display: block; text-decoration: underline; margin-top: 5px; color: #d6b032;"\n                                                                     </p>\n                                <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal; line-height: 20px;">\n                                    Thanks &amp; Regards,<br />Soldait Support Team.</p>\n                            </td>\n                        </tr>\n                        <tr></tr>\n                    </tbody>\n                </table>\n            </td>\n        </tr>\n        <tr style="height: 21px;">\n            <td style="height: 21px;" height="5">&nbsp;</td>\n        </tr>\n        <tr style="height: 64px;">\n            <td\n                style="margin: 0px; padding: 12px 0px; text-align: center; font-size: 12px; color: #aeaeae; font-family: Arial, Helvetica, sans-serif; height: 64px;">\n                <strong>Soldait</strong><br />Address: Dr. Soldait Building #50 <br/>india<br />Contact :\n                 +91 (000) <br />Email : <a style="color: #aeaeae; text-decoration: none;"\n                    href="mailto:admin@soldait.com" target="_blank" rel="noopener">admin@soldait.com</a>\n            </td>\n        </tr>\n        <tr style="height: 48px;">\n            <td\n                style="margin: 0px; padding: 0px 0px 7px; text-align: center; font-size: 12px; color: #d69f2b; font-family: Arial, Helvetica, sans-serif; height: 48px;">\n                Join our community<p style="font-size: 0; line-height: 0; padding: 0; margin: 10px 0 0 0;"><a\n                        href= ${
                result.twitter ? result.twitter : ''
            } target="_blank" rel="noopener"><img src=https://indxapi.alwin.io/images/twitter_icon.png width="25"\n                            height="20" /></a> <a style="margin: 0 15px 0 12px;" href=${
                result.telegram ? result.telegram : ''
            } \n                        target="_blank" rel="noopener"><img src=https://indxapi.alwin.io/images/telegram_icon.png width="25" height="20" /></a>\n                    <a href=${
                result.facebook ? result.facebook : ''
            } target="_blank" rel="noopener"><img src=https://indxapi.alwin.io/images/facebook_icon.png width="25"\n                            height="20"></a>\n                </p>\n            </td>\n        </tr>\n        <tr style="height: 21px;">\n            <td style="height: 21px;" height="10">&nbsp;</td>\n        </tr>\n    </tbody>\n</table>`
        } else {
            var template = `<p>&nbsp;</p>\n<table\n    style="padding: 0px; background: url(\'https://soldait.com/static/cms_images/emailBg.jpg\') 0px 0px no-repeat scroll #121a23; max-width: 650px; height: 381px; width: 100%;"\n    border="0" width="100%" cellspacing="0" cellpadding="0" align="center">\n    <tbody>\n        <tr style="height: 38px;">\n            <td style="height: 38px;">\n                <table style="margin: 0; padding: 15px;" border="0" width="100%" cellspacing="0" cellpadding="0">\n                    <tbody>\n                        <tr>\n                            <td><a href=http://soldait.wealwin.com/><img width=100px src=https://indxapi.alwin.io/images/favicon.png /></a></td>\n                        </tr>\n                    </tbody>\n                </table>\n            </td>\n        </tr>\n        <tr style="height: 21px;">\n            <td style="height: 21px;" height="10">&nbsp;</td>\n        </tr>\n        <tr style="height: 168px;">\n            <td style="height: 168px;">\n                <table style="margin: 0px auto; background: rgba(26, 36, 47, 0.7); padding: 20px; height: 286px;"\n                    border="0" width="95%" cellspacing="0" cellpadding="0" align="center">\n                    <tbody>\n                        <tr>\n                            <td style="margin: 0; padding: 0;">\n                                <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 15px 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal;">\n                                    Dear valued customer,</p>\n                                <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 5px 0; padding: 0; color: #ffffff; font-size: 14px; font-weight: normal;">\n                                    Welcome to Soldait! Thank you visit our page.</p>\n                                                           <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 18px 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal;">\n                                                                   <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0 0 18px 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal;">\n                                    <a style="display: block; text-decoration: underline; margin-top: 5px; color: #d6b032;"\n                                                                     </p>\n                                <p\n                                    style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; color: #ffffff; font-size: 12px; font-weight: normal; line-height: 20px;">\n                                    Thanks &amp; Regards,<br />Soldait Support Team.</p>\n                            </td>\n                        </tr>\n                        <tr></tr>\n                    </tbody>\n                </table>\n            </td>\n        </tr>\n        <tr style="height: 21px;">\n            <td style="height: 21px;" height="5">&nbsp;</td>\n        </tr>\n        <tr style="height: 64px;">\n            <td\n                style="margin: 0px; padding: 12px 0px; text-align: center; font-size: 12px; color: #aeaeae; font-family: Arial, Helvetica, sans-serif; height: 64px;">\n                <strong>Soldait</strong><br />Address: Dr. Soldait Building #50 <br/>india<br />Contact :\n                 +91 (000) <br />Email : <a style="color: #aeaeae; text-decoration: none;"\n                    href="mailto:admin@soldait.com" target="_blank" rel="noopener">admin@soldait.com</a>\n            </td>\n        </tr>\n        <tr style="height: 48px;">\n            <td\n                style="margin: 0px; padding: 0px 0px 7px; text-align: center; font-size: 12px; color: #d69f2b; font-family: Arial, Helvetica, sans-serif; height: 48px;">\n                Join our community<p style="font-size: 0; line-height: 0; padding: 0; margin: 10px 0 0 0;"><a\n                        href="" target="_blank" rel="noopener"><img src=https://indxapi.alwin.io/images/twitter_icon.png width="25"\n                            height="20" /></a> <a style="margin: 0 15px 0 12px;" href="" \n                        target="_blank" rel="noopener"><img src=https://indxapi.alwin.io/images/telegram_icon.png width="25" height="20" /></a>\n                    <a href="" target="_blank" rel="noopener"><img src=https://indxapi.alwin.io/images/facebook_icon.png width="25"\n                            height="20"></a>\n                </p>\n            </td>\n        </tr>\n        <tr style="height: 21px;">\n            <td style="height: 21px;" height="10">&nbsp;</td>\n        </tr>\n    </tbody>\n</table>`
        }
        setmailContent(template)
        seturls(result)
    }

    const result = (params) => {
        console.log(params, 'selecte')
        setemail1(params)
    }

    const mailreciever = (e) => {
        console.log('mailreciever', e.target.value)
        if (e.target.value == 'particular') {
            setallReciever(false)
        } else {
            setallReciever(true)
        }
    }

    const onemailsend = async (e) => {
        console.log(mailContent, 'mailContent')
        if (isEmpty(mailContent)) {
            setOpen3(true)
            return
        }

        if (allReciever) {
            let emailArray = []
            email.map((item) => {
                emailArray.push(item.name)
            })
            setemail1(emailArray)
            let formdata = { message: mailContent, email: emailArray }
            console.log(formdata, emailArray, 'email1')
            let report = await sendnewsletter(formdata)
        } else {
            if (isEmpty(email1)) {
                setOpen2(true)
                return
            }
            let formdata = { message: mailContent, email: email1 }
            console.log(formdata, email1, 'email1')
            let report = await sendnewsletter(formdata)
        }

        setOpen(true)
    }

    const getData = () => {
        getuserMail()
            .then((res) => {
                console.log('emaildata', res.result)
                var arremail = []
                res.result.map((item, i) => {
                    const name = item.email
                    const value = item.email
                    const obj = { name: name, value: value }
                    arremail.push(obj)
                })
                console.log(arremail.length, 'length')
                setemail(arremail)
                setemail_assigned(true)
            })
            .catch((err) => {
                console.log(err)
            })
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
    console.log(urls, 'urls')
    return (
        <Container>
            <Box py="12px" />
            <SimpleCard title="News Letter">
                <Box width="100%" overflow="auto">
                    <Select
                        onChange={mailreciever}
                        size="small"
                        defaultValue="alluser"
                    >
                        <MenuItem value="alluser">Send All Subscribed User</MenuItem>
                        <MenuItem value="particular">
                            Send Particular Subscribed User
                        </MenuItem>
                    </Select>
                    <br></br>
                    {email ? (
                        !allReciever && (
                            <Multiselect
                                options={email}
                                onSelectOptions={result}
                            />
                        )
                    ) : (
                        <h1>no subscribers</h1>
                    )}
                    <br></br>
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
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                        Send
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
                        Successfully Submited!
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
