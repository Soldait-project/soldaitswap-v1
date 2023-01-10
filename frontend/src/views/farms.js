import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import { Button } from "@material-ui/core";
import Header from "../components/Header/Header.js";
import FooterHome from "../components/Footer/FooterHome.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import StaticNavbar from "../components/StaticNavbar";
import { Launch } from '@material-ui/icons';
import $ from "jquery"
// Datatable
import WalletModal from "../components/WalletModal";
import { toastAlert } from "../helper/toastAlert";
import ReactLoading from "react-loading";

import {
  toFixedWithoutRound,
  numberFloatOnly
} from "../helper/custommath";

import {
  getFormsDetails,
  approvetoken,
  stake,
  unstake,
  getreward,
  harverst,
  getStakeUnstakeBalance
} from "../ContractActions/MasterChefAction";


import config from "../config/config";

const dashboardRoutes = [];

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

var rewardinterval;

export default function Farms(props) {

  const { ...rest } = props;

  const [poolDetails, setpoolDetails] = useState([]);
  const [allPoolDetails, setallPoolDetails] = useState([]);
  const [amount, setamount] = useState(0);
  const [lpBal, setLpbal] = useState(0);
  const [curpid, setcurpid] = useState(0);
  const [curLPAddress, setcurLPAddress] = useState(0);
  const [stakeBal, setstakeBal] = useState(0);
  const [showloader, setshowloader] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [isLoad, setisLoad] = useState(false);
  const [pageLimit, setpageLimit] = useState(6);
  const [pageSkip, setpageSkip] = useState(1);
  const [farmsStatus, setfarmsStatus] = useState("Live");
  const [loadmorebutton, setLoadmoreButton] = useState(false)
  const [loader, setloader] = useState(false)

  const walletConnection = useSelector((state) => state.walletConnection);

  const [searchdata, setsearchdata] = useState({ text: "", filter: "", stake: "", status: "Live" });

  useEffect(() => {
    loadScript();
    getFarmDetails(pageSkip, pageLimit, farmsStatus);
    //eslint-disable-next-line
    console.log('3333333333333333')
  }, [walletConnection]);

  async function approveToken(lpAddress, pid) {
    setshowloader(true);
    setcurrentId(pid);
    var allDetails = await approvetoken(lpAddress);
    setshowloader(false);
    setcurrentId("");
    if (allDetails.status) {
      toastAlert("success", "Token Approved Successfully", "balance");
      var index = poolDetails.findIndex(val => val.LPaddress === lpAddress);
      var index1 = allPoolDetails.findIndex(val => val.LPaddress === lpAddress);
      var approveAmt = (allDetails && allDetails.approveAmt) ? parseFloat(allDetails.approveAmt) : 0;
      setisLoad(false)
      if (index !== -1) {
        poolDetails[index].allowance = approveAmt;
        setpoolDetails(poolDetails);
      }
      if (index1 !== -1) {
        allPoolDetails[index1].allowance = approveAmt
        setallPoolDetails(allPoolDetails);
      }
      setisLoad(true)

    } else {
      toastAlert("error", "Unable Approve token", "balance");
    }
  }

  async function stakeToken() {

    if (amount > lpBal) {
      toastAlert("error", "Insufficient Balance", "balance");
      return false;
    }

    if (parseFloat(amount) <= 0 || !amount || amount === "" || amount === 0 || amount === "0") {
      toastAlert("error", "Invalid Amount", "balance");
      return false;
    }

    window.$("#stake_modal1").modal("hide");

    setcurrentId(curpid);
    setshowloader(true);

    var allDetails = await stake(curpid, amount, curLPAddress, lpBal);
    updateDetails(curpid);
    setamount("");
    setshowloader(false);
    if (allDetails.status) {
      toastAlert("success", "Staked Successfully", "balance");
    } else {
      toastAlert("error", "Unable to stake", "balance");
    }
    setcurrentId("");
  }

  async function unstakeToken() {
    console.log(amount, stakeBal, "amount > stakeBal")

    if (parseFloat(amount) <= 0 || !amount || amount === "" || amount === 0 || amount === "0") {
      toastAlert("error", "Invalid Amount", "balance");
      return false;
    }

    if (parseFloat(amount) > parseFloat(stakeBal)) {
      toastAlert("error", "Insufficient Balance", "balance");
      return false;
    }

    window.$("#stake_modal").modal("hide");
    setshowloader(true);
    setcurrentId(curpid);
    var allDetails = await unstake(amount, curpid, stakeBal);
    updateDetails(curpid);
    setshowloader(false);
    setamount("");

    if (allDetails.status) {
      toastAlert("success", "Unstaked Successfully", "balance");
    } else {
      toastAlert("error", "Unable to unstake", "balance");
    }
    setcurrentId("");
  }

  async function harvestToken(pid) {

    setshowloader(true);
    setcurrentId(pid);
    var allDetails = await harverst(pid);
    setshowloader(false);
    if (allDetails.status) {
      toastAlert("success", "Reward withdraw Successfully", "balance");
    } else {
      var err = (allDetails && allDetails.value != "") ? allDetails.value : "Unable to withdraw reward"
      toastAlert("error", err, "balance");
    }
    setcurrentId("");
  }

  async function updateDetails(pid) {
    try {
      var index = allPoolDetails.findIndex(val => parseInt(val.pid) === parseInt(pid))
      if (index !== -1) {
        var lpAddr = allPoolDetails[index].LPaddress;
        console.log(lpAddr)
        var { stakeBal, lpBal, totalSupply } = await getStakeUnstakeBalance(pid, lpAddr);
        $("#startearn-" + pid).html(stakeBal);
        $("#startearnbtn-" + pid).prop('disabled', false);
        $("#totalLiq-" + pid).html(totalSupply);
        console.log(lpBal, 'lpBal')
      }
    } catch (err) {

    }
  }

  async function setLpBalance(pid, lpAddr) {

    setcurpid(pid);
    setcurLPAddress(lpAddr);

    var { stakeBal, lpBal, totalSupply } = await getStakeUnstakeBalance(pid, lpAddr);
    setstakeBal(stakeBal);
    setLpbal(lpBal);
    $("#totalLiq-" + pid).html(totalSupply);
  }

  async function setMax(lpBal) {
    setamount(lpBal);
  }

  async function setValue(e) {
    var value = e.target.value;
    var status = await numberFloatOnly(value);
    if (status) {
      setamount(value);
    }
  }

  async function getFarmDetails() {
    setLoadmoreButton(false)
    var data = {
      skip: pageSkip,
      limit: pageLimit,
      status: farmsStatus,
    }
    var allDetails = await getFormsDetails(data);

    if ((allDetails && allDetails.value && allDetails.value.length) < (parseInt(config.limit))) {
      setLoadmoreButton(true)
    }
    if (allDetails && allDetails.value && allDetails.value.length > 0 && Array.isArray(allDetails.value)) {
      setpoolDetails(allDetails.value);
      setallPoolDetails(allDetails.value);
      rewardDetails(allDetails.value);
    }
    setisLoad(true);
    setloader(false)

  }
  async function rewardDetails(details) {
    // console.log(details, 'rewardDetailsrewardDetails')
    var Details = details;

    clearInterval(rewardinterval);
    rewardinterval = setInterval(async function () {
      try {
        var rewards = await getreward(details);
        //console.log(rewards, 'rewardsrewardsrewards')
        for (var i = 0; i < rewards.value.length; i++) {
          if (rewards.value && rewards.value[i]) {

            var pid = rewards.value[i].pid;
            //eslint-disable-next-line
            var index = Details.findIndex(val => val.pid === pid);

            var rewardAmt = 0;
            if (index !== -1) {
              rewardAmt = await toFixedWithoutRound(rewards.value[i].bal / 1e18, 6);
              Details[index].earned = rewardAmt;
            }
            $("#" + pid).html(rewardAmt);
            $(".list-" + pid).html(rewardAmt);
            $(".listinput-" + pid).val(rewardAmt);
            if (rewardAmt > 0) {
              $("#harvestBtn-" + pid).prop("disabled", false);
              $("#harvestBtn-" + pid).removeAttr('disabled');
            }
          }
        }
        //setallPoolDetails(Details);
        //setpoolDetails(Details);
      } catch (err) {

      }

    }, 4000);

  }
  async function stakeonlyFilter(e) {
    var checked = e.target.checked;
    var isStake = "no";
    if (checked) {
      isStake = "yes";
    }
    var fildata = { ...searchdata, ...{ stake: isStake } }
    setsearchdata(fildata);
    applyFilter(fildata);
  }

  const searchFarm = async (event) => {
    var fildata = { ...searchdata, ...{ text: event.target.value } }
    setsearchdata(fildata);
    applyFilter(fildata);
  }
  async function sortBy(event) {
    var fildata = { ...searchdata, ...{ sort: event.target.value } }
    setsearchdata(fildata);
    applyFilter(fildata);
  }

  function loadScript() {
    $(".grid_view_btn").click(function () {
      $(".grid_view").show();
      $(".list_view").hide();
      $(this).addClass('active');
      $(".list_view_btn").removeClass('active');
    });

    $(".list_view_btn").click(function () {
      $(".grid_view").hide();
      $(".list_view").show();
      $(this).addClass('active');
      $(".grid_view_btn").removeClass('active');
    });
  }

  async function activeRecord(status) {
    setfarmsStatus(status);
    var fildata = { ...searchdata, ...{ status: status } }
    setsearchdata(fildata);
    applyFilter(fildata);
  }
  async function Pagenation() {
    setloader(true)
    var data = {
      skip: parseInt(pageSkip) + 1,
      limit: parseInt(pageLimit),
      status: farmsStatus,
    }
    var allDetails = await getFormsDetails(data);
    if ((allDetails && allDetails.value && allDetails.value.length) < (parseInt(config.limit))) {
      setLoadmoreButton(true)
    }
    // count
    if (allDetails && allDetails.value && allDetails.value.length > 0 && Array.isArray(allDetails.value)) {
      var concatList = poolDetails.concat(allDetails.value);
      setpoolDetails(concatList)
      setallPoolDetails(concatList)
      rewardDetails(concatList);
    }
    setpageSkip(parseInt(pageSkip) + 1)
    setpageLimit(parseInt(pageLimit));
    setisLoad(true);
  }

  async function applyFilter(data) {

    var filteredData = allPoolDetails;
    if (data && data.text && data.text !== "") {
      filteredData = filteredData.filter(pools => pools.lpSymbol.toLowerCase().includes(data.text.toLowerCase()));
    }
    if (data && data.status && data.status !== "") {
      filteredData = filteredData.filter(pools => pools.status === data.status);
    }
    if (data && data.stake && data.stake === "yes") {
      filteredData = filteredData.filter(data => data.stakeBal > 0);
    }

    if (data.sort === "apr") {
      filteredData.sort(function (a, b) {
        return parseFloat(b.apr) - parseFloat(a.apr);
      });
    } else if (data.sort === "earned") {
      filteredData.sort(function (a, b) {
        return parseFloat(b.earned) - parseFloat(a.earned);
      });
    } else if (data.sort === "totalstaked") {
      filteredData.sort(function (a, b) {
        return parseFloat(b.TotalSupply) - parseFloat(a.TotalSupply);
      });
    }

    setTimeout(function () {
      setpoolDetails(filteredData);
      //eslint-disable-next-line
    }.bind(this), 100);
  }

  function clearAmount() {
    setamount("");
  }

  return (
    <div className="page_wrapper">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={<img src={require("../assets/images/logo_color.png")} alt="logo" className="brand_logo_mobile" />}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
        {...rest}
      />

      <StaticNavbar />
      <ScrollToTopOnMount />
      <div className="inner_wrapper">
        <div className="inner_pageheader container-fluid px-0">
          <div className="inner_heading_wrapper farm_heading_wrap">
            <div className="container">
              <GridContainer>
                <GridItem md={12} data-aos="fade-up" data-aos-duration="2000">
                  <h2>Farms</h2>
                  <p>Stake LP tokens to earn.</p>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className="inner_content_wrapper">
            <div className="container">
              <GridContainer>
                <GridItem lg={12}>
                  <div className="pools_filter" data-aos="fade-up" data-aos-duration="2000">
                    <div className="pools_filter_left">
                      <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" onClick={stakeonlyFilter} />
                        <label class="custom-control-label" for="customCheck1">Staked only</label>
                      </div>
                      <div className="pool_btn_grp">
                        <Button onClick={() => activeRecord("Live")} className={(searchdata.status === "Live") ? "active" : ""}>Live</Button>
                        <Button onClick={() => activeRecord("Finished")} className={(searchdata.status === "Finished") ? "active" : ""}>Finished</Button>
                      </div>
                    </div>

                    <div className="pools_filter_right">
                      <select className="custom-select" onChange={sortBy}>
                        <option value="earned">Earned</option>
                        <option value="totalstaked">Total staked</option>
                      </select>
                      <input className="pool_search" placeholder="Search Farms" onChange={searchFarm} />
                      {/* <div className="view_btn_grp">
                        <Button className="list_view_btn"><i class="fas fa-list-ul"></i></Button>
                        <Button className="grid_view_btn active"><i class="fas fa-th"></i></Button>
                      </div> */}
                    </div>
                  </div>
                  <div className="grid_view">
                    <GridContainer>
                      {isLoad && poolDetails && poolDetails.length > 0 &&
                        poolDetails.map((poolDet) => {

                          return (
                            <GridItem md={4} sm={6}>
                              <div className="grid_view_single" data-aos="fade-up" data-aos-duration="2000">
                                <div className="grid_view_single_first">
                                  <div>
                                    <h2>{poolDet.lpSymbol}</h2>
                                    {/* <p>Automatic restaking</p> */}
                                  </div>
                                  <img src={poolDet.logoURI} alt="Icon" style={{ "height": "60px" }} onError={(e) => { e.target.onerror = null; e.target.src = config.defaultLogo }} />
                                </div>
                                <hr />
                                <div className="grid_view_single_second">
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <p>APY</p>
                                    <div className="d-flex align-items-center"><p> <p>{poolDet.apy}%</p></p>
                                      {/* <i class="far fa-plus-square" data-toggle="modal" data-target="#roi_modal"></i> */}
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                      <p>Earned</p>
                                      <h4 id={poolDet.pid}>{poolDet.earned}</h4>
                                    </div>

                                    {walletConnection &&
                                      walletConnection.address !== "" &&
                                      <Button
                                        className="harvest_btn"
                                        id={"harvestBtn-" + poolDet.pid}
                                        onClick={() => {
                                          harvestToken(poolDet.pid);
                                        }}
                                      >
                                        Harvest
                                      </Button>
                                    }

                                  </div>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <p>Deposit Fee:</p>
                                    <h4>{poolDet.depositFee}%</h4>
                                  </div>

                                  <label className="mb-2">Start Earning</label>
                                  <div className="d-flex align-items-center justify-content-between mb-3">
                                    <p id={"startearn-" + poolDet.pid}>{poolDet.stakeBal}</p>
                                    {parseInt(poolDet.allowance) !== 0 ? (
                                      <div className="stake_btn_grps">
                                        <Button
                                          data-toggle="modal"
                                          data-target="#stake_modal"
                                          onClick={() => {
                                            setLpBalance(
                                              poolDet.pid,
                                              poolDet.LPaddress
                                            );
                                          }}
                                        >
                                          -
                                        </Button>
                                        <Button
                                          data-toggle="modal"
                                          data-target="#stake_modal1"
                                          onClick={() => {
                                            setLpBalance(
                                              poolDet.pid,
                                              poolDet.LPaddress
                                            );
                                          }}
                                        >
                                          +
                                        </Button>
                                      </div>
                                    ) : (
                                      <div></div>
                                    )}
                                  </div>

                                  {walletConnection &&
                                    walletConnection.address === "" ? (
                                    <Button
                                      data-toggle="modal"
                                      data-target="#wallet_modal"
                                      className="primary_btn blue_btn"
                                    >
                                      Unlock Wallet
                                    </Button>
                                  ) : parseInt(poolDet.allowance) === 0 ? (
                                    <Button
                                      className="primary_btn blue_btn"
                                      onClick={() => {
                                        approveToken(poolDet.LPaddress, poolDet.pid);
                                      }}
                                    >
                                      Approve
                                    </Button>

                                  ) : (
                                    ""
                                  )}

                                  {showloader && currentId === poolDet.pid &&
                                    <div className="d-flex align-items-center justify-content-center loaderimage">
                                      <ReactLoading type={"bars"} color={config.reactLoadr} className="loading" />
                                    </div>
                                  }

                                </div>
                                <hr />
                                <div className="grid_view_single_third">
                                  <div className="d-flex align-items-center justify-content-center">
                                    {/* <div className="d-flex align-items-center">
                                      <Button className="manual_btn"><i className="fas fa-sync mr-2"></i>Manual</Button>
                                      <HtmlTooltip className="tooltip_content"
                                        title={
                                          <React.Fragment>
                                            <p className="tooltip_content">Your trasaction will revert if the price changes unfavourably by more than this percentage</p>
                                          </React.Fragment>
                                        }
                                      >

                                        <i className="far fa-question-circle tooltip_icon"></i>
                                      </HtmlTooltip>
                                    </div> */}
                                    <a class="accordian_link" data-toggle="collapse" href={"#collapseExample-" + poolDet.pid} role="button" aria-expanded="false" aria-controls="collapseExample">
                                      Details
                                    </a>
                                  </div>
                                  <div class="collapse" id={"collapseExample-" + poolDet.pid}>
                                    <div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <h3>Stake:</h3>
                                        <h4>{poolDet.lpSymbol}</h4>
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <h3>Total Liquidity:</h3>
                                        <h4 id={"totalLiq-" + poolDet.pid}>{poolDet.TotalSupply}</h4>
                                      </div>

                                      <div className="d-flex justify-content-between align-items-start">
                                        <div className="text-right">
                                          <p>
                                            <a href={config.txUrlAddress + poolDet.LPaddress} target="_blank" rel="noopener noreferrer">View on {config.NetworkType} <i class="bi bi-clock"></i></a>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </GridItem>
                          );
                        })}

                      {isLoad && poolDetails && poolDetails.length > 0 && loadmorebutton === false &&

                        <GridItem md={12} sm={12} data-aos="fade-up" data-aos-duration="2000">
                          <div className="text-center mb-4"> <Button className="load_more_btn mx-auto" onClick={Pagenation} disabled={(loader) ? "disabled" : ""}>{loader && (
                            <i
                              class="fa fa-spinner fa-spin mr-1"
                              aria-hidden="true"
                              id="circle1"
                            ></i>
                          )}{" "}Load more</Button></div>
                        </GridItem>}

                      {isLoad && poolDetails && poolDetails.length === 0 &&
                        <GridItem md={12} sm={12} data-aos="fade-up" data-aos-duration="2000">
                          <div className="grid_view_single_second">
                            <p className="text-center pt-5">No farms</p>
                          </div>
                        </GridItem>
                      }
                      {!isLoad &&
                        <GridItem md={12} sm={12} data-aos="fade-up" data-aos-duration="2000">
                          <div className="grid_view_single_second">
                            <p className="text-center pt-5">Loading</p>
                          </div>
                        </GridItem>
                      }

                    </GridContainer>
                  </div>


                </GridItem>
              </GridContainer>

            </div>
          </div>
        </div>
      </div>
      <FooterHome />
      {/* <button data-toggle="modal" data-target="#success_modal">sucess</button>
      <button data-toggle="modal" data-target="#receive_modal">Receive</button>
      <button data-toggle="modal" data-target="#confirm_swap_modal">confirm swap</button> */}


      {/*  Wallet Token Modal */}
      <WalletModal />

      {/*  ROI Modal */}
      <div className="modal fade primary_modal" data-backdrop="static" id="roi_modal" tabIndex="-1" role="dialog" aria-labelledby="roi_modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="roi_modal">ROI</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table roi_table">
                  <thead>
                    <tr>
                      <th>Timeframe</th>
                      <th>ROI</th>
                      <th>Orange per $1000</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1d</td>
                      <td>0.29%</td>
                      <td>0.21</td>
                    </tr>
                    <tr>
                      <td>7d</td>
                      <td>2.07%</td>
                      <td>1.48</td>
                    </tr>
                    <tr>
                      <td>30d</td>
                      <td>9.18%</td>
                      <td>6.57</td>
                    </tr>
                    <tr>
                      <td>365d(APY)</td>
                      <td>191.20%</td>
                      <td>136.81</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="roi_notes">Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.</p>
              <div className="wallet_modal_footer">
                <a href="#/" target="_blank" className="justify-content-center mt-3"><span>Get Orange-BNB LP</span> <Launch /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Receive Modal */}
      <div className="modal fade primary_modal" id="receive_modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="receive_modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="receive_modal">You wil receive</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="swap_coin_info">
                <div>
                  <span>7,255.25</span>
                  <span> <img src={require("../assets/images/cryptocoins/btc.svg")} alt="thumb" className="mr-2" /> Bitcoin</span>
                </div>
                <div>
                  <span>25.73</span>
                  <span> <img src={require("../assets/images/cryptocoins/eth.svg")} alt="thumb" className="mr-2" /> Ethereum</span>
                </div>
              </div>
              <div className="swap_info_mid">
                <p>Output is estimated. If the price changes by more than 0.8% your transaction will revert.</p>
                <div>
                  <span>LP PARTHER/BUSD Burned</span>
                  <span>
                    <img src={require("../assets/images/cryptocoins/btc.svg")} alt="thumb" className="mr-2" />
                    <img src={require("../assets/images/cryptocoins/eth.svg")} alt="thumb" className="mr-2" />
                    253.20
                  </span>
                </div>
              </div>
              <div className="swap_info_end">
                <div>
                  <span>Price</span>
                  <div>
                    <span>1 BITCOIN = 275.6065 ETH</span>
                    <span>1 ETH = 0.5.6065 BTC</span>
                  </div>
                </div>
              </div>
              <Button className="primary_btn blue_btn mb-3">Confirm</Button>
            </div>
          </div>
        </div>
      </div>

      {/*  Confirm Swap Modal */}
      <div className="modal fade primary_modal" id="confirm_swap_modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="confirm_swap_modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirm_swap_modal">Confirm Swap</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="swap_coin_info">
                <div>
                  <span><img src={require("../assets/images/cryptocoins/btc.svg")} alt="thumb" className="mr-2" />7,255.25</span>
                  <span>Bitcoin</span>
                </div>
                <i class="bi bi-arrow-down"></i>
                <div>
                  <span><img src={require("../assets/images/cryptocoins/eth.svg")} alt="thumb" className="mr-2" />25.73</span>
                  <span>Ethereum</span>
                </div>
              </div>
              <div className="swap_info_mid">
                <p>Output is estimated. you wil receive at least <span>0.0830467 BTC</span> or the transaction will revert.</p>
              </div>
              <div className="swap_info_end">
                <div>
                  <span>Price</span>
                  <span>0.0042586 BTC / ETH</span>
                </div>
                <div>
                  <span>Minimum received</span>
                  <span>25.890 BTC</span>
                </div>
                <div>
                  <span>Price Impact</span>
                  <span>2.828%</span>
                </div>
                <div>
                  <span>Liquidity Provider Fee</span>
                  <span>65,498,406 ETH</span>
                </div>
              </div>
              <Button className="primary_btn blue_btn mb-3">Confirm Swap</Button>
            </div>
          </div>
        </div>
      </div>

      {/*  Success Modal */}
      <div className="modal fade primary_modal" id="success_modal" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="success_modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img src={require("../assets/images/success_modal.png")} alt="thumb" className="img-fluid" />
              <h2>Successfully Completed</h2>
              <p>It is a long established fact that a reader will be distracted by the readable content.</p>
              <Button className="auth_btn blue_btn" data-dismiss="modal">Close</Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade primary_modal"
        id="stake_modal"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="stake_modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="stake_modal">
                Unstake Tokens
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearAmount();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input_panel">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="balance">Bal: {stakeBal} </label>
                </div>
                <div className="d-flex justify-content-between align-items-center home_inp_panel">
                  <input
                    type="text"
                    placeholder="0.0"
                    className="custom_inp"
                    onChange={setValue}
                    value={amount}
                  ></input>
                  <Button
                    className="harvest_btn"
                    onClick={() => {
                      setMax(stakeBal);
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              {/* <label>Deposit Fee: 0 BUSD</label> */}
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <Button
                  data-dismiss="modal"
                  className="primary_btn blue_btn mr-3"
                  onClick={() => {
                    clearAmount();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    unstakeToken();
                  }}
                  className="primary_btn blue_btn"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade primary_modal"
        id="stake_modal1"
        data-backdrop="static"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="stake_modal1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="stake_modal1">
                Stake Tokens
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  clearAmount();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input_panel">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="balance">Bal: {lpBal} </label>
                </div>
                <div className="d-flex justify-content-between align-items-center home_inp_panel">
                  <input
                    type="text"
                    placeholder="0.0"
                    className="custom_inp"
                    onChange={setValue}
                    value={amount}
                  ></input>
                  <Button
                    className="harvest_btn"
                    onClick={() => {
                      setMax(lpBal);
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              {/* <label>Deposit Fee: 0 BUSD</label> */}
              <div className="mt-3 d-flex justify-content-between align-items-center">
                <Button
                  data-dismiss="modal"
                  className="primary_btn blue_btn mr-3"
                  onClick={() => {
                    clearAmount();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    stakeToken();
                  }}
                  className="primary_btn blue_btn"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
