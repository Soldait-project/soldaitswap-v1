import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Hidden, Drawer, List, ListItem, } from "@material-ui/core";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "../../assets/jss/material-kit-react/components/headerStyle.js";
import { Link } from "react-router-dom";

import {
  getSettings
} from "../../Api/UserActions";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [socialLinks, SetsocialLinks] = React.useState({ facebook: "", linkedin: "", telegram: "", twitter: "", youtube: "" });

  React.useEffect(() => {
    getSocial()
  }, []);

  async function getSocial() {
    var { result } = await getSettings();
    if (result) {
      SetsocialLinks(result)
    }
  }

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  const brandComponent = <Link to="/" className="logo_div">{brand}</Link>;
  return (
    <div>
      <AppBar className={appBarClasses}>
        <Toolbar className="container-fluid home_main_nav">
          {leftLinks !== undefined ? brandComponent : null}
          <div className="d-flex align-items-center">
            {leftLinks !== undefined ? (
              <Hidden mdDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}
            <Hidden mdDown>
              <List className={classes.list + " home_left_navbar"}>
                {/* <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-medium"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-reddit-alien"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-twitter"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-discord"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-youtube"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-telegram-plane"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href="#/" color="transparent" className="nav-link"><i className="fab fa-github"></i></a>
                </ListItem> */}
                <ListItem className={classes.listItem}>
                  <a href={socialLinks.facebook} color="transparent" className="nav-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href={socialLinks.twitter} color="transparent" className="nav-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href={socialLinks.linkedin} color="transparent" className="nav-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href={socialLinks.telegram} color="transparent" className="nav-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram-plane"></i></a>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <a href={socialLinks.youtube} color="transparent" className="nav-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                </ListItem>
              </List>
            </Hidden>
          </div>
          <Hidden mdDown implementation="css">
            {rightLinks}
          </Hidden>
          <Hidden lgUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className="hamburger_btn"
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden lgUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper + " mobile_nav"
            }}
            onClose={handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    </div>
  );
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.object,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};
