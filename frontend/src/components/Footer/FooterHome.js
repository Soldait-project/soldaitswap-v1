/*eslint-disable*/
import React, { useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";
import { toastAlert } from "../../helper/toastAlert";
import {
  subscribeMail,
  getSettings
} from "../../Api/UserActions";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const [Email, Set_Email] = React.useState('');
  const [socialLinks, SetsocialLinks] = React.useState({ facebook: "", linkedin: "", telegram: "", twitter: "", youtube: "" });

  useEffect(() => {
    getSocial()
  }, []);

  async function getSocial() {
    var { result } = await getSettings();
    if (result) {
      SetsocialLinks(result)
    }
  }

  const inputChange = (e) => {

    if (e && e.target && typeof e.target.value != 'undefined' && e.target.name) {
      var value = e.target.value;
      Set_Email(value);
    }
  }

  async function Submit() {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var validEmail = re.test(String(Email).toLowerCase());

    if (Email == "") {
      toastAlert('error', "Please enter email id", 'subscribe');
      return;
    } else if (!validEmail) {
      toastAlert('error', "Please enter valid email id", 'subscribe');
      return;
    } else {

      var resp = await subscribeMail({ email: Email });
      var status = resp.result;
      if (status == "exits") {
        toastAlert('error', "Already subscribed", 'subscribe');
        return;
      } else {
        toastAlert('success', "Successfully subscribed", 'subscribe');
        Set_Email("");
      }

    }

  }


  return (
    <footer className={footerClasses + " footer_home"}>
      <div className={classes.container}>
        <div className="footer_top_home">
          <GridContainer>
            <GridItem sm={12} md={3}>
              <img src={require("../../assets/images/footer_logo.png")} alt="logo" className="footer_logo img-fluid" />
              <p className="footer_about">Trade with soldaitswap, connect your wallet and start secure,fast swap , stake & farm your cryptoAssets.</p>
            </GridItem>
            <GridItem sm={4} md={3}>
              <h2>Products</h2>
              <ul className="footer_menu_list">
                <li><Link to="/exchange">Exchange</Link></li>
                <li><Link to="/liquidity">Liquidity</Link></li>
                <li><Link to="/farms">Farms</Link></li>
                <li><Link to="/pools">Pools</Link></li>
              </ul>
            </GridItem>
            <GridItem sm={4} md={3}>
              <h2>Quick Links</h2>
              <ul className="footer_menu_list">
                {/* <li><a href="/policy" >Privacy Policy</a></li>
                <li><a href="/terms" >Terms & Conditions</a></li> */}
                <li><a href="/contact" >Contact Us</a></li> 
                <li><a href="https://github.com/Soldait-project/soldaitswap-v1/tree/main/Contract" target="_blank">Github</a></li> 
                <li><a href="/faq" >FAQ</a></li>
                <li><a href="/" >Audit</a></li> 
              </ul>
            </GridItem>
            <GridItem sm={12} md={3}>
              <h2>Subscribe Now</h2>
              <label className="subscribe_label">Get the latest news and updates</label>
              <div className="subscribe_form">
                <input name="email" type="email" placeholder="Enter your email address" value={Email} style={{color:'black'}} className="subscribe_inp" onChange={inputChange} />
                <Button className="subscribe_btn"><img src={require("../../assets/images/send_icon.png")} alt="logo" onClick={() => Submit()} /></Button>
              </div>
              <div className="footer_social_links">
                <ul>
                  <li><a href={socialLinks.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href={socialLinks.twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>
                  <li><a href={socialLinks.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a></li>
                  <li><a href={socialLinks.telegram} target="_blank"><i className="fab fa-telegram-plane"></i></a></li>
                  <li><a href={socialLinks.youtube} target="_blank"><i className="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div className="footer_bottom_home">
          <div>
            <p className="copyryt_txt mb-0">Soldait - &copy; Copyright 2023. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
