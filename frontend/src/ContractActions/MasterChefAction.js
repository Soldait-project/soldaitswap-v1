import MasterChef from "../ABI/MasterChef.json";
import LPABI from "../ABI/LPABI.json";
import BEP20 from "../ABI/BEP20.json";
import config from "../config/config";
import Web3 from "web3";
import JSBI from 'jsbi/dist/jsbi.mjs';

import { connection } from "../helper/connection";

import {
  Multicall
} from "ethereum-multicall";

import {
  convertToWei,
  divideDecimal
} from "../helper/custommath";

import {
  convert
} from "../helper/convert"

import {
  getFormData
} from "../Api/FarmActions"

import {
  getPoolData
} from "../Api/PoolActions"

var zeroAddr = "0x0000000000000000000000000000000000000000";

export async function getFormsDetails(data) {
  var get = await connection();

  try {

    var web3 = get.web3;
    if (web3 === "" || !web3) {
      web3 = new Web3(config.rpcurl);
    }
    var address = zeroAddr;
    if (get.address && get.address !== "") {
      address = get.address;
    }

    let { result } = await getFormData(data);

    var range = (result && result.length > 0) ? result : [];

    const multicall = new Multicall({
      web3Instance: web3,
    });

    var pollArray = [];
    var obj = {};
    if (range && range.length > 0) {
      for (var i in range) {
        var ran = range[i].pid;

        var masterChefContract = [
          {
            reference: "poolInfo",
            contractAddress: config.MasterChef,
            abi: MasterChef,
            calls: [
              {
                reference: "poolInfo",
                methodName: "poolInfo",
                methodParameters: [ran],
              },
              {
                reference: "userInfo",
                methodName: "userInfo",
                methodParameters: [ran, address],
              },
            ]
          }
        ];

        const poolresults = await multicall.call(masterChefContract);

        var poolinfo = await getFormatMulticall(poolresults, "poolInfo", 0);
        var apy = await getFormatMulticall(poolresults, "poolInfo", 0);
        apy = (apy && apy[2] && apy[2].hex) ? parseInt(apy[2].hex) / 100 : 0

        var stakeBal = await getFormatMulticall(poolresults, "poolInfo", 1);


        var contractCallContext = [
          {
            reference: "LPtokengetBalanceof",
            contractAddress: poolinfo[0],
            abi: LPABI,
            calls: [
              {
                reference: "balanceOf",
                methodName: "balanceOf",
                methodParameters: [address],
              },
              {
                reference: "balanceOf",
                methodName: "balanceOf",
                methodParameters: [config.MasterChef],
              },
              {
                reference: "allowance",
                methodName: "allowance",
                methodParameters: [address, config.MasterChef],
              }
            ],
          }
        ];

        const results = await multicall.call(contractCallContext);

        var LPtokengetBalanceof = await getFormatMulticall(results, "LPtokengetBalanceof", 0);
        var LPtokengettotalSupply = await getFormatMulticall(results, "LPtokengetBalanceof", 1);
        var ApprovedAlready = await getFormatMulticall(results, "LPtokengetBalanceof", 2);

        LPtokengettotalSupply = await divideDecimal(parseInt(LPtokengettotalSupply.hex), 18);
        LPtokengetBalanceof = await divideDecimal(parseInt(LPtokengetBalanceof.hex), 18);
        ApprovedAlready = await divideDecimal(parseInt(ApprovedAlready.hex), 18);
        var stakeBalance = await divideDecimal(parseInt(stakeBal[0].hex), 18);

        obj = {
          tokenA: range[i].tokenSymbol,
          tokenB: range[i].quoteTokenSymbol,
          lpSymbol: range[i].lpSymbol,
          TotalSupply: LPtokengettotalSupply,
          LPBalance: LPtokengetBalanceof,
          endsIn: 0,
          LPaddress: poolinfo[0],
          allowance: ApprovedAlready,
          pid: ran,
          stakeBal: stakeBalance,
          stakeBalOf: parseInt(stakeBal[0].hex),
          earned: 0,
          apr: 0,
          logoURI: range[i].logoURI,
          depositFee: range[i].depositFee,
          apy: apy,
          status: range[i].status,
        };

        pollArray.push(obj);

      }
    }
    return {
      value: pollArray,
      status: true,
    };

  } catch (err) {

    return {
      value: "Ero",
      status: false,
    };
  }
}

export async function fetchPoolsDetails(data) {
  var get = await connection();
  // return;
  try {

    var web3 = get.web3;
    if (web3 === "" || !web3) {
      web3 = new Web3(config.rpcurl);
    }
    var address = zeroAddr;
    if (get.address && get.address !== "") {
      address = get.address;
    }

    let { result } = await getPoolData(data);
    var range = (result && result.length > 0) ? result : [];

    const multicall = new Multicall({
      web3Instance: web3,
    });

    var pollArray = [];
    var obj = {};
    if (range) {
      for (var i in range) {
        var ran = range[i].pid;

        var masterChefContract = [
          {
            reference: "poolInfo",
            contractAddress: config.MasterChef,
            abi: MasterChef,
            calls: [
              {
                reference: "poolInfo",
                methodName: "poolInfo",
                methodParameters: [ran],
              },
              {
                reference: "userInfo",
                methodName: "userInfo",
                methodParameters: [ran, address],
              },
            ]
          }
        ];

        const poolresults = await multicall.call(masterChefContract);

        var poolinfo = await getFormatMulticall(poolresults, "poolInfo", 0);
        var apy = await getFormatMulticall(poolresults, "poolInfo", 0);
        apy = (apy && apy[2] && apy[2].hex) ? parseInt(apy[2].hex) / 100 : 0
        var stakeBal = await getFormatMulticall(poolresults, "poolInfo", 1);

        const contractCallContext = [
          {
            reference: "LPtokengetBalanceof",
            contractAddress: poolinfo[0],
            abi: LPABI,
            calls: [
              {
                reference: "balanceOf",
                methodName: "balanceOf",
                methodParameters: [address],
              },
              {
                reference: "balanceOf",
                methodName: "balanceOf",
                methodParameters: [config.MasterChef],
              },
              {
                reference: "allowance",
                methodName: "allowance",
                methodParameters: [address, config.MasterChef],
              },
            ],
          }
        ];

        const results = await multicall.call(contractCallContext);

        var LPtokengetBalanceof1 = await getFormatMulticall(results, "LPtokengetBalanceof", 0);
        var LPtokengettotalSupply1 = await getFormatMulticall(results, "LPtokengetBalanceof", 1);
        var ApprovedAlready = await getFormatMulticall(results, "LPtokengetBalanceof", 2);

        var TotalSupply = await divideDecimal(parseInt(LPtokengettotalSupply1.hex), 18);
        LPtokengetBalanceof1 = await divideDecimal(parseInt(LPtokengetBalanceof1.hex), 18);
        ApprovedAlready = await divideDecimal(parseInt(ApprovedAlready.hex), 18);
        stakeBal = await divideDecimal(parseInt(stakeBal[0].hex), 18);

        obj = {
          lpSymbol: range[i].lpSymbol,
          TotalSupply: parseFloat(TotalSupply),
          LPBalance: parseFloat(LPtokengetBalanceof1),
          LPaddress: poolinfo[0],
          allowance: ApprovedAlready,
          pid: ran,
          stakeBal: stakeBal,
          earned: 0,
          apy: apy,
          lastRewardBlock: 0,
          logoURI: range[i].logoURI,
          depositFee: range[i].depositFee,
          status: range[i].status,
        };


        pollArray.push(obj);

      }
    }
    return {
      value: pollArray,
      status: true,
    };

  } catch (err) {
    return {
      value: "Ero",
      status: false,
    };
  }
}


export async function getDetails(type) {
  var get = await connection();
  // return;
  try {

    var web3 = get.web3;
    if (web3 === "" || !web3) {
      web3 = new Web3(config.rpcurl);
    }
    var address = zeroAddr;
    if (get.address && get.address !== "") {
      address = get.address;
    }

    var range = [];
    if (type === "farm") {
      var getForms = await getFormData();

      range = (getForms.result) ? getForms.result : []
    } else {
      var getPools = await getPoolData();
      range = (getPools.result) ? getPools.result : [];
    }

    const multicall = new Multicall({
      web3Instance: web3,
    });

    var pollArray = [];

    var obj = {};
    if (range) {
      for (var i in range) {
        var ran = range[i].pid;
        var masterChefContract = [
          {
            reference: "poolInfo",
            contractAddress: config.MasterChef,
            abi: MasterChef,
            calls: [
              {
                reference: "poolInfo",
                methodName: "poolInfo",
                methodParameters: [ran],
              },
              {
                reference: "userInfo",
                methodName: "userInfo",
                methodParameters: [ran, address],
              },
            ]
          }
        ];

        const poolresults = await multicall.call(masterChefContract);

        var poolinfo = await getFormatMulticall(poolresults, "poolInfo", 0);
        var stakeBal = await getFormatMulticall(poolresults, "poolInfo", 1);

        if (type === "farm") {

          var contractCallContext = [
            {
              reference: "LPtokengetBalanceof",
              contractAddress: poolinfo[0],
              abi: LPABI,
              calls: [
                {
                  reference: "balanceOf",
                  methodName: "balanceOf",
                  methodParameters: [address],
                },
                {
                  reference: "balanceOf",
                  methodName: "balanceOf",
                  methodParameters: [config.MasterChef],
                },
                {
                  reference: "allowance",
                  methodName: "allowance",
                  methodParameters: [address, config.MasterChef],
                }
              ],
            }
          ];

          const results = await multicall.call(contractCallContext);

          var LPtokengetBalanceof = await getFormatMulticall(results, "LPtokengetBalanceof", 0);
          var LPtokengettotalSupply = await getFormatMulticall(results, "LPtokengetBalanceof", 1);
          var ApprovedAlready = await getFormatMulticall(results, "LPtokengetBalanceof", 2);

          LPtokengettotalSupply = await divideDecimal(parseInt(LPtokengettotalSupply.hex), 18);
          LPtokengetBalanceof = await divideDecimal(parseInt(LPtokengetBalanceof.hex), 18);
          ApprovedAlready = await divideDecimal(parseInt(ApprovedAlready.hex), 18);
          var stakeBalance = await divideDecimal(parseInt(stakeBal[0].hex), 18);

          obj = {
            tokenA: range[i].tokenSymbol,
            tokenB: range[i].quoteTokenSymbol,
            lpSymbol: range[i].lpSymbol,
            TotalSupply: LPtokengettotalSupply,
            LPBalance: LPtokengetBalanceof,
            endsIn: 0,
            LPaddress: poolinfo[0],
            allowance: ApprovedAlready,
            pid: ran,
            stakeBal: stakeBalance,
            stakeBalOf: parseInt(stakeBal[0].hex),
            earned: 0,
            apr: 0,
            logoURI: range[i].logoURI,
            depositFee: range[i].depositFee,
            withdrawFee: range[i].withdrawFee,
            apy: 300,
            status: range[i].status,
          };

          pollArray.push(obj);
        } else if (type === "pool") {

          const contractCallContext = [
            {
              reference: "LPtokengetBalanceof",
              contractAddress: poolinfo[0],
              abi: LPABI,
              calls: [
                {
                  reference: "balanceOf",
                  methodName: "balanceOf",
                  methodParameters: [address],
                },
                {
                  reference: "balanceOf",
                  methodName: "balanceOf",
                  methodParameters: [config.MasterChef],
                },
                {
                  reference: "allowance",
                  methodName: "allowance",
                  methodParameters: [address, config.MasterChef],
                },
                {
                  reference: "decimals",
                  methodName: "decimals",
                  methodParameters: [],
                },
              ],
            }
          ];

          const results = await multicall.call(contractCallContext);

          var decimals = await getFormatMulticall(results, "LPtokengetBalanceof", 3);

          LPtokengetBalanceof = await getFormatMulticall(results, "LPtokengetBalanceof", 0);
          let LPtokengettotalSupply = await getFormatMulticall(results, "LPtokengetBalanceof", 1);
          var ApprovedAlready1 = await getFormatMulticall(results, "LPtokengetBalanceof", 2);

          var TotalSupply = await divideDecimal(parseInt(LPtokengettotalSupply.hex), decimals);
          LPtokengetBalanceof = await divideDecimal(parseInt(LPtokengetBalanceof.hex), decimals);
          ApprovedAlready1 = await divideDecimal(parseInt(ApprovedAlready1.hex), decimals);
          stakeBal = await divideDecimal(parseInt(stakeBal[0].hex), decimals);

          obj = {
            lpSymbol: range[i].lpSymbol,
            TotalSupply: parseFloat(TotalSupply),
            LPBalance: parseFloat(LPtokengetBalanceof),
            LPaddress: poolinfo[0],
            allowance: ApprovedAlready1,
            pid: ran,
            stakeBal: stakeBal,
            earned: 0,
            apy: 300,
            lastRewardBlock: 0,
            logoURI: range[i].logoURI,
            depositFee: range[i].depositFee,
            withdrawFee: range[i].withdrawFee,
            status: range[i].status,
          };


          pollArray.push(obj);
        }
      }
    }

    return {
      value: pollArray,
      status: true,
    };

  } catch (err) {
    return {
      value: "Ero",
      status: false,
    };
  }
}

export async function approvetoken(LPaddress) {
  var get = await connection();
  try {
    if (get && get.web3) {
      var web3 = get.web3;
      var address = get.address;

      var Contract = new web3.eth.Contract(LPABI, LPaddress);
      var approveAmt = (10000000) * (10 ** 18);
      approveAmt = await convert(approveAmt);

      await Contract.methods
        .approve(config.MasterChef, approveAmt.toString())
        .send({ from: address });

      return {
        value: "Approved success",
        status: true,
        approveAmt
      };
    } else {
      return {
        value: "Web3 Error",
        status: false,
        approveAmt: 0
      };
    }
  } catch (err) {
    return {
      value: "Ero",
      status: false,
      approveAmt: 0
    };
  }
}

export async function stake(pid, amount, LPaddress, lpBal) {

  var get = await connection();
  try {
    if (get && get.web3) {
      var web3 = get.web3;
      var address = get.address;

      var Contract = new web3.eth.Contract(LPABI, LPaddress);
      var bal = await Contract.methods.balanceOf(address).call();

      var amo = await convertToWei(amount, 18);
      amo = amo.toString();

      if (parseFloat(bal) < parseFloat(amo)) {
        return {
          value: "Your balance is too low",
          status: false,
        };
      }
      var ContractM = new web3.eth.Contract(MasterChef, config.MasterChef);

      if (parseFloat(lpBal) === parseFloat(amount)) {
        amo = JSBI.BigInt(await Contract.methods.balanceOf(address).call());
        amo = String(amo);
      }

      await ContractM.methods.deposit(pid, amo).send({ from: address });

      return {
        value: "Staked success",
        status: true,
      };
    } else {
      return {
        value: "Web3 Error",
        status: false,
      };
    }
  } catch (err) {
    return {
      value: "Ero",
      status: false,
    };
  }
}

export async function stakePool(pid, amount, LPaddress, lpBal) {

  var get = await connection();
  try {
    if (get && get.web3) {

      var web3 = get.web3;
      var address = get.address;

      var Contract = new web3.eth.Contract(BEP20, LPaddress);
      var bal = await Contract.methods.balanceOf(address).call();

      if (parseFloat(bal) < parseFloat(amount)) {
        return {
          value: "Your balance is too low",
          status: false,
        };
      }


      var ContractM = new web3.eth.Contract(MasterChef, config.MasterChef);
      var amo = await convertToWei(amount, 18);
      amo = amo.toString()

      if (parseFloat(lpBal) === parseFloat(amount)) {
        amo = JSBI.BigInt(await Contract.methods.balanceOf(address).call());
        amo = String(amo);
      }

      try {
        await ContractM.methods.deposit(pid, amo).estimateGas({ from: address });
        await ContractM.methods.deposit(pid, amo).send({ from: address });
      } catch (err) {

        return {
          value: "Ero",
          status: false,
        };
      }


      return {
        value: "Staked success",
        status: true,
      };
    } else {
      return {
        value: "Web3 Error",
        status: false,
      };
    }
  } catch (err) {

    return {
      value: "Ero",
      status: false,
    };
  }
}

export async function harverst(pid) {
  var get = await connection();
  try {
    if (get && get.web3) {
      var web3 = get.web3;
      var address = get.address;

      var ContractM = new web3.eth.Contract(MasterChef, config.MasterChef);

      var bal = await ContractM.methods.pendingSoldait(pid, address).call();
      if (bal === 0 || bal === "0" || parseFloat(bal) < 0) {
        return {
          value: "insufficient reward earned",
          status: false,
        };
      }

      await ContractM.methods
        .deposit(pid, 0)
        .send({ from: address });

      return {
        value: "Withdraw Successful",
        status: true,
      };
    } else {
      return {
        value: "Oops something went wrong..!",
        status: false,
      };
    }
  } catch (err) {
    return {
      value: "Oops something went wrong..!",
      status: false,
    };
  }
}

export async function getreward(details) {
  var get = await connection();
  try {
    if (get && get.web3) {
      var web3 = get.web3;
      var address = get.address;
      var ContractM = new web3.eth.Contract(MasterChef, config.MasterChef);
      var pollArray = [];
      if (details) {
        for (var i in details) {
          var ran = details[i].pid;
          var bal = await ContractM.methods.pendingSoldait(ran, address).call();
          pollArray.push({
            bal: bal,
            pid: ran
          });
        }
      }

      return {
        value: pollArray,
        status: true,
      };
    } else {
      return {
        value: "Web3 Error",
        status: false,
      };
    }
  } catch (err) {
    return {
      value: "Oops Error",
      status: false,
    };
  }
}

export async function unstake(amount, pid, unstakeBal) {
  var get = await connection();
  try {

    if (get && get.web3) {
      var web3 = get.web3;
      var address = get.address;
      var ContractM = new web3.eth.Contract(MasterChef, config.MasterChef);

      var stakeBalance = await ContractM.methods.userInfo(pid, address).call();

      if (unstakeBal < amount) {
        return {
          value: "Invalid Amount",
          status: true,
        };
      }

      var amo = await convertToWei(amount, 18);
      amo = amo.toString();
      if (parseFloat(amount) === parseFloat(unstakeBal)) {
        amo = JSBI.BigInt(stakeBalance[0]);
        amo = String(amo);
      }
      try {
        await ContractM.methods.withdraw(pid, amo).estimateGas({ from: address });
        await ContractM.methods.withdraw(pid, amo).send({ from: address });
      } catch (err) {
        return {
          value: "Web3 Error",
          status: false,
        };
      }


      return {
        value: "Staked success",
        status: true,
      };
    } else {
      return {
        value: "Web3 Error",
        status: false,
      };
    }
  } catch (err) {
    return {
      value: "Ero",
      status: false,
    };
  }
}

export async function getStakeUnstakeBalance(pid, lpaddress) {

  var get = await connection();
  // return;
  try {

    var web3 = get.web3;
    if (web3 === "" || !web3) {
      web3 = new Web3(config.rpcurl);
    }
    var address = zeroAddr;
    if (get.address && get.address !== "") {
      address = get.address;
    }
    const multicall = new Multicall({
      web3Instance: web3,
    });
    var masterChefContract = [
      {
        reference: "poolInfo",
        contractAddress: config.MasterChef,
        abi: MasterChef,
        calls: [

          {
            reference: "userInfo",
            methodName: "userInfo",
            methodParameters: [pid, address],
          },
        ]
      },
      {
        reference: "LPtokengetBalanceof",
        contractAddress: lpaddress,
        abi: LPABI,
        calls: [
          {
            reference: "balanceOf",
            methodName: "balanceOf",
            methodParameters: [address],
          },
          {
            reference: "balanceOf",
            methodName: "balanceOf",
            methodParameters: [config.MasterChef],
          },
        ]
      }
    ];


    const poolresults = await multicall.call(masterChefContract);
    var stakeBal = await getFormatMulticall(poolresults, "poolInfo", 0);
    var lpBal = await getFormatMulticall(poolresults, "LPtokengetBalanceof", 0);
    var totalSupply = await getFormatMulticall(poolresults, "LPtokengetBalanceof", 1);

    stakeBal = (stakeBal && stakeBal[0] && stakeBal[0].hex) ? await divideDecimal(parseInt(stakeBal[0].hex), 18) : 0;
    lpBal = (lpBal && lpBal.hex) ? await divideDecimal(parseInt(lpBal.hex), 18) : 0;
    totalSupply = (totalSupply && totalSupply.hex) ? await divideDecimal(parseInt(totalSupply.hex), 18) : 0;

    return {
      stakeBal: parseFloat(stakeBal),
      lpBal: parseFloat(lpBal),
      totalSupply: parseFloat(totalSupply),
    }

  } catch (err) {

    return {
      stakeBal: 0,
      lpBal: 0
    }
  }

}

export async function getFormatMulticall(results, name, pos) {
  try {
    var returnVal =
      results &&
        results.results &&
        results.results[name].callsReturnContext &&
        results.results[name].callsReturnContext &&
        results.results[name].callsReturnContext[pos] &&
        results.results[name].callsReturnContext[pos].returnValues &&
        results.results[name].callsReturnContext[pos].returnValues[0]
        ? (results.results[name].callsReturnContext[pos].returnValues.length > 1) ?
          results.results[name].callsReturnContext[pos].returnValues : results.results[name].callsReturnContext[pos].returnValues[0]
        : "";

    return returnVal;
  } catch (err) {
    return "";
  }
}