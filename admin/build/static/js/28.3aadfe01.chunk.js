(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[28],{1065:function(e,t,a){"use strict";a.r(t);var r=a(53),n=a(13),i=a(8),o=a(34),c=a.n(o),s=a(0),d=a.n(s),l=a(711),u=a(1082),m=a(1083),p=a(1084),b=a(1085),j=a(296),h=a(144),y=a(652),x=a(560),O=a(709),f=a(555),g=a(82),w=a(52),v=a(292),N=a(22),k=a.n(N),F=a(185);k.a.defaults.baseURL=F.a.p2pUrl,k.a.defaults.headers.common.Authorization=localStorage.getItem("accessToken")?localStorage.getItem("accessToken"):"";var C=k.a,I=F.a.p2pUrl,S=function(){var e=Object(r.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C({method:"post",url:"".concat(I,"/adminApi/currency"),data:t});case 3:return a=e.sent,e.abrupt("return",{result:a.data.result,message:a.data.message,success:a.data.success});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{errors:L(e.t0)});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C({method:"get",url:"".concat(I,"/adminApi/currency?skip=")+t.skip+"&limit="+t.limit});case 3:return a=e.sent,e.abrupt("return",{result:a.data.result,totalrecords:a.data.totalrecords});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{errors:L(e.t0)});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(r.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C({method:"put",url:"".concat(I,"/adminApi/currency"),data:t});case 3:return a=e.sent,e.abrupt("return",{result:a.data.result,message:a.data.message,success:a.data.success});case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",{errors:L(e.t0)});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();function L(e){return e.response&&e.response.data&&e.response.data.errors?e.response.data.errors:""}a(576);var A=a(5),T=a(551),R=a(654),M=a(677),B=a(658),z=(a(636),a(590)),D=a(502),q=a(505),V=a(497),E=a(78),U=a(724),H=a.n(U),G=function(){var e=Object(r.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a={},console.log(t,"details"),H()(t.type)&&(a.type="Currencytype field is required"),H()(t.currencyName)&&(a.currencyName="currencyName field is required"),H()(t.currencySymbol)&&(a.currencySymbol="currencySymbol field is required"),H()(t.withdrawFee)?a.withdrawFee="WihthdrawFee field is required":!0===isNaN(t.withdrawFee)?a.withdrawFee='"WithdrawFee" must be a number':(0===parseFloat(t.withdrawFee)||parseFloat(t.withdrawFee)<0)&&(a.withdrawFee='"WithdrawFee" must be greater than zero'),H()(t.minimumWithdraw)?a.minimumWithdraw="MinimumWithdraw field is required":!0===isNaN(t.minimumWithdraw)?a.minimumWithdraw='"MinimumWithdraw" must be a number':(0===parseFloat(t.minimumWithdraw)||parseFloat(t.minimumWithdraw)<0)&&(a.minimumWithdraw='"MinimumWithdraw" must be greater than zero'),H()(t.currencyImage)&&(a.currencyImage="Image field is required"),H()(t.withdrawLimit)?a.withdrawLimit="withdrawLimit field is required":!0===isNaN(t.withdrawLimit)?a.withdrawLimit='"withdrawLimit" must be a number':(0===parseFloat(t.withdrawLimit)||parseFloat(t.withdrawLimit)<0)&&(a.withdrawLimit='"withdrawLimit" must be greater than zero'),"crypto"==t.currencytype&&"CoinPayment"==t.gateWay&&(H()(t.CoinpaymetNetWorkFee)?a.CoinpaymetNetWorkFee="CoinpaymetNetWorkFee field is required":!0===isNaN(t.CoinpaymetNetWorkFee)?a.CoinpaymetNetWorkFee='"CoinpaymetNetWorkFee" must be a number':(0===parseFloat(t.CoinpaymetNetWorkFee)||parseFloat(t.CoinpaymetNetWorkFee)<0)&&(a.CoinpaymetNetWorkFee='"CoinpaymetNetWorkFee" must be greater than zero')),"token"==t.currencytype&&(H()(t.contractAddress)&&(a.contractAddress="contractAddress field is required"),H()(t.minABI)&&(a.minABI="MinAbi field is required"),H()(t.decimals)?a.decimals="Decimals field is required":!0===isNaN(t.decimals)?a.decimals='"Decimals" must be a number':(0===parseFloat(t.decimals)||parseFloat(t.decimals)<0)&&(a.decimals='"Decimals" must be greater than zero'),"CoinPayment"==t.gateWay&&(H()(t.CoinpaymetNetWorkFee)?a.CoinpaymetNetWorkFee="CoinpaymetNetWorkFee field is required":!0===isNaN(t.CoinpaymetNetWorkFee)?a.CoinpaymetNetWorkFee='"CoinpaymetNetWorkFee" must be a number':(0===parseFloat(t.CoinpaymetNetWorkFee)||parseFloat(t.CoinpaymetNetWorkFee)<0)&&(a.CoinpaymetNetWorkFee='"CoinpaymetNetWorkFee" must be greater than zero'))),"fiat"==t.type&&(H()(t.bankName)&&(a.bankName="BankName field is required"),H()(t.accountNo)?a.accountNo="Account Number field is required":!0===isNaN(t.accountNo)&&(a.accountNo='"Account Number" must be a number'),H()(t.holderName)&&(a.holderName="Holder Name field is required"),H()(t.bankcode)&&(a.bankcode="IBAN Code  field is required"),H()(t.country)&&(a.country="Country  field is required"),H()(t.minimumdeposit)?a.minimumdeposit="Minimumdeposit field is required":!0===isNaN(t.minimumdeposit)?a.minimumdeposit='"Minimumdeposit" must be a number':(0===parseFloat(t.minimumdeposit)||parseFloat(t.minimumdeposit)<0)&&(a.minimumdeposit='"Minimumdeposit" must be greater than zero'),H()(t.depositFee)?a.depositFee="DepositFee field is required":!0===isNaN(t.depositFee)?a.depositFee='"DepositFee" must be a number':(0===parseFloat(t.depositFee)||parseFloat(t.depositFee)<0)&&(a.depositFee='"DepositFee" must be greater than zero')),H()(a)){e.next=15;break}return e.abrupt("return",a);case 15:e.next=19;break;case 17:e.prev=17,e.t0=e.catch(0);case 19:case"end":return e.stop()}}),e,null,[[0,17]])})));return function(t){return e.apply(this,arguments)}}(),K=a(1),_={currencyName:"",currencySymbol:"",withdrawFee:"",minimumWithdraw:"",currencyImage:"",logoURI:"",type:"crypto",tokenType:"erc20",contractAddress:"",minABI:"",decimals:"",bankName:"",accountNo:"",bankcode:"",country:"",status:"",gateWay:"CoinPayment",CoinpaymetNetWorkFee:"1",withdrawLimit:"",depositFee:"",minimumdeposit:""},J=Object(w.a)(D.a)((function(){return{position:"absolute",top:"6px",left:"25px"}})),Y=Object(w.a)("span")((function(e){e.theme;return{color:E.a}}));function Q(e){var t=e.openfarm,a=e.setopenfarm,o=e.Edit,l=e.setEdit,u=e.Editdata,m=e.reload;console.log(e,"props");var p=d.a.useState(),b=Object(n.a)(p,2),j=(b[0],b[1],d.a.useState(!1)),h=Object(n.a)(j,2),y=(h[0],h[1],d.a.useState(!1)),g=Object(n.a)(y,2),N=(g[0],g[1],d.a.useState("")),k=Object(n.a)(N,2),C=(k[0],k[1],d.a.useState("")),I=Object(n.a)(C,2),W=I[0],L=I[1],D=d.a.useState(_),E=Object(n.a)(D,2),U=E[0],H=E[1],Q=d.a.useState(!1),X=Object(n.a)(Q,2),Z=X[0],$=X[1],ee=d.a.useState(!1),te=Object(n.a)(ee,2),ae=te[0],re=te[1],ne=d.a.useState({}),ie=Object(n.a)(ne,2),oe=ie[0],ce=ie[1],se=d.a.useState(!1),de=Object(n.a)(se,2),le=de[0],ue=de[1],me=Object(w.a)("img")((function(){return{width:"100%"}}));function pe(){return(pe=Object(r.a)(c.a.mark((function e(){var t,a,r,n,i,s,d,l,u,p,b,j;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(U,"farmData"),!o){e.next=44;break}if(!(U.currencyImage&&U.currencyImage.size>2e4)){e.next=5;break}return ce({currencyImage:"Image size should be less than  20 Kb"}),e.abrupt("return",!1);case 5:return e.next=7,G(U);case 7:if(!(t=e.sent)){e.next=12;break}return e.abrupt("return",ce(t));case 12:return(a=new FormData).append("currencyId",U.currencyId),a.append("type",U.type),a.append("tokenType",U.tokenType),a.append("currencyName",U.currencyName),a.append("currencySymbol",U.currencySymbol),a.append("contractAddress",U.contractAddress),a.append("minABI",U.minABI),a.append("decimals",U.decimals),a.append("withdrawFee",U.withdrawFee),a.append("minimumWithdraw",U.minimumWithdraw),a.append("bankName",U.bankName),a.append("accountNo",U.accountNo),a.append("holderName",U.holderName),a.append("bankcode",U.bankcode),a.append("country",U.country),a.append("currencyImage",U.currencyImage),a.append("status",U.status),a.append("withdrawLimit",U.withdrawLimit),a.append("depositFee",U.depositFee),a.append("minimumdeposit",U.minimumdeposit),e.next=35,P(a);case 35:if(r=e.sent,n=r.success,i=r.message,s=r.errors,1==n&&(L(i),ue(!0),re(!1),setTimeout((function(){m()}),"500")),!s){e.next=42;break}return e.abrupt("return",ce(s));case 42:e.next=83;break;case 44:if(!(U.currencyImage&&U.currencyImage.size>2e4)){e.next=47;break}return ce({currencyImage:"Image size should be less than  20 Kb"}),e.abrupt("return",!1);case 47:return e.next=49,G(U);case 49:if(!(d=e.sent)){e.next=54;break}return e.abrupt("return",ce(d));case 54:return(l=new FormData).append("type",U.type),l.append("tokenType",U.tokenType),l.append("currencyName",U.currencyName),l.append("currencySymbol",U.currencySymbol),l.append("contractAddress",U.contractAddress),l.append("minABI",U.minABI),l.append("decimals",U.decimals),l.append("withdrawFee",U.withdrawFee),l.append("minimumWithdraw",U.minimumWithdraw),l.append("bankName",U.bankName),l.append("accountNo",U.accountNo),l.append("holderName",U.holderName),l.append("bankcode",U.bankcode),l.append("country",U.country),l.append("currencyImage",U.currencyImage),l.append("withdrawLimit",U.withdrawLimit),l.append("depositFee",U.depositFee),l.append("minimumdeposit",U.minimumdeposit),e.next=75,S(l);case 75:if(u=e.sent,p=u.success,b=u.message,j=u.errors,console.log(b,"message"),1==p&&(L(b),ue(!0),re(!1),setTimeout((function(){m()}),"500")),!j){e.next=83;break}return e.abrupt("return",ce(j));case 83:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(s.useEffect)(Object(r.a)(c.a.mark((function e(){var t,a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o&&u&&(console.log(u,"Editdata"),"crypto"==u.type?(t={currencyId:u._id,currencyName:u.currencyName,currencySymbol:u.currencySymbol,currencyImage:u.currencyImage,type:u.type,withdrawFee:u.withdrawFee,minimumWithdraw:u.minimumWithdraw,status:u.status,gateWay:u.gateWay,CoinpaymetNetWorkFee:u.CoinpaymetNetWorkFee,withdrawLimit:u.withdrawLimit},H((function(e){return Object(A.a)(Object(A.a)({},e),t)}))):"token"==u.type?(a={currencyId:u._id,currencyName:u.currencyName,currencySymbol:u.currencySymbol,currencyImage:u.currencyImage,type:u.type,tokenType:u.tokenType,withdrawFee:u.withdrawFee,minimumWithdraw:u.minimumWithdraw,contractAddress:u.contractAddress,minABI:u.minABI,decimals:u.decimals,status:u.status,gateWay:u.gateWay,CoinpaymetNetWorkFee:u.CoinpaymetNetWorkFee,withdrawLimit:u.withdrawLimit},H((function(e){return Object(A.a)(Object(A.a)({},e),a)}))):"fiat"==u.type&&(r={currencyId:u._id,currencyName:u.currencyName,currencySymbol:u.currencySymbol,currencyImage:u.currencyImage,type:u.type,withdrawFee:u.withdrawFee,minimumWithdraw:u.minimumWithdraw,bankName:u.bankDetails.bankName,accountNo:u.bankDetails.accountNo,holderName:u.bankDetails.holderName,bankcode:u.bankDetails.bankcode,country:u.bankDetails.country,status:u.status,withdrawLimit:u.withdrawLimit,depositFee:u.depositFee,minimumdeposit:u.minimumdeposit},H((function(e){return Object(A.a)(Object(A.a)({},e),r)}))));case 1:case"end":return e.stop()}}),e)}))),[]);var be=function(e){var t=Object(i.a)({},e.target.id,e.target.value);console.log(t,"newData"),H(Object(A.a)(Object(A.a)({},U),t))};function je(){ue(!1)}function he(){l(!1),a(!1)}return console.log(oe,"validatation"),Object(K.jsx)("div",{children:Object(K.jsxs)(T.a,{open:t,onClose:he,"aria-labelledby":"form-dialog-title",onBackdropClick:"escapeKeyDown",children:[o?Object(K.jsx)(B.a,{id:"form-dialog-title",children:"Update Currency"}):Object(K.jsx)(B.a,{id:"form-dialog-title",children:"Add Currency "}),Object(K.jsxs)(z.ValidatorForm,{onSubmit:function(){return pe.apply(this,arguments)},children:[Object(K.jsxs)(M.a,{children:[Object(K.jsx)(q.a,{htmlFor:"currencytype",children:"Choose CurrencyType"}),Object(K.jsxs)(V.a,{sx:{mb:"12px",width:"100%"},native:!0,value:U.type,onChange:be,labeltext:"CurrencyType",inputProps:{name:"type",id:"type"},children:[Object(K.jsx)("option",{value:"crypto",children:"Crypto"}),Object(K.jsx)("option",{value:"token",children:"Token"}),Object(K.jsx)("option",{value:"fiat",children:"Fiat"})]}),"token"==U.type&&Object(K.jsxs)("div",{children:[Object(K.jsx)(q.a,{htmlFor:"currencytype",children:"Choose TokenType"}),Object(K.jsxs)(V.a,{sx:{mb:"12px",width:"100%"},native:!0,value:U.tokenType,onChange:be,labeltext:"Tokentype",inputProps:{name:"tokenType",id:"tokenType"},children:[Object(K.jsx)("option",{value:"erc20",children:"ERC 20"}),Object(K.jsx)("option",{value:"bep20",children:"BEP 20"}),Object(K.jsx)("option",{value:"matic20",children:"Matic 20"}),Object(K.jsx)("option",{value:"sol20",children:"SOL 20"})]})]}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"currencyName",label:"currencyName",onChange:be,fullWidth:!0,name:"currencyName",type:"text",value:U.currencyName}),oe.currencyName&&""!=oe.currencyName&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.currencyName}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"currencySymbol",label:"currency Symbol",onChange:be,fullWidth:!0,name:"currency Symbol",type:"text",value:U.currencySymbol}),oe.currencySymbol&&""!=oe.currencySymbol&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.currencySymbol}),"fiat"!=U.type&&Object(K.jsx)("div",{}),"token"==U.type&&Object(K.jsxs)("div",{children:[Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"contractAddress",label:"contract Address",onChange:be,fullWidth:!0,name:"contractAddress",type:"text",value:U.contractAddress}),oe.contractAddress&&""!=oe.contractAddress&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.contractAddress}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"minABI",label:"Min Abi",onChange:be,fullWidth:!0,name:"minABI",type:"textarea",value:U.minABI}),oe.minABI&&""!=oe.minABI&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.minABI}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"decimals",label:"Decimals",onChange:be,fullWidth:!0,name:"decimals",type:"text",value:U.decimals}),oe.decimals&&""!=oe.decimals&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.decimals})]}),"fiat"==U.type&&Object(K.jsxs)("div",{children:[Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"bankName",label:"Bank Name ",onChange:be,fullWidth:!0,name:"bankName",type:"text",value:U.bankName}),oe.bankName&&""!=oe.bankName&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.bankName}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"accountNo",label:"Account Number ",onChange:be,fullWidth:!0,name:"accountNo",type:"text",value:U.accountNo}),oe.accountNo&&""!=oe.accountNo&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.accountNo}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"holderName",label:"Holder Name",onChange:be,fullWidth:!0,name:"holderName",type:"text",value:U.holderName}),oe.holderName&&""!=oe.holderName&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.holderName}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"bankcode",label:"IBAN Code",onChange:be,fullWidth:!0,name:"bankcode",type:"text",value:U.bankcode}),oe.bankcode&&""!=oe.bankcode&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.bankcode}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"country",label:"Country",onChange:be,fullWidth:!0,name:"country",type:"text",value:U.country}),oe.country&&""!=oe.country&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.country}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"depositFee",label:"Deposit Fee  ",onChange:be,fullWidth:!0,name:"depositFee",type:"text",value:U.depositFee}),oe.depositFee&&""!=oe.depositFee&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.depositFee}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"minimumdeposit",label:"Minimum Deposit ",onChange:be,fullWidth:!0,name:"minimumdeposit",type:"text",value:U.minimumdeposit}),oe.minimumdeposit&&""!=oe.minimumdeposit&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.minimumdeposit})]}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"withdrawFee",label:"Withdraw Fee (%) ",onChange:be,fullWidth:!0,name:"withdrawFee",type:"text",value:U.withdrawFee}),oe.withdrawFee&&""!=oe.withdrawFee&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.withdrawFee}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"minimumWithdraw",label:"Minimum Withdraw ",onChange:be,fullWidth:!0,name:"minimumWithdraw",type:"text",value:U.minimumWithdraw}),oe.minimumWithdraw&&""!=oe.minimumWithdraw&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.minimumWithdraw}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"withdrawLimit",label:"withdraw Limit ",onChange:be,fullWidth:!0,name:"withdrawLimit",type:"text",value:U.withdrawLimit}),oe.withdrawLimit&&""!=oe.withdrawLimit&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.withdrawLimit}),o&&Object(K.jsxs)("div",{children:[Object(K.jsx)(q.a,{htmlFor:"currencytype",children:"Status"}),Object(K.jsxs)(V.a,{sx:{mb:"12px",width:"100%"},native:!0,value:U.status,onChange:be,labeltext:"Status",inputProps:{name:"status",id:"status"},children:[Object(K.jsx)("option",{value:"active",children:"Active"}),Object(K.jsx)("option",{value:"deactive",children:"Deactive"})]})]}),Object(K.jsx)(z.TextValidator,{sx:{mb:"12px",width:"100%"},variant:"outlined",size:"medium",id:"currencyImage",onChange:function(e){if(e.target.files&&e.target.files[0]){$(!0);var t=e.target.files[0],a=URL.createObjectURL(t);console.log(a,"url");var r={currencyImage:t,logoURI:a};H(Object(A.a)(Object(A.a)({},U),r))}},fullWidth:!0,type:"file"}),oe.currencyImage&&""!=oe.currencyImage&&Object(K.jsx)(Y,{style:{color:"red"},children:oe.currencyImage}),U&&(Z?Object(K.jsx)(me,{src:U.logoURI,alt:"",style:{maxWidth:"100%",width:"unset"}}):Object(K.jsx)(me,{src:"".concat(F.a.p2pimageUrl,"/currency/").concat(U.currencyImage),alt:"",style:{maxWidth:"100%",width:"unset"}})),Object(K.jsx)("br",{})]}),Object(K.jsxs)(R.a,{children:[Object(K.jsx)(f.a,{variant:"outlined",color:"secondary",onClick:he,children:"Cancel"}),"\xa0",o?Object(K.jsxs)(v.a,{position:"relative",children:[Object(K.jsx)(f.a,{variant:"outlined",color:"primary",disabled:ae,type:"submit",children:"Update"}),ae&&Object(K.jsx)(J,{size:24,className:"buttonProgress"})]}):Object(K.jsxs)(v.a,{position:"relative",children:[Object(K.jsx)(f.a,{variant:"outlined",color:"primary",disabled:ae,type:"submit",children:"Submit"}),ae&&Object(K.jsx)(J,{size:24,className:"buttonProgress"})]}),Object(K.jsx)(x.a,{anchorOrigin:{vertical:"top",horizontal:"right"},open:le,autoHideDuration:6e3,onClose:je,children:Object(K.jsx)(O.a,{onClose:je,severity:"success",sx:{width:"100%"},variant:"filled",children:W})})]})]})]})})}var X=Object(w.a)("div")((function(e){var t,a=e.theme;return t={margin:"30px"},Object(i.a)(t,a.breakpoints.down("sm"),{margin:"16px"}),Object(i.a)(t,"& .breadcrumb",Object(i.a)({marginBottom:"30px"},a.breakpoints.down("sm"),{marginBottom:"16px"})),t})),Z=Object(w.a)(l.a)((function(e){e.theme;return{whiteSpace:"pre","& thead":{"& tr":{"& th":{paddingLeft:0,paddingRight:0}}},"& tbody":{"& tr":{"& td":{paddingLeft:0,textTransform:"capitalize"}}}}}));t.default=function(){var e=d.a.useState(10),t=Object(n.a)(e,2),a=t[0],i=t[1],o=d.a.useState(0),l=Object(n.a)(o,2),w=l[0],N=l[1],k=d.a.useState([]),F=Object(n.a)(k,2),C=F[0],I=F[1],S=d.a.useState(0),P=Object(n.a)(S,2),L=P[0],A=P[1],T=d.a.useState(!1),R=Object(n.a)(T,2),M=R[0],B=R[1],z=d.a.useState(!1),D=Object(n.a)(z,2),q=D[0],V=D[1],E=d.a.useState(),U=Object(n.a)(E,2),H=U[0],G=U[1],_=d.a.useState(!1),J=Object(n.a)(_,2),Y=J[0],$=J[1];function ee(e,t){return te.apply(this,arguments)}function te(){return(te=Object(r.a)(c.a.mark((function e(t,a){var r,n,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={skip:t,limit:a},e.next=3,W(r);case 3:n=e.sent,console.log(n,"reeeee"),i=n&&n.result&&n.result.length>0?n.result:[],console.log(i,"record"),o=n&&n.totalrecords&&n.totalrecords>0?n.totalrecords:[],I(i),A(o);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}Object(s.useEffect)((function(){ee(1,a)}),[]);var ae=function(){var e=Object(r.a)(c.a.mark((function e(t,r){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:N(r),ee(parseInt(r)+parseInt(1),a);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),re=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i(+t.target.value),N(0),ee(1,t.target.value);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function ne(){$(!1)}return console.log(H,"return"),Object(K.jsxs)(X,{children:[Object(K.jsx)(f.a,{variant:"outlined",color:"primary",onClick:function(){B(!0)},children:"Add Currency"}),M&&Object(K.jsx)(Q,{openfarm:M,setopenfarm:B,Edit:q,setEdit:V,Editdata:H,reload:function(){window.location.reload()}}),Object(K.jsx)(v.a,{py:"12px"}),Object(K.jsx)(g.m,{title:"Currency",children:Object(K.jsxs)(v.a,{width:"100%",overflow:"auto",children:[Object(K.jsxs)(Z,{children:[Object(K.jsx)(u.a,{children:Object(K.jsxs)(m.a,{children:[Object(K.jsx)(p.a,{children:"Currency Name"}),Object(K.jsx)(p.a,{children:"Currency Symbol"}),Object(K.jsx)(p.a,{children:"Type"}),Object(K.jsx)(p.a,{children:"Status"}),Object(K.jsx)(p.a,{children:"Action"})]})}),Object(K.jsx)(b.a,{children:C.map((function(e,t){return Object(K.jsxs)(m.a,{children:[Object(K.jsx)(p.a,{align:"left",children:e.currencyName}),Object(K.jsx)(p.a,{align:"left",children:e.currencySymbol}),Object(K.jsx)(p.a,{align:"left",children:e.type}),Object(K.jsx)(p.a,{align:"left",children:e.status}),Object(K.jsx)(p.a,{sx:{px:0},colSpan:1,children:Object(K.jsx)(j.a,{onClick:function(){return t=e,console.log(t,"datadatadatadata",C),G(t),B(!0),void V(!0);var t},children:Object(K.jsx)(h.a,{color:"primary",children:"edit"})})})]},t)}))})]}),Object(K.jsx)(y.a,{sx:{px:2},rowsPerPageOptions:[5,10,25],component:"div",count:L,rowsPerPage:a,page:w,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onPageChange:ae,onRowsPerPageChange:re})]})}),Object(K.jsx)(x.a,{anchorOrigin:{vertical:"top",horizontal:"right"},open:Y,autoHideDuration:6e3,onClose:ne,children:Object(K.jsx)(O.a,{onClose:ne,severity:"success",sx:{width:"100%"},variant:"filled",children:"Deleted Successfully !!!"})})]})}},576:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a(604),n=a.n(r);function i(e,t){return e&&""!==e&&t&&""!==t?n()(e).format(t):"-"}},580:function(e,t,a){"use strict";a.d(t,"b",(function(){return i}));var r=a(58),n=a(70);function i(e){return Object(r.a)("MuiDialogTitle",e)}var o=Object(n.a)("MuiDialogTitle",["root"]);t.a=o},641:function(e,t,a){"use strict";var r=a(8),n=a(6),i=a(3),o=a(0),c=a(9),s=a(100),d=a(14),l=a(7),u=a(58),m=a(70);function p(e){return Object(u.a)("MuiToolbar",e)}Object(m.a)("MuiToolbar",["root","gutters","regular","dense"]);var b=a(1),j=["className","component","disableGutters","variant"],h=Object(l.a)("div",{name:"MuiToolbar",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,!a.disableGutters&&t.gutters,t[a.variant]]}})((function(e){var t=e.theme,a=e.ownerState;return Object(i.a)({position:"relative",display:"flex",alignItems:"center"},!a.disableGutters&&Object(r.a)({paddingLeft:t.spacing(2),paddingRight:t.spacing(2)},t.breakpoints.up("sm"),{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}),"dense"===a.variant&&{minHeight:48})}),(function(e){var t=e.theme;return"regular"===e.ownerState.variant&&t.mixins.toolbar})),y=o.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiToolbar"}),r=a.className,o=a.component,l=void 0===o?"div":o,u=a.disableGutters,m=void 0!==u&&u,y=a.variant,x=void 0===y?"regular":y,O=Object(n.a)(a,j),f=Object(i.a)({},a,{component:l,disableGutters:m,variant:x}),g=function(e){var t=e.classes,a={root:["root",!e.disableGutters&&"gutters",e.variant]};return Object(s.a)(a,p,t)}(f);return Object(b.jsx)(h,Object(i.a)({as:l,className:Object(c.a)(g.root,r),ref:t,ownerState:f},O))}));t.a=y},652:function(e,t,a){"use strict";var r,n,i,o,c,s,d,l,u=a(8),m=a(6),p=a(3),b=a(0),j=a(9),h=a(100),y=a(133),x=a(7),O=a(14),f=a(27),g=a(756),w=a(497),v=a(1084),N=a(641),k=a(80),F=a(1),C=Object(k.a)(Object(F.jsx)("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft"),I=Object(k.a)(Object(F.jsx)("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight"),S=a(28),W=a(296),P=Object(k.a)(Object(F.jsx)("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),"LastPage"),L=Object(k.a)(Object(F.jsx)("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),"FirstPage"),A=["backIconButtonProps","count","getItemAriaLabel","nextIconButtonProps","onPageChange","page","rowsPerPage","showFirstButton","showLastButton"],T=b.forwardRef((function(e,t){var a=e.backIconButtonProps,u=e.count,b=e.getItemAriaLabel,j=e.nextIconButtonProps,h=e.onPageChange,y=e.page,x=e.rowsPerPage,O=e.showFirstButton,f=e.showLastButton,g=Object(m.a)(e,A),w=Object(S.a)();return Object(F.jsxs)("div",Object(p.a)({ref:t},g,{children:[O&&Object(F.jsx)(W.a,{onClick:function(e){h(e,0)},disabled:0===y,"aria-label":b("first",y),title:b("first",y),children:"rtl"===w.direction?r||(r=Object(F.jsx)(P,{})):n||(n=Object(F.jsx)(L,{}))}),Object(F.jsx)(W.a,Object(p.a)({onClick:function(e){h(e,y-1)},disabled:0===y,color:"inherit","aria-label":b("previous",y),title:b("previous",y)},a,{children:"rtl"===w.direction?i||(i=Object(F.jsx)(I,{})):o||(o=Object(F.jsx)(C,{}))})),Object(F.jsx)(W.a,Object(p.a)({onClick:function(e){h(e,y+1)},disabled:-1!==u&&y>=Math.ceil(u/x)-1,color:"inherit","aria-label":b("next",y),title:b("next",y)},j,{children:"rtl"===w.direction?c||(c=Object(F.jsx)(C,{})):s||(s=Object(F.jsx)(I,{}))})),f&&Object(F.jsx)(W.a,{onClick:function(e){h(e,Math.max(0,Math.ceil(u/x)-1))},disabled:y>=Math.ceil(u/x)-1,"aria-label":b("last",y),title:b("last",y),children:"rtl"===w.direction?d||(d=Object(F.jsx)(L,{})):l||(l=Object(F.jsx)(P,{}))})]}))})),R=a(568),M=a(58),B=a(70);function z(e){return Object(M.a)("MuiTablePagination",e)}var D,q=Object(B.a)("MuiTablePagination",["root","toolbar","spacer","selectLabel","selectRoot","select","selectIcon","input","menuItem","displayedRows","actions"]),V=["ActionsComponent","backIconButtonProps","className","colSpan","component","count","getItemAriaLabel","labelDisplayedRows","labelRowsPerPage","nextIconButtonProps","onPageChange","onRowsPerPageChange","page","rowsPerPage","rowsPerPageOptions","SelectProps","showFirstButton","showLastButton"],E=Object(x.a)(v.a,{name:"MuiTablePagination",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(e){var t=e.theme;return{overflow:"auto",color:t.palette.text.primary,fontSize:t.typography.pxToRem(14),"&:last-child":{padding:0}}})),U=Object(x.a)(N.a,{name:"MuiTablePagination",slot:"Toolbar",overridesResolver:function(e,t){return Object(p.a)(Object(u.a)({},"& .".concat(q.actions),t.actions),t.toolbar)}})((function(e){var t,a=e.theme;return t={minHeight:52,paddingRight:2},Object(u.a)(t,"".concat(a.breakpoints.up("xs")," and (orientation: landscape)"),{minHeight:52}),Object(u.a)(t,a.breakpoints.up("sm"),{minHeight:52,paddingRight:2}),Object(u.a)(t,"& .".concat(q.actions),{flexShrink:0,marginLeft:20}),t})),H=Object(x.a)("div",{name:"MuiTablePagination",slot:"Spacer",overridesResolver:function(e,t){return t.spacer}})({flex:"1 1 100%"}),G=Object(x.a)("p",{name:"MuiTablePagination",slot:"SelectLabel",overridesResolver:function(e,t){return t.selectLabel}})((function(e){var t=e.theme;return Object(p.a)({},t.typography.body2,{flexShrink:0})})),K=Object(x.a)(w.a,{name:"MuiTablePagination",slot:"Select",overridesResolver:function(e,t){var a;return Object(p.a)((a={},Object(u.a)(a,"& .".concat(q.selectIcon),t.selectIcon),Object(u.a)(a,"& .".concat(q.select),t.select),a),t.input,t.selectRoot)}})(Object(u.a)({color:"inherit",fontSize:"inherit",flexShrink:0,marginRight:32,marginLeft:8},"& .".concat(q.select),{paddingLeft:8,paddingRight:24,textAlign:"right",textAlignLast:"right"})),_=Object(x.a)(g.a,{name:"MuiTablePagination",slot:"MenuItem",overridesResolver:function(e,t){return t.menuItem}})({}),J=Object(x.a)("p",{name:"MuiTablePagination",slot:"DisplayedRows",overridesResolver:function(e,t){return t.displayedRows}})((function(e){var t=e.theme;return Object(p.a)({},t.typography.body2,{flexShrink:0})}));function Y(e){var t=e.from,a=e.to,r=e.count;return"".concat(t,"\u2013").concat(a," of ").concat(-1!==r?r:"more than ".concat(a))}function Q(e){return"Go to ".concat(e," page")}var X=b.forwardRef((function(e,t){var a,r=Object(O.a)({props:e,name:"MuiTablePagination"}),n=r.ActionsComponent,i=void 0===n?T:n,o=r.backIconButtonProps,c=r.className,s=r.colSpan,d=r.component,l=void 0===d?v.a:d,u=r.count,x=r.getItemAriaLabel,g=void 0===x?Q:x,w=r.labelDisplayedRows,N=void 0===w?Y:w,k=r.labelRowsPerPage,C=void 0===k?"Rows per page:":k,I=r.nextIconButtonProps,S=r.onPageChange,W=r.onRowsPerPageChange,P=r.page,L=r.rowsPerPage,A=r.rowsPerPageOptions,M=void 0===A?[10,25,50,100]:A,B=r.SelectProps,q=void 0===B?{}:B,X=r.showFirstButton,Z=void 0!==X&&X,$=r.showLastButton,ee=void 0!==$&&$,te=Object(m.a)(r,V),ae=r,re=function(e){var t=e.classes;return Object(h.a)({root:["root"],toolbar:["toolbar"],spacer:["spacer"],selectLabel:["selectLabel"],select:["select"],input:["input"],selectIcon:["selectIcon"],menuItem:["menuItem"],displayedRows:["displayedRows"],actions:["actions"]},z,t)}(ae),ne=q.native?"option":_;l!==v.a&&"td"!==l||(a=s||1e3);var ie=Object(R.a)(q.id),oe=Object(R.a)(q.labelId);return Object(F.jsx)(E,Object(p.a)({colSpan:a,ref:t,as:l,ownerState:ae,className:Object(j.a)(re.root,c)},te,{children:Object(F.jsxs)(U,{className:re.toolbar,children:[Object(F.jsx)(H,{className:re.spacer}),M.length>1&&Object(F.jsx)(G,{className:re.selectLabel,id:oe,children:C}),M.length>1&&Object(F.jsx)(K,Object(p.a)({variant:"standard",input:D||(D=Object(F.jsx)(f.c,{})),value:L,onChange:W,id:ie,labelId:oe},q,{classes:Object(p.a)({},q.classes,{root:Object(j.a)(re.input,re.selectRoot,(q.classes||{}).root),select:Object(j.a)(re.select,(q.classes||{}).select),icon:Object(j.a)(re.selectIcon,(q.classes||{}).icon)}),children:M.map((function(e){return Object(b.createElement)(ne,Object(p.a)({},!Object(y.a)(ne)&&{ownerState:ae},{className:re.menuItem,key:e.label?e.label:e,value:e.value?e.value:e}),e.label?e.label:e)}))})),Object(F.jsx)(J,{className:re.displayedRows,children:N({from:0===u?0:P*L+1,to:-1===u?(P+1)*L:-1===L?u:Math.min(u,(P+1)*L),count:-1===u?-1:u,page:P})}),Object(F.jsx)(i,{className:re.actions,backIconButtonProps:o,count:u,nextIconButtonProps:I,onPageChange:S,page:P,rowsPerPage:L,showFirstButton:Z,showLastButton:ee,getItemAriaLabel:g})]})}))}));t.a=X},654:function(e,t,a){"use strict";var r=a(6),n=a(3),i=a(0),o=a(9),c=a(100),s=a(7),d=a(14),l=a(58),u=a(70);function m(e){return Object(l.a)("MuiDialogActions",e)}Object(u.a)("MuiDialogActions",["root","spacing"]);var p=a(1),b=["className","disableSpacing"],j=Object(s.a)("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,!a.disableSpacing&&t.spacing]}})((function(e){var t=e.ownerState;return Object(n.a)({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!t.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})})),h=i.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiDialogActions"}),i=a.className,s=a.disableSpacing,l=void 0!==s&&s,u=Object(r.a)(a,b),h=Object(n.a)({},a,{disableSpacing:l}),y=function(e){var t=e.classes,a={root:["root",!e.disableSpacing&&"spacing"]};return Object(c.a)(a,m,t)}(h);return Object(p.jsx)(j,Object(n.a)({className:Object(o.a)(y.root,i),ownerState:h,ref:t},u))}));t.a=h},658:function(e,t,a){"use strict";var r=a(3),n=a(6),i=a(0),o=a(9),c=a(100),s=a(558),d=a(7),l=a(14),u=a(580),m=a(192),p=a(1),b=["className","id"],j=Object(d.a)(s.a,{name:"MuiDialogTitle",slot:"Root",overridesResolver:function(e,t){return t.root}})({padding:"16px 24px",flex:"0 0 auto"}),h=i.forwardRef((function(e,t){var a=Object(l.a)({props:e,name:"MuiDialogTitle"}),s=a.className,d=a.id,h=Object(n.a)(a,b),y=a,x=function(e){var t=e.classes;return Object(c.a)({root:["root"]},u.b,t)}(y),O=i.useContext(m.a).titleId,f=void 0===O?d:O;return Object(p.jsx)(j,Object(r.a)({component:"h2",className:Object(o.a)(x.root,s),ownerState:y,ref:t,variant:"h6",id:f},h))}));t.a=h},677:function(e,t,a){"use strict";var r=a(8),n=a(6),i=a(3),o=a(0),c=a(9),s=a(100),d=a(7),l=a(14),u=a(58),m=a(70);function p(e){return Object(u.a)("MuiDialogContent",e)}Object(m.a)("MuiDialogContent",["root","dividers"]);var b=a(580),j=a(1),h=["className","dividers"],y=Object(d.a)("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,a.dividers&&t.dividers]}})((function(e){var t=e.theme,a=e.ownerState;return Object(i.a)({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},a.dividers?{padding:"16px 24px",borderTop:"1px solid ".concat(t.palette.divider),borderBottom:"1px solid ".concat(t.palette.divider)}:Object(r.a)({},".".concat(b.a.root," + &"),{paddingTop:0}))})),x=o.forwardRef((function(e,t){var a=Object(l.a)({props:e,name:"MuiDialogContent"}),r=a.className,o=a.dividers,d=void 0!==o&&o,u=Object(n.a)(a,h),m=Object(i.a)({},a,{dividers:d}),b=function(e){var t=e.classes,a={root:["root",e.dividers&&"dividers"]};return Object(s.a)(a,p,t)}(m);return Object(j.jsx)(y,Object(i.a)({className:Object(c.a)(b.root,r),ownerState:m,ref:t},u))}));t.a=x},724:function(e,t){var a=Object.prototype.hasOwnProperty,r=Object.prototype.toString;e.exports=function(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return 0===e;if("string"==typeof e)return 0===e.length;if("function"==typeof e)return 0===e.length;if(Array.isArray(e))return 0===e.length;if(e instanceof Error)return""===e.message;if(e.toString==r)switch(e.toString()){case"[object File]":case"[object Map]":case"[object Set]":return 0===e.size;case"[object Object]":for(var t in e)if(a.call(e,t))return!1;return!0}return!1}}}]);