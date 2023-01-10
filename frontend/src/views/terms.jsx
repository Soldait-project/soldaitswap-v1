import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import HeaderSocial from "../components/Header/HeaderSocial";
import { gettemplate } from "../Api/UserActions";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import ReactHtmlParser from "react-html-parser";

const dashboardRoutes = [];
// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const Terms = (props) => {
  const { ...rest } = props;

  const [template, settemplate] = useState();
  useEffect(() => {
    getcontent();
  }, []);
  const getcontent = async () => {
    let { result } = await gettemplate("terms");
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
        brand={
          <img
            src={require("../assets/images/logo_color.png")}
            alt="logo"
            className="brand_logo_mobile"
          />
        }
        rightLinks={<HeaderSocial />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
        {...rest}
      />
      <ScrollToTopOnMount />
      <div className="inner_wrapper">
        <div className="inner_pageheader container-fluid px-0">
          <div className="inner_heading_wrapper pool_heading_wrap">
            <div className="container">
              <GridContainer>
                <GridItem md={12} data-aos="fade-up" data-aos-duration="2000">
                  <h2>Terms and Condition</h2>
                  <p>-By Soldait .</p>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className="inner_content_wrapper">
            <div className="container"></div>
            {ReactHtmlParser(template)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
