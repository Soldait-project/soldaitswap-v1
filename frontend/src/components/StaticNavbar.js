/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link, NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button, List, ListItem, Tooltip } from "@material-ui/core";

// @material-ui/icons
import { Help, LockOpen, Assignment } from "@material-ui/icons";

import styles from "../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "rgba(85,0,255,1)",
  },
  tooltip: {
    background: "linear-gradient(90deg, rgba(85,0,255,1) 35%, rgba(214,0,255,1) 100%)",
    fontSize: "14px"
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function StaticNavbar(props) {

  const classes = useStyles();
  return (
    <div className="left_navigation relative">
      <div className="sticky_left_nav top_menu">
        <div>
         <a href='/'> <img src={require("../assets/images/logo.png")} alt="logo" className="brand_desk_logo" /></a>
        </div>
        <List className={classes.list + " stick_left_nav_ul"}>
          <ListItem className={classes.listItem}>
            <BootstrapTooltip title="Home" placement="right">
              <NavLink to="/home" color="transparent" className="nav-link top_nav_login">
                <img src={require("../assets/images/home.png")} alt="Icon" />
              </NavLink>
            </BootstrapTooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
            <BootstrapTooltip title="Exchange" placement="right">
              <NavLink to="/exchange" color="transparent" className="nav-link top_nav_login">
                <img src={require("../assets/images/exchange.png")} alt="Icon" />
              </NavLink>
            </BootstrapTooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
            <BootstrapTooltip title="Liquidity" placement="right">
              <NavLink to="/liquidity" color="transparent" className="nav-link top_nav_login">
                <img src={require("../assets/images/liqidity.png")} alt="Icon" />
              </NavLink>
            </BootstrapTooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
            <BootstrapTooltip title="Farms" placement="right">
              <NavLink to="/farms" color="transparent" className="nav-link top_nav_login">
                <img src={require("../assets/images/farms.png")} alt="Icon" />
              </NavLink>
            </BootstrapTooltip>
          </ListItem>
          <ListItem className={classes.listItem}>
            <BootstrapTooltip title="Pools" placement="right">
              <NavLink to="/pools" color="transparent" className="nav-link top_nav_login">
                <img src={require("../assets/images/pools.png")} alt="Icon" />
              </NavLink>
            </BootstrapTooltip>
          </ListItem>
        </List>
        <div></div>
      </div>
    </div>

  );
}
