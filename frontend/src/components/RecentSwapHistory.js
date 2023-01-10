import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import config from "../config/config"
import { recentSwapping } from "../Api/SwapActions"

const RecentSwapHistory = (props) => {

    var tokenList = props.tokenList;

    const walletConnection = useSelector((state) => state.walletConnection);
    const [historyList, sethistoryList] = useState([]);

    useEffect(() => {
        getHistory();
        //eslint-disable-next-line
    }, [walletConnection]);


    async function getHistory() {
        var address = walletConnection.address;
        var search = `address=${address}`;
        var list = await recentSwapping(search);
        if (list && list.result) {
            sethistoryList(list.result);
        }
    }

    return (
        <div className="modal fade primary_modal" id="recent_trans_modal" tabIndex="-1" role="dialog" aria-labelledby="recent_trans_modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="recent_trans_modal_title">Recent Transactions</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {historyList && historyList.length > 0 && historyList.map((item, i) => {
                            var txUrl = config.txUrl + item.txid;
                            var index = tokenList.findIndex(val => val.address === item.fromaddress);
                            var fromsymbol = "";
                            if (index !== -1) {
                                fromsymbol = tokenList[index].symbol;
                            }
                            var index1 = tokenList.findIndex(val => val.address === item.toaddress);
                            var tosymbol = "";
                            if (index1 !== -1) {
                                tosymbol = tokenList[index1].symbol
                            }
                            var fromAmt = (item.fromamount > 0) ? item.fromamount.toFixed(3) : 0;
                            var toAmt = (item.toamount > 0) ? item.toamount.toFixed(3) : 0;

                            var text = "Swap";

                            return (
                                <a href={txUrl} target="_blank" className="text-dark d-flex align-items-center justify-content-between mb-3" rel="noopener noreferrer">
                                    <p className="mb-0">{text} {fromAmt} {fromsymbol} for {toAmt} {tosymbol}</p>
                                    <i class="bi bi-box-arrow-in-up-right"></i>
                                </a>
                            )
                        })}
                        {historyList && historyList.length === 0 &&
                            <p className="mb-0">Trancation not found</p>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RecentSwapHistory;