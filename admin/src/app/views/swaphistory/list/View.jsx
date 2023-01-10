import React, { useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Icon,
    IconButton,
} from '@mui/material'

import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled,useTheme } from '@mui/system'

import { getHistory } from '../../../Api/Swapping'
import config from '../../../config/config'
import { dateFormat } from '../../../helper/dateFormat'
import MatxSearchBox from '../../../components/MatxSearchBox/MatxSearchBox'
import { getswapCSVreport } from '../../../Api/UserActions'
import { CSVLink } from 'react-csv'
import jsPDF from "jspdf";
import "jspdf-autotable";

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

const subscribarList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
]

const AppTable = () => {
    const { palette } = useTheme()
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)
    const [historylist, setHistorylist] = React.useState([])
    const [totalCount, settotalCount] = React.useState(0)
    const [csvdata, setcsvdata] = React.useState([]);
    const [Search, setSearch] = React.useState('');
    const textColor = palette.text.primary


    useEffect(() => {
        getList(1, rowsPerPage,Search)
        downloadcsv()
    }, [])

    async function getList(skip, limit,search) {
        var data = {
            skip: skip,
            limit: limit,
            search: search,
        }
        var response = await getHistory(data)
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

    const getsearch = (e) => {
        getList(1, rowsPerPage, e);
    }
    //monthly or weekly or daily report function
    const downloadcsv = async () => {
        var data = {
            type: 'all',
        }
        var response = await getswapCSVreport(data)
        var report =
            response && response.result && response.result.length > 0
                ? response.result
                : []
        setcsvdata(report)
    }

    const exportPDF = async () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Swap List";
        const headers = [["DATE","USERADDRESS","FROMAMOUNT","TOAMOUNT","HASH"]];

        const data = csvdata.map((elt) =>{
            let fromamount = `${elt.fromAmt}-${elt.fromSym}`;
            let toamount = `${elt.toAmt}-${elt.toSym}`;
            let transaction = `${config.txUrl}${elt.txid}`;
            return [elt.createdAt,elt.useraddress, fromamount,toamount,transaction]
        }
        );

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("SwappingHistory.pdf")
    }

    return (
        <Container>
            <Box py="12px" />
            <SimpleCard title="Swap history">
            <div className='text-right'>
                    <MatxSearchBox setSearch={setSearch} getsearch={getsearch} />
                    <CSVLink
                        data={csvdata}
                        filename={"SwappingHistory.csv"}
                        className="btn btn-primary"
                    >
                        <IconButton>
                            <Icon sx={{ color: textColor }}>archive</Icon>
                        </IconButton>
                    </CSVLink>
                    <IconButton onClick={exportPDF}>
                        <Icon sx={{ color: textColor }}>picture_as_pdf</Icon>
                    </IconButton>
                </div>
                <Box width="100%" overflow="auto">
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>User Address</TableCell>
                                <TableCell>From Amount</TableCell>
                                <TableCell>To Amount</TableCell>
                                <TableCell>Txid</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {historylist.map((items, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {dateFormat(
                                            items.createdAt,
                                            'DD-MM-YYYY hh:mm'
                                        )}
                                    </TableCell>
                                    <TableCell align="left">
                                        {items.useraddress}
                                    </TableCell>
                                    <TableCell align="left">
                                        {items.fromAmt} {items.fromSym}
                                    </TableCell>
                                    <TableCell align="left">
                                        {items.toAmt} {items.toSym}
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton  target="_blank" href={config.txUrl + items.txid}>
                                            <Icon color='primary'>call_made</Icon>
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
        </Container>
    )
}

export default AppTable
