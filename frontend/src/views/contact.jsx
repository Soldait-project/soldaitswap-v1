import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import StaticNavbar from "../components/StaticNavbar";
import { gettemplate } from "../Api/UserActions";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import ReactHtmlParser from "react-html-parser";
import FooterHome from "../components/Footer/FooterHome.js";

const dashboardRoutes = [];
// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const Contact = (props) => {
  const { ...rest } = props;

  const [template, settemplate] = useState();
  useEffect(() => {
    getcontent();
  }, []);
  const getcontent = async () => {
    let { result } = await gettemplate("contact");
    if (result) {
      settemplate(result.content);
    } else {
      settemplate("<h1>No Content</h1>");
    }
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
      <div className="inner_wrapper">
        <div className="inner_pageheader container-fluid px-0">
          <div className="inner_heading_wrapper pool_heading_wrap">
            <div className="container">
              <GridContainer>
                <GridItem md={12} data-aos="fade-up" data-aos-duration="2000">
                  <h2>Contact Us</h2>
                  {/* <p>-By Soldait .</p> */}
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className="inner_content_wrapper pt-5 pb-5">
            <div className="container">
              <div class="accordion mb-4" id="faq">
                <h3 className="mt-0">Listing</h3>
                <div class="card">
                  <div class="card-header" id="faqhead1">
                    <a href="#" class="btn btn-header-link" data-toggle="collapse" data-target="#faq1" aria-expanded="true" aria-controls="faq1">How can I list my token on the exchange?</a>
                  </div>
                  <div id="faq1" class="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                    <div class="card-body">
                      Anybody can "list" any BEP-20 token on SoldaitSwap  . You are not required to contact us or seek permission. You just need to add liquidity to a liquidity pool - that's it. Traders can then trade your token by entering your token's contract address.
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header" id="faqhead2">
                    <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2" aria-expanded="true" aria-controls="faq2">How can I add my token to the default list?</a>
                  </div>
                  <div id="faq2" class="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                    <div class="card-body">
                      The top 25 ist is generated according to the highest volume for a specific period of time. As for the Extended list: projects hosting Farms will usually be added, and other tokens chosen by SoldaitSwap  core team may also be added. We do not accept applications these lists. Users can still add your token manually by inputting its contract address.
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header" id="faqhead3">
                    <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq3" aria-expanded="true" aria-controls="faq3">How can I add my token's logo/icon?</a>
                  </div>
                  <div id="faq3" class="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                    <div class="card-body">
                      Please add your icon/Logo to Trust Wallet’s assets repo, which SoldaitSwap references: <a href="https://github.com/trustwallet/assets" target="_blank">https://github.com/trustwallet/assets</a>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-header" id="faqhead4">
                    <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq4" aria-expanded="true" aria-controls="faq4">Why some statistics of my tokens are not shown on Info page?</a>
                  </div>
                  <div id="faq4" class="collapse" aria-labelledby="faqhead4" data-parent="#faq">
                    <div class="card-body">
                      Tokens must have at least 10 BNB of liquidity in one of the following quoted token pairs in order for the Info page to begin indexing your pairs and updating the underlying token.
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="mt-0">Customer Support</h3>
              <h5>Notes</h5>
              <ul>
                <li>You should NEVER , and ever give someone your private key or recovery phrases. Anyone who requests them should be immediately blocked and reported.</li>
                <li>Administrators will NEVER send you a private message. If anyone approaches you directly on Telegram, for example, pretending to be customer support, please block them and report spam.</li>
              </ul>
              <div className="footer_social_links">
                <ul>
                  <li><a href="https://www.facebook.com/soldait" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="https://twitter.com/SoldaitGate" target="_blank"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="https://www.instagram.com/soldait" target="_blank"><i className="fab fa-instagram"></i></a></li>
                  {/* <li><a href="" target="_blank"><i className="fab fa-telegram-plane"></i></a></li> */}
                  <li class="dropdown">
                    <a href="" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fab fa-telegram-plane"></i></a>                    
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="https://t.me/soldait" target="_blank">Soldait</a>
                      <a class="dropdown-item" href="https://t.me/Soldait_arabs" target="_blank">Soldait_arabs</a>
                      <a class="dropdown-item" href="https://t.me/soldait_ar" target="_blank">soldait_ar</a>
                      <a class="dropdown-item" href="https://t.me/soldaitOfficial" target="_blank">Soldait Token Official</a>
                      <a class="dropdown-item" href="https://t.me/soldait_in" target="_blank">Soldait - asian</a>                      
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterHome />
    </div>
  );
};

export default Contact;
