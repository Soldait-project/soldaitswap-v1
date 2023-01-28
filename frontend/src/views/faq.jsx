import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import HeaderLinks from "../components/Header/HeaderLinks.js";
import StaticNavbar from "../components/StaticNavbar";
import { gettemplate } from '../Api/UserActions'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import ReactHtmlParser from "react-html-parser"
import FooterHome from "../components/Footer/FooterHome.js";
import { Accordion, Card, Button } from 'react-bootstrap';
import {getAllFaq} from '../Api/UserActions'
const dashboardRoutes = [];
// Scroll to Top
function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
}





const Faq = (props) => {
    const { ...rest } = props;
    const [data, setData] = useState([])
    const [showclss, setshowclss] = useState('0')
    const [collapseclss, setcollapseclss] = useState('btn btn-header-link')
    const [expandclass, setexpandclass] = useState(true)
// function
const fetchFaq = async () => {
    try {
      const { status, loading, result } = await getAllFaq()
      console.log(status,'result', result)
      if (status == 'success') {
        setData(result)
      }
    } catch (err) { }
  }
    useEffect(() => {
        fetchFaq()
      }, [])
    // useEffect(() => {
    //     getcontent()
    // }, [])
    // const getcontent = async () => {
    //     let { result } = await gettemplate('faq');
    //     if (result) {
    //         settemplate(result.content);
    //     } else {
    //         settemplate("<h1>No Content</h1>");
    //     }
    // }
    const handleclick = async (e) => {
        e.preventDefault();
        const { name } = e.target;
        console.log(e.target.className,' e.target',name)
        if(e.target.className =='btn btn-header-link'){
            console.log('fhhhhh')
            setcollapseclss('btn btn-header-link collapsed') 
            setexpandclass(false) 
        }
        if(e.target.className =='btn btn-header-link collapsed'){
            setcollapseclss('btn btn-header-link') 
            setexpandclass(true) 
        }
       setshowclss(name);
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
                                    <h2>FAQ</h2>
                                    <p>This FAQ page answers some of the more commonly asked questions from the SoldaitSwap community</p>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </div>
                    <div className="inner_content_wrapper">
                        <div className="container">
                            
                            <div class="accordion pt-5 pb-3" id="faq">
                            {
                          data && data.length > 0 && data.map((item, index) => {
                            
                            return (
                                
                            <div class="card">
                                    <div class="card-header" id={`faqhead${index}`}>
                                        <a   href="#"  class={collapseclss} data-toggle="collapse" data-target={`#faq${index}`} aria-expanded={expandclass} aria-controls="faq1" onClick={handleclick} name={index}>{item && item.question?item.question:''} </a>
                                    </div>
                                    <div id={`#faq${index}`} class={showclss ==index && collapseclss=='btn btn-header-link'  ?'collapse show' :"collapse"} aria-labelledby={`faqhead${index}`} data-parent="#faq">
                                        <div class="card-body">
                                           <ul>
                                          {item && item.answer ?item.answer:'' }
                                           </ul>
                                        </div>
                                    </div>
                                </div> 


                            )
                        })
                          }
                                {/* <div class="card">
                                    <div class="card-header" id="faqhead1">
                                        <a href="#" class="btn btn-header-link" data-toggle="collapse" data-target="#faq1" aria-expanded="true" aria-controls="faq1">Has SoldaitSwap been Audited?</a>
                                    </div>
                                    <div id="faq1" class="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                                        <div class="card-body">
                                           <ul>
                                            <li>We have open-source software, and for maximum transparency, our website and all of our Smart Contracts are available to the public repo on github official account.</li>
                                            <li>All transactions are safe, secure and certain because our smart contracts are confirmed by BSC blockchain explorers.</li>
                                            <li>Anti - bot to prevent automated trading and provide the trader the full experience for fair competition.</li>
                                            <li>Our contracts time-lock gives you peace of mind.</li>
                                           </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header" id="faqhead2">
                                        <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2" aria-expanded="true" aria-controls="faq2">What is staking?</a>
                                    </div>
                                    <div id="faq2" class="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                                        <div class="card-body">
                                            Staking offers crypto holders a way of putting their digital assets to work and earning passive income without needing to sell them.
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div class="card">
                                    <div class="card-header" id="faqhead3">
                                        <a href="#" class="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq3" aria-expanded="true" aria-controls="faq3">What is farming?</a>
                                    </div>
                                    <div id="faq3" class="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                                        <div class="card-body">
                                            Yield farming is a method of earning rewards or interest by depositing your cryptocurrency into a pool with other users. The pooled funds are used to carry out smart contracts such as cryptocurrency lending that generates interest in return. As a result yield Farms allow users to earn sit while supporting Soldaitswap by staking LP Tokens.
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterHome />
        </div>
    );
}

export default Faq;