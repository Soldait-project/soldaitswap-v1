import React, { useState } from 'react';
import { HelpOutline } from '@material-ui/icons';
import { Button, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// import Switch from "react-switch";

import {
  numberFloatOnly,
  numberOnly
} from "../helper/custommath";


const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#fff',
    color: '#646e88',
    maxWidth: 220,
    fontSize: "13px",
    fontFamily: "'lato', sans-serif",
    lineHeight: "20px",
    border: '1px solid #fff',
    boxShadow: '-4px 5px 10px 2px rgb(0 0 0 / 20%)'
  },
}))(Tooltip);


const SlippageModal = ({ onChildClick }) => {

  const [slippage, setslippage] = useState(0.1);
  const [deadline, setdeadline] = useState(5);
  const [slippageerr, setslippageerr] = useState("");
  //const [checked, setchecked] = useState(false);

  function setSlippage(value) {
    onChildClick({ settings: value });
    setslippage(value);
  }
  const inputChange = async (event) => {

    var id = event.target.id;
    var value = event.target.value;
    var status = false;
    if (id === "deadline") {
      status = await numberOnly(event.target.value);
    } else {
      status = await numberFloatOnly(event.target.value);
    }

    if (status) {

      if (id === "slippage") {
        setslippageerr("")

        onChildClick({ settings: value });
        setslippage(value);


        if (value > 5 && value < 50) {
          setslippageerr("Your transaction may be frontrun")
        } else if (value > 49) {
          setslippageerr("Enter valid slippage percentage")
        }

      }
      if (id === "deadline") {
        onChildClick({ [id]: value });
        setdeadline(value);
      }
    }

  }

  async function onBlurSlippage() {
    var status = await numberFloatOnly(slippage);
    if (slippage === "" || slippage > 49 || !slippage
      || !status || slippage <= 0 || isNaN(slippage)) {
      setslippageerr("")
      onChildClick({ settings: 0.5 });
      setslippage(0.5);
    }
  }

  async function onBlurDeadline() {
    var status = await numberFloatOnly(deadline);
    if (deadline === "" || !deadline || deadline <= 0
      || !status || isNaN(deadline)) {
      onChildClick({ "deadline": 5 });
      setdeadline(5);
    }
  }

  // function handleChange(chk) {
  //   setchecked(chk);
  //   onChildClick({ "ismultiHops": (chk) ? "true" : "false" });
  // }

  return (
    <div>
      <div className="modal fade primary_modal" id="settings_modal" tabIndex="-1" role="dialog" aria-labelledby="settings_modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="settings_modal_title">Settings</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                <h4>Slippage tolerance</h4>
                <HtmlTooltip className="tooltip_content"
                  title={
                    <React.Fragment>
                      <p className="tooltip_content">Your trasaction will revert if the price changes unfavourably by more than this percentage</p>
                    </React.Fragment>
                  }
                >
                  <HelpOutline className="tooltip_icon" />
                </HtmlTooltip>
              </div>
              <div className="d-flex">
                <Button onClick={() => { setSlippage(0.1) }} className="inner_primary_btn mr-2">0.1%</Button>
                <Button onClick={() => { setSlippage(0.5) }} className="inner_primary_btn mr-2">0.5%</Button>
                <Button onClick={() => { setSlippage(1) }} className="inner_primary_btn">1%</Button>
              </div>
              <div className="d-flex justify-content-between align-items-center w-50 mt-3">
                <input type="text" onBlur={onBlurSlippage} onChange={inputChange} id="slippage" value={slippage} className="search_inp" placeholder="5"></input>
                <p className="mb-0 ml-2">%</p>
              </div>
              {slippageerr !== "" && <span className="slippagErr" style={{ color: "red" }}>{slippageerr}</span>}
              <h4 className="mt-4">Transaction deadline</h4>
              <div className="d-flex justify-content-between align-items-center w-50 mt-3">
                <input type="text" onBlur={onBlurDeadline} id="deadline" value={deadline} onChange={inputChange} className="search_inp" placeholder="30"></input>
                <p className="mb-0 ml-2">Minutes</p>
              </div>
              {/* <h4 className="mt-4">Disable Multihops</h4>
              <div className="d-flex justify-content-between align-items-center w-50 mt-3">
                <Switch onChange={handleChange} checked={checked} />
              </div> */}
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default SlippageModal;