import React, { useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Avatar,
    Icon,
    Snackbar,
    IconButton,
    Alert,
    Fab,
    useTheme,
    lighten,
} from '@mui/material'
import Button from '@mui/material/Button'
import { SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
// import { SnackbarProvider, useSnackbar } from "notistack";
import MatxSearchBox from '../../../components/MatxSearchBox/MatxSearchBox'
import { gettokenList, deleteToken, StarToken } from '../../../Api/Swapping'
import config from '../../../config/config'
import { dateFormat } from '../../../helper/dateFormat'
import AddToken from './AddToken'

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
const FabIcon = styled(Fab)(() => ({
    width: '44px !important',
    height: '44px !important',
    boxShadow: 'none !important',
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
    const { palette } = useTheme()
    const textError = palette.error.main
    const bgError = lighten(palette.error.main, 0.85)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [historylist, setHistorylist] = React.useState([])
    const [totalCount, settotalCount] = React.useState(0)
    const [openfarm, setopenfarm] = React.useState(false)
    const [Edit, setEdit] = React.useState(false)
    const [Editdata, setEditdata] = React.useState()
    const [opensuccess, setopensuccess] = React.useState(false)
    const [msg, setmsg] = React.useState('')
    const [Search, setSearch] = React.useState('');
    var Edata
    useEffect(() => {
        getList(1, rowsPerPage,Search)
    }, [])

    async function getList(skip, limit,search) {
        var data = {
            skip: skip,
            limit: limit,
            search:search
        }
        var response = await gettokenList(data)
        var list1 =
            response && response.result && response.result.length > 0
                ? response.result
                : []
        var totalrecords =
            response && response.totalrecords && response.totalrecords > 0
                ? response.totalrecords
                : []
        setHistorylist(list1)
        settotalCount(totalrecords)
    }

    const handleChangePage = async (event, newPage) => {
        setPage(newPage)
        var skip = parseInt(newPage) + parseInt(1)
        getList(skip, rowsPerPage,Search)
    }

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
        getList(1, event.target.value,Search)
    }

    function openPopup() {
        setopenfarm(true)
    }
    const getsearch = (e) => {
        getList(1, rowsPerPage, e);
    }
    function onEdit(data) {
        console.log(data, 'datadatadatadata', historylist)
        setEditdata(data)
        // console.log(data, 'formdetails')
        setopenfarm(true)
        setEdit(true)
    }

    function onDelete(data) {
        if (window.confirm('Are you sure you want to Delete?')) {
            console.log(data, 'data')
            let input = { _id: data }
            deleteToken(input)
            setmsg('Deleted successfully')
            setopensuccess(true)
            window.location.reload()
        }
    }
    async function onStar(data, id) {
        console.log(data, 'data')
        var type
        var message
        if (data == '') {
            type = 'BASES_TO_CHECK_TRADES_AGAINST'
            message = 'Added successfully'
        } else {
            type = ''
            message = 'Removed successfully'
        }
        let input = {
            _id: id,
            tradetype: type,
        }
        let response = await StarToken(input)
        var list1 =
            response && response.result && response.result.length > 0
                ? response.result
                : []
        var totalrecords =
            response && response.totalrecords && response.totalrecords > 0
                ? response.totalrecords
                : []
        setHistorylist(list1)
        settotalCount(totalrecords)
        setmsg(message)
        setopensuccess(true)
    }

    function handleClose() {
        setopensuccess(false)
    }

    function reload() {
        window.location.reload()
    }
    console.log(Editdata, 'return')
    return (
        <Container>
            <Button variant="outlined" color="primary" onClick={openPopup}>
                Add Token
            </Button>
            {openfarm && (
                <AddToken
                    openfarm={openfarm}
                    setopenfarm={setopenfarm}
                    Edit={Edit}
                    setEdit={setEdit}
                    Editdata={Editdata}
                    reload={reload}
                />
            )}
            <Box py="12px" />
            <div className='text-right'>
                    <MatxSearchBox setSearch={setSearch} getsearch={getsearch} />
                    </div>
            <SimpleCard title="Token List">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell>Date</TableCell> */}
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Token Address</TableCell>
                                <TableCell>Decimal</TableCell>
                                {/* <TableCell>Best trade</TableCell> */}
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historylist &&
                                historylist.length > 0 &&
                                historylist.map((items, index) => {
                                    return (
                                        <TableRow key={index}>
                                            {/* <TableCell align="left">
                                        {dateFormat(
                                            items.createdAt,
                                            'DD-MM-YYYY'
                                        )}
                                    </TableCell> */}
                                            <TableCell align="left">
                                                <Avatar
                                                    src={
                                                        config.imageUrl +
                                                        items.address.toLowerCase() +
                                                        '.png'
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {items.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {items.symbol}
                                            </TableCell>
                                            <TableCell align="left">
                                                {items.address}
                                            </TableCell>
                                            <TableCell align="left">
                                                {items.decimals}
                                            </TableCell>
                                            {/* <TableCell>
                                        <FabIcon size="medium" sx={{ background: bgError, overflow: 'hidden' }}>
                                            {(items.tradetype&&items.tradetype==="BASES_TO_CHECK_TRADES_AGAINST")?<Icon sx={{ color: textError }} onClick={()=>onStar(items.tradetype,items._id)}>star</Icon>:<Icon sx={{ color: textError }} onClick={()=>onStar(items.tradetype,items._id)}>star_outline</Icon>}
                                        </FabIcon>
                                    </TableCell> */}
                                            <TableCell
                                                sx={{ px: 0 }}
                                                colSpan={1}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        onEdit(items)
                                                    }
                                                >
                                                    <Icon color="primary">
                                                        edit
                                                    </Icon>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        onDelete(items._id)
                                                    }
                                                >
                                                    <Icon color="secondary">
                                                        delete
                                                    </Icon>
                                                </IconButton>
                                                {console.log(
                                                    items._id,
                                                    'items'
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </StyledTable>

                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </SimpleCard>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={opensuccess}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {msg}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default AppTable
