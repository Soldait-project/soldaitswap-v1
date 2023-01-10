import React, { useEffect } from 'react'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Icon,
    IconButton,Button
} from '@mui/material'

import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled, useTheme } from '@mui/system'
import MatxSearchBox from '../../../components/MatxSearchBox/MatxSearchBox'
import { getUserList } from '../../../Api/Swapping'
import { getCSVreport } from '../../../Api/UserActions'
import config from '../../../config/config'
import { dateFormat } from '../../../helper/dateFormat'
import { CSVLink } from 'react-csv'
import jsPDF from "jspdf";
import "jspdf-autotable";
import UpdateUser from './UpdateUser'

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
    const [search, setsearch] = React.useState();
    const [pdf, setpdf] = React.useState(false)
    const [csvdata, setcsvdata] = React.useState([]);
    const [Edit, setEdit] = React.useState(false)
    const [Editdata, setEditdata] = React.useState()
    const [openfarm, setopenfarm] = React.useState(false)
    const { palette } = useTheme()
    const ref = React.createRef();
    const textColor = palette.text.primary

    useEffect(() => {
        getList(1, rowsPerPage,search)
        downloadcsv();
    }, [])

    async function getList(skip, limit, search) {
        var data = {
            skip: skip,
            limit: limit,
            search: search,
        }
        var response = await getUserList(data)
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
    function reload() {
        window.location.reload()
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

    const getsearch = (e) => {
        getList(1, rowsPerPage, e);

    }
    //monthly or weekly or daily report function
    const downloadcsv = async () => {
        var data = {
            type: 'all',
        }
        var response = await getCSVreport(data)
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

        const title = "User List";
        const headers = [["DATE", "ADDRESS"]];

        const data = csvdata.map(elt => [elt.createdAt, elt.address]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("User-List.pdf")
    }
    const Statuschange= async (data) => {
        console.log(data,'data')
        try{
            console.log(data, 'datadatadatadata')
            setEditdata(data)
            // console.log(data, 'formdetails')
            setopenfarm(true)
            setEdit(true)
        
            
        }
    catch(err){
        console.log(err,'e')
    }
        
    }
    return (
        <Container>
            {openfarm && (
                <UpdateUser
                    openfarm={openfarm}
                    setopenfarm={setopenfarm}
                    Edit={Edit}
                    setEdit={setEdit}
                    Editdata={Editdata}
                    reload={reload}
                />
            )}
            <Box py="12px" />
            <SimpleCard title="User List">
                <div className='text-right'>
                    <MatxSearchBox getsearch={getsearch} />
                    <CSVLink
                        data={csvdata}
                        filename={"User-List.csv"}
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
                    <StyledTable ref={ref}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Action</TableCell>
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
                                        {items.address}
                                    </TableCell>
                                    <TableCell align="left">
                                        {console.log(items,'items.status=')}
                                    <Button
                                  color="primary"
                                  variant="contained"
                                  type="submit" onClick={()=>Statuschange(items)} >{items && items.status=='active' ? 'Lock User':'Unlock User'}
                             
                                
                                  </Button>
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
