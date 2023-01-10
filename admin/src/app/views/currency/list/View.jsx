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
} from '@mui/material'
import Button from '@mui/material/Button'
import { SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

import { getcurrency } from '../../../Api/Currency'
import config from '../../../config/config'
import { dateFormat } from '../../../helper/dateFormat'
import AddCurrency from './AddCurrency'

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
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [historylist, setHistorylist] = React.useState([])
    const [totalCount, settotalCount] = React.useState(0)
    const [openfarm, setopenfarm] = React.useState(false)
    const [Edit, setEdit] = React.useState(false)
    const [Editdata, setEditdata] = React.useState()
    const [opensuccess, setopensuccess] = React.useState(false)

    var Edata
    useEffect(() => {
        getList(1, rowsPerPage)
    }, [])

    async function getList(skip, limit) {
        var data = {
            skip: skip,
            limit: limit,
        }
        var response = await getcurrency(data)
        console.log(response,'reeeee')
        var record =
            response && response.result && response.result.length > 0
                ? response.result
                : []
                console.log(record,'record')
        var totalrecords =
            response && response.totalrecords && response.totalrecords > 0
                ? response.totalrecords
                : []
              
               
                setHistorylist(record)
        settotalCount(totalrecords)
    }

    const handleChangePage = async (event, newPage) => {
        setPage(newPage)
        var skip = parseInt(newPage) + parseInt(1)
        getList(skip, rowsPerPage)
    }

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
        getList(1, event.target.value)
    }

    function openPopup() {
        setopenfarm(true)
    }

    function onEdit(data) {
        console.log(data, 'datadatadatadata', historylist)
        setEditdata(data)
        // console.log(data, 'formdetails')
        setopenfarm(true)
        setEdit(true)
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
            Add Currency
            </Button>
            {openfarm && (
                <AddCurrency
                    openfarm={openfarm}
                    setopenfarm={setopenfarm}
                    Edit={Edit}
                    setEdit={setEdit}
                    Editdata={Editdata}
                    reload={reload}
                />
            )}
            <Box py="12px" />
            <SimpleCard title="Currency">
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                
                                <TableCell>Currency Name</TableCell>
                                <TableCell>Currency Symbol</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historylist.map((items, index) => (
                                
                                <TableRow key={index}>
                                    
                                 
                                    <TableCell align="left">
                                        {items.currencyName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {items.currencySymbol}
                                    </TableCell>
                                    <TableCell align="left">
                                        {items.type}
                                    </TableCell>
                                    <TableCell align="left">
                                        {items.status}
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={1}>
                                        <IconButton
                                            onClick={() => onEdit(items)}
                                        >
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                      
                                    </TableCell>
                                </TableRow>
                            ))}
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
                    Deleted Successfully !!!
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default AppTable
