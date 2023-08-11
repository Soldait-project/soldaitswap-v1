/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, Hidden } from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

export default function HeaderSocial(props) {
  const classes = useStyles();

  return (
    <div className="home_page_menu">
      <List className={classes.list + " main_navbar"}>
        <Hidden lgUp>
          <ListItem className={classes.listItem}>
            <NavLink to="/" color="transparent" className="nav-link">Home</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/exchange" color="transparent" className="nav-link">Exchange</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/liquidity" color="transparent" className="nav-link">Liquidity</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/farms" color="transparent" className="nav-link">Farms</NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/pools" color="transparent" className="nav-link">Pools</NavLink>
          </ListItem>

          {/* <ListItem className={classes.listItem}>
            <NavLink to="/referral" color="transparent" className="nav-link">Referral</NavLink>
          </ListItem> */}
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-medium"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-reddit-alien"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-twitter"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-discord"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-youtube"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-telegram-plane"></i></a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <a href="#" color="transparent" className="nav-link"><i className="fab fa-github"></i></a>
          </ListItem>
        </Hidden>
      </List>


    </div>
  );
}
