/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

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
  return (
    <footer className={footerClasses + " footer_home" + " footer_inner"}>
      <div className={classes.container}>
        <div className="footer_bottom_home">
          <div className="text-center">
            <p>Smart-Contract Address: </p>
            <Link to="/" className="ft_contract">0x5acc84a3e955Bdd76467d3348077d003f00fFB97</Link>
          </div>
          <div className="footer_social_links">
            <ul>
              <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#" target="_blank"><i className="fab fa-youtube"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
