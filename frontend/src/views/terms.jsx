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
                  <h2>Terms and Condition</h2>
                  {/* <p>-By Soldait .</p> */}
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <div className="inner_content_wrapper">
            <div className="container">
              {/* {ReactHtmlParser(template)} */}
              <div className="cms_content">
                <p>This Privacy Policy (this “Policy”) applies to the trading platform (including any applicable mobile applications and websites used to access the same) (collectively the “Platform”) provided by (the “Company,” “we,” “us” or “our”). It describes how the Company collects, uses, and discloses Personal Information that we obtain from Users of the Platform and any account services provided through the Platform, and how we use and disclose that information. For purposes of this Policy, “Personal Information” refers to information supplied by a User from which the identity of such User may be directly or indirectly determined.</p>
                <p>By registering for and using the Platform, you agree that your Personal Information will be handled as described in this Policy and the Terms and Conditions applicable to the Platform (the “Service Agreement”); capitalized terms used herein shall have the same meaning as set forth in the Service Agreement.</p>
                <h2>The Information We Collect About You and How We Collect It</h2>
                <p>We collect and process Personal Information about you directly from you when you register to use the Platform or submit such information as a part of the Know-Your-Client (“KYC”), as well as automatically through your use of the Platform.</p>
                <h2>How We Use Your Information</h2>
                <ul>
                  <li>To provide our Platform to you, to facilitate communications and transactions on the Platform, to communicate with you about your use of our Platform, to respond to your inquiries, to fulfill your orders, and for other customer service purposes</li>
                  <li>To tailor the content and information that we may send or display to you, to offer location customization, and personalized help and instructions, and to otherwise personalize your experiences while using our Platform</li>
                  <li>To better understand how users access and use the Platform, both on an aggregated and individualized basis, in order to improve our Platform and respond to user desires and preferences, and for other research and analytical purposes</li>
                  <li>For marketing and promotional purposes. For example, we may use your information, such as your email address, to send you news and newsletters, special offers, and promotions, to conduct sweepstakes and contests, or to otherwise contact you about products or information we think may interest you. We also may use the information that we learn about you to assist us in advertising our Platform on third-party websites</li>
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

export default Terms;
