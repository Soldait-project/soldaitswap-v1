import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
// core components
import Header from "../components/Header/Header.js";
import FooterHome from "../components/Footer/FooterHome.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import { AccountBalanceWallet } from '@material-ui/icons';
import styles from "../assets/jss/material-kit-react/views/home.js";
import { Button } from "@material-ui/core";
import { Doughnut } from "react-chartjs-3";
import StaticNavbar from "../components/StaticNavbar";
import WalletModal from "../components/WalletModal";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { currencyList } from "../Api/TokenActions"



const data = {
  labels: ['Private Sale (10%)', 'Public Sales IDO (25%)', 'Public Sale IEO (30%)', 'Airdrop (0.3%)', 'Community (17.5%)', 'Team (5%)', 'Marketing (10%)', 'Partners & Advisors (2.2%)'],
  datasets: [
    {
      label: 'Token Distribution',
      data: ["10", "25", "30", "0.3", "17.5", "5", "10", "2.2"],
      backgroundColor: [
        '#f7931a',
        '#ef0027',
        '#c3a634',
        '#42c1ca',
        '#627eea',
        '#661491',
        '#3098f4',
        '#23435f'
      ],
      borderColor: [
        '#f7931a',
        '#ef0027',
        '#c3a634',
        '#42c1ca',
        '#627eea',
        '#661491',
        '#3098f4',
        '#23435f'

      ],
      borderWidth: 1,
      hoverOffset: 4,
      devicePixelRatio: 10,
    },
  ],
};

const options = {
  cutoutPercentage: 85,
  hoverOffset: 50,
  legend: {
    display: false,
    // "display": true,
    // "position": "bottom",
    // "fullWidth": true,
    // "reverse": false,
    // "labels": {
    //   "fontColor": "#000"
    // }
  }
};

const dashboardRoutes = [];

// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const useStyles = makeStyles(styles);

var initialCurrencies = [
  { symbol: "BNB", price: 0, price_change_percentage_24h: 0 },
  { symbol: "BUSD", price: 0, price_change_percentage_24h: 0 },
  { symbol: "BTCB", price: 0, price_change_percentage_24h: 0 },
  { symbol: "DOGE", price: 0, price_change_percentage_24h: 0 },
  { symbol: "ADA", price: 0, price_change_percentage_24h: 0 },
  { symbol: "DOGE", price: 0, price_change_percentage_24h: 0 },

];

export default function LandingPage(props) {
  const classes = useStyles();

  const [list, setlist] = useState(initialCurrencies);
  const walletConnection = useSelector((state) => state.walletConnection);
  const { ...rest } = props;

  useEffect(() => {
    getCurrencyList();
  }, []);

  async function getCurrencyList() {

    var { result } = await currencyList();
    var datasol = {
      ath
        :
        1.15,
      ath_change_percentage
        :
        -13.37294,
      ath_date
        :
        "2020-03-13T02:35:42.953Z",
      atl
        :
        0.901127,
      atl_change_percentage
        :
        10.95581,
      atl_date
        :
        "2021-05-19T13:04:37.445Z",
      circulating_supply
        :
        16030973401.47,
      current_price
        :
        0.121557,
      fully_diluted_valuation
        :
        16040895738,
      high_24h
        :
        1.005,
      id
        :
        "binance-usd",
      image
        :
        "https://productionapi.soldaitswap.finance/tokens/0xfd7113a715cee3d961edd72e277cb122e2f2744b.png",
      low_24h
        :
        0.995173,
      market_cap
        :
        16040895738,
      market_cap_change_24h
        :
        -104938769.30654335,
      market_cap_change_percentage_24h
        :
        -0.64994,
      market_cap_rank
        :
        7,
      max_supply
        :
        null,
      name
        :
        "Binance USD",
      price_change_24h
        :
        0.00126931,
      price_change_percentage_24h
        :
        0.12701,
      roi
        :
        null,
      symbol
        :
        "SIT",
      total_supply
        :
        16030973401.47,
      total_volume
        :
        10877232893
    }
    if (result && result.length > 0) {
      result.unshift(datasol);
      setlist(result)
    }
  }

  var tickersettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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
      <WalletModal />
      <div className="page-header header-filter">
        <div className={classes.container}>
          <GridContainer className="mt-5 align-items-center py-5">
            <GridItem sm={12} md={6} lg={6} data-aos="fade-up" data-aos-duration="2000">
              <h1>Invest, Trade, Win Crypto with SOLDAIT</h1>
              <h3>Trade with soldaitswap, connect your <span>wallet</span> and start <span>secure</span>, fast swap, stake & farm your cryptoAssets</h3>
              <div className="d-flex align-items-center">
                <p>Grow your passive income with soldaitswap Anti-bots</p>
              </div>
            </GridItem>
            <GridItem sm={12} md={6} lg={6} data-aos="fade-up" data-aos-duration="2000">
              <img src={require("../assets/images/banner.png")} alt="BSC" className="img-fluid" />
            </GridItem>
          </GridContainer>
          <GridContainer className="mt-3">
            <GridItem md={4}>
              <div className="bottom_banner" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="100">
                <img src={require("../assets/images/banner1.png")} alt="Banner" className="img-fluid" />
              </div>
            </GridItem>
            <GridItem md={4}>
              <div className="bottom_banner" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200">
                <img src={require("../assets/images/banner2.png")} alt="Banner" className="img-fluid" />
              </div>
            </GridItem>
            <GridItem md={4}>
              <div className="bottom_banner" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300">
                <img src={require("../assets/images/banner3.png")} alt="Banner" className="img-fluid" />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      <div className="main">

        {/* Advantages Section */}
        <section className="advantages_section_first section">
          <div className="container">
            <GridContainer>
              <GridItem md={12}>
                <div className="banner_ticker_panel" data-aos="fade-up" data-aos-duration="2000">
                  <Slider {...tickersettings} className="ticker_slider">

                    {list && list.length > 0 && list.map((item, i) => {

                      var percent = parseFloat(item.price_change_percentage_24h);
                      var percentTxt = (percent > 0) ? "+" + percent : "-" + percent;
                      var classs = (percent > 0) ? "green_txt change_per" : "red_txt change_per"
                      var symbol = (item && item.symbol && item.symbol !== "") ? item.symbol.toUpperCase() : ""

                      return (
                        <div className={(percent > 0) ? "banner_ticker_single" : "banner_ticker_single banner_ticker_single_red"}>
                          <img src={item.image} alt="Banner" />
                          <div>
                            <div className="d-flex align-items-center">
                              <h3>{symbol}</h3>
                              <span class={classs}>{percentTxt}%</span>
                            </div>
                            <h2>${item.current_price}</h2>
                          </div>
                        </div>
                      )
                    })}

                  </Slider>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer className="mt-5 align-items-center">
              <GridItem sm={12} md={7} className="m-auto" data-aos="fade-up" data-aos-duration="2000">
                <h2 className="main_title">Token Distribution</h2>
                {/* <p className="main_content">Crypto currency is all available asset Material finance valuable.</p> */}
                <GridContainer className="align-items-center">
                  <GridItem lg={6}>
                    <div className="chart_container">
                      <Doughnut data={data} options={options} height={400} width={400} />
                      <div className="chart_inner">
                        <div className="chart_status">100% <span>Total</span></div>
                      </div>
                    </div>
                  </GridItem>
                  <GridItem lg={6}>
                    <div className="chart_data">
                      <ul>
                        <li>
                          <span>Private Sale</span>
                          <span>10%</span>
                        </li>
                        <li>
                          <span>Public Sales IDO</span>
                          <span>25%</span>
                        </li>
                        <li>
                          <span>Public Sale IEO</span>
                          <span>30%</span>
                        </li>
                        <li>
                          <span>Airdrop</span>
                          <span>0.3%</span>
                        </li>
                        <li>
                          <span>Community</span>
                          <span>17.5%</span>
                        </li>
                        <li>
                          <span>Team</span>
                          <span>5%</span>
                        </li>
                        <li>
                          <span>Marketing</span>
                          <span>10%</span>
                        </li>
                        <li>
                          <span>Partners & Advisors</span>
                          <span>2.2%</span>
                        </li>
                      </ul>
                      {/* <Button className="auth_btn blue_btn" data-toggle="modal" data-target="#wallet_modal"><AccountBalanceWallet /> Connect Wallet</Button> */}
                    </div>
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem sm={12} md={5} data-aos="fade-up" data-aos-duration="2000" className="text-center">
                <img src={require("../assets/images/swap.png")} className="img-fluid swap_img" alt="Swap" />
              </GridItem>
            </GridContainer>
          </div>
        </section>

        {/* Account Starts */}
        <section className="starts_section section">
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div class="circle-container">
            <div class="circle"></div>
          </div>
          <div className="container">
            <GridContainer>
              <GridItem sm={12} md={12} data-aos="fade-up" data-aos-duration="2000">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <h2>Soldait Token Info</h2>
                    <p className="para">Soldait Token is a smart contract that empowers & enhances tthe payment systems based on binance smart chain (BSC). Increase the effficiency, decrease the cost of money transfers and send or receive cross-border payments instantly.</p>
                    {walletConnection && walletConnection.connect === "yes" && walletConnection.address && walletConnection.address !== "" ? '' :
                      <Button className="auth_btn" data-toggle="modal" data-target="#wallet_modal"><AccountBalanceWallet /> Connect Wallet</Button>}

                    <div className="token_info">
                      <div>
                        <h3>Token Price</h3>
                        <h4>0.121557 $</h4>
                      </div>
                      <div>
                        <h3>Acceptable Currencies</h3>
                        <h4>BNB, BUSD</h4>
                      </div>
                      <div>
                        <h3>Number of Tokens For Sale</h3>
                        <h4>350,000,000</h4>
                      </div>
                      {/* <div>
                        <h3>Token Exchange Rate</h3>
                        <h4>1 SIT = 0.30 $</h4>
                        <h4>1 SIT = 0.00055 BNB</h4>
                      </div> */}
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </section>

        {/* Get Started Section */}
        {/* <section className="getstarted_section section pb-0">
          <div className="container">
            <GridContainer className="my-5">
              <GridItem sm={12} md={6} data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300">
                <img src={require("../assets/images/mobile_app.png")} alt="Icon" className="img-fluid mobile_app_banner" />
              </GridItem>
              <GridItem sm={12} md={6} data-aos="fade-up" data-aos-duration="2000" data-aos-delay="100">
                <h6>Choose your device platform</h6>
                <h2 className="main_title">Download This App</h2>
                <p className="main_content">Download our applications in your mobile phone or tablet and be connected 24/7 to the market. be fast and never lose any good opportunities.</p>
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column mr-3">
                    <img src={require("../assets/images/google_btn.png")} alt="Icon" className="mb-3 img-fluid" />
                    <img src={require("../assets/images/apple_btn.png")} alt="Icon" className="img-fluid" />
                  </div>
                  <img src={require("../assets/images/QRCode.png")} alt="Icon" />
                </div>
              </GridItem>

            </GridContainer>
          </div>
        </section> */}

        <FooterHome />


      </div>
    </div>
  );
}
