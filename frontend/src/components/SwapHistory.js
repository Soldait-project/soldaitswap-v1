import React, { useEffect, useState, Fragment } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import {
    allTokenList
} from "../Api/TokenActions";
import config from "../config/config"

import {
    swapDetails
} from "../Api/SwapActions"

import {
    dateFormat
} from "../helper/dateFormat"

import {
    shortText
} from "../helper/custommath"


const SwapHistory = (props) => {

    const [historyList, sethistoryList] = useState([]);
    const [tokenList, settokenList] = useState([]);
    const [totalrecords, settotalrecords] = useState(0);
    const [page, setpage] = useState(1);
    const [countPerPage, setcountPerPage] = useState(5);
    const walletConnection = useSelector((state) => state.walletConnection);

    const columnsData = [
        {
            name: 'Date',
            selector: 'createdAt',
            cell: record => {
                var dateVal = dateFormat(record.createdAt, "DD-MM-YYYY hh:mm A");
                return dateVal;
            }
        },
        {
            name: 'Wallet',
            selector: 'useraddress',
            cell: record => {
                var useraddress = shortText(record.useraddress)
                var txUrl = config.txUrlAddress + record.useraddress;
                return (
                    <a href={txUrl} target="_blank" rel="noopener noreferrer">{useraddress}</a>
                );
            },
        },
        {
            name: 'Swap',
            selector: 'fromsymbol',
            width: '400px',
            cell: record => {

                var fromsymbol = "";
                var fromimage = "";
                var fromamount = 0;
                var tosymbol = "";
                var toimage = "";
                var toamount = 0;

                var fromIndex = tokenList && tokenList.findIndex(val => val.address.toLowerCase() === record.fromaddress.toLowerCase());
                if (fromIndex !== -1) {
                    fromsymbol = tokenList[fromIndex].symbol;
                    fromimage = tokenList[fromIndex].address.toLowerCase() + '.png';
                    let temp = record.fromamount.toFixed(4);
                    temp === 0 ? fromamount = fromamount.toFixed(8) : fromamount = temp
                }

                var toIndex = tokenList && tokenList.findIndex(val => val.address.toLowerCase() === record.toaddress.toLowerCase());
                if (toIndex !== -1) {
                    tosymbol = tokenList[toIndex].symbol;
                    toimage = tokenList[toIndex].address.toLowerCase() + '.png';
                    toamount = record.toamount.toFixed(5);
                }

                return (
                    <Fragment>
                        <div className="d-flex align-items-center">
                            <div>
                                <img src={config.imageUrl + fromimage} className="table_crypto_icon" alt="Icon" onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} />
                                <span><b>{fromamount}</b> {fromsymbol}</span>
                            </div><i className="fas fa-arrow-right mx-3"></i>
                            <div>
                                <img src={config.imageUrl + toimage} className="table_crypto_icon" alt="Icon" onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} />
                                <span><b>{toamount}</b> {tosymbol}</span></div>
                        </div>
                    </Fragment>
                );

            },
        },
        {
            name: 'Transaction id',
            selector: 'txid',
            cell: record => {
                var txUrl = config.txUrl + record.txid;
                var txid = shortText(record.txid)
                return (
                    <a href={txUrl} target="_blank" rel="noopener noreferrer">{txid}</a>
                );
            },
        }
    ];

    useEffect(() => {
        setInitial();
        //eslint-disable-next-line
    }, [walletConnection]);

    useEffect(() => {
        getHistory(page, countPerPage);
        //eslint-disable-next-line
    }, [walletConnection]);

    async function setInitial() {


        //if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") var userAddress = walletConnection.address;

        var getToken = await allTokenList();
        var allToken = JSON.parse(getToken.result);

        settokenList(allToken);
    }

    async function setPage(no) {
        await bindpage(no);
        getHistory(no, countPerPage);
    }
    async function bindpage(pageno) {
        setpage(pageno);
    }

    async function setrows(limit) {
        await bindVal(limit);
        getHistory(1, limit);
    }


    async function bindVal(limit) {
        setcountPerPage(limit);
    }

    async function getHistory(skip, limit) {
        var address = walletConnection.address;
        var search = `page=${skip}&per_page=${limit}&address=${address}`;
        var list = await swapDetails(search);
        if (list && list.result) {
            var total = list.totalrecords;
            sethistoryList(list.result);
            settotalrecords(total)
        }
    }

    return (
        <div className="whitebox history_table_div" data-aos="fade-up" data-aos-duration="2000">
            <h2><span>Trade History</span></h2>
            <DataTable
                className="history_table"
                columns={columnsData}
                data={historyList}
                highlightOnHover
                pagination
                paginationRowsPerPageOptions={[5, 10, 15, 20, 500]}
                Responsive={true}
                paginationServer
                paginationTotalRows={totalrecords}
                paginationPerPage={countPerPage}
                onChangePage={page => setPage(page)}
                onChangeRowsPerPage={number => setrows(number)}
            />
        </div>

    )
}

export default SwapHistory;