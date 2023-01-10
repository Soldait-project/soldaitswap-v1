import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

import { useSelector } from 'react-redux';

import {
    getTokenDetail,
    isAddress
} from "../ContractActions/bep20Actions";
import config from "../config/config";

import {
    tokenDetails,
    addNewToken
} from "../Api/TokenActions";


const TokenModal = forwardRef((props, ref) => {


    useImperativeHandle(ref, () => ({
        handleModalOpen() {
            window.$('#token_modal').modal('show');
        }
    }));

    function handleModalClose() {
        window.$('#token_modal').modal('show');
    }


    const walletConnection = useSelector((state) => state.walletConnection);

    const [originaltokenList, setoriginaltokenList] = useState([]);
    const [tokenList, settokenList] = useState([]);
    const [newtoken, setnewtoken] = useState("");

    useEffect(() => {
        if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") {
            setInitial();
        }
        //eslint-disable-next-line
    }, [walletConnection]);

    var fromValue = props.fromValue;
    var { onChildTokenClick, childImportClick } = props;
    var toValue = props.toValue;
    var current = props.swapcurrent;
    var importsection = props.importsection;

    async function setInitial() {
        let userAddress = ""
        if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") userAddress = walletConnection.address;

        var getToken = await tokenDetails({ useraddress: userAddress });
        var allToken = JSON.parse(getToken.result);

        setoriginaltokenList(allToken);
        settokenList(allToken);
    }

    async function setSwapToken(item) {
        if (item.newtoken === "yes") {
            var newObj = item;
            var userAddress = ""
            if (walletConnection && walletConnection.connect === "yes" && walletConnection.web3 && walletConnection.address && walletConnection.address !== "") userAddress = walletConnection.address;
            Object.assign(newObj, { useraddress: userAddress });
            var { result } = await addNewToken(newObj);
            settokenList(result);
            window.$('#token_modal').modal('hide');
        }

        if (importsection) {
            childImportClick(item, current)
        } else {
            onChildTokenClick(item, current);
        }

    }

    const filterValue = async (event) => {
        var value = event.target.value;
        if (value && value !== "") {

            var filteredData = originaltokenList.filter(data => data.symbol.toLowerCase().includes(value.toLowerCase()) || data.address.toLowerCase().includes(value.toLowerCase()));
            if (filteredData.length === 0) {
                var result = await isAddress(value);

                if (result && result.value) {

                    var {
                        tokenName,
                        symbol,
                        decimals
                    } = await getTokenDetail(value);
                    var logo = config.imageUrl + "default.png";
                    setnewtoken(logo);

                    if (tokenName && tokenName !== "") {
                        var newToken = [{
                            "name": tokenName,
                            "symbol": symbol,
                            "address": value,
                            "chainId": config.NetworkId,
                            "decimals": decimals,
                            "newtoken": "yes",
                            "URI": logo
                        }]

                        settokenList(newToken);
                    } else {

                        // setTimeout(function () {
                        //     settokenList(tokenList);
                        // }.bind(this), 200);

                        setTimeout(settokenList.bind(this, tokenList), 200);
                    }
                } else {
                    settokenList([]);
                }

            } else {

                // setTimeout(
                //     function () {
                //         settokenList(filteredData);
                //     }
                //         .bind(this),
                //     200
                // );
                setTimeout(settokenList.bind(this, filteredData), 200);
            }

        } else {
            // setTimeout(
            //     function () {
            //         settokenList(originaltokenList);
            //     }
            //         .bind(this),
            //     200
            // );
            setTimeout(settokenList.bind(this, originaltokenList), 200);
        }
    }


    return (
        <div className="page_wrapper">
            <div className="modal fade primary_modal" id="token_modal" tabIndex="-1" role="dialog" aria-labelledby="token_modal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="token_modal_title">Select a token</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => handleModalClose()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input onChange={filterValue} className="search_inp" placeholder="Search by name" type="text"></input>
                            <h4>Token Name</h4>
                            <ul className="select_token_list">
                                {tokenList && tokenList.length > 0 && tokenList.map((item, i) => {
                                    var show = (current === "from") ? toValue : fromValue;
                                    var logo = item.address.toLowerCase() + '.png';
                                    // if (show.symbol !== item.symbol) {
                                    return (
                                        <>
                                            {show.symbol !== item.symbol && item && item.newtoken && item.newtoken === "yes" ?
                                                <li className="token-content newToken">
                                                    <div className='row pb-3'>
                                                        <div className='col-12 pt-3'>
                                                            <img src={newtoken} alt="Icons" onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} />
                                                            <span className=''><b>{item.symbol}</b> Found by address </span>
                                                        </div>
                                                    </div>

                                                    <div className='row pb-3'>
                                                        <div className='col-5'>
                                                            {/* <FormControlLabel
                                                                    control={<Checkbox checked={checked} color="primary" onChange={handleChange} />}
                                                                    label="I Understand"
                                                                    className="text-white"
                                                                /> */}
                                                        </div>
                                                        <div className='col-7'>
                                                            <button className="btn btn-primary btn-rounded btn-md d-block" onClick={() => { setSwapToken(item); }}>Import Token</button>
                                                        </div>
                                                    </div>
                                                </li>
                                                : (show.symbol !== item.symbol) ?
                                                    <li onClick={() => { setSwapToken(item) }}>
                                                        <img src={config.imageUrl + logo} alt="Icons" onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} />
                                                        <p>{item.symbol}</p>
                                                    </li>
                                                    : ""
                                            }
                                        </>
                                    )
                                    //}
                                })}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
})

export default TokenModal;