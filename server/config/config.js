var keyEnvBased = {};
// prod

if (process.env.NODE_ENV === "production") {
  keyEnvBased = {
    mongoURI: "mongodb://productionapidb:KOiPCCDEJGD8dq9uaAALCCDEJGD8dq9uaAA@127.0.0.1:27000/productionapidb",
    Auth_key: "soldait^&#*2931E#",
    port: 2052,
    jwtname: "SOLDAIT",
    secretKey: "SOLDAIT*26@7#$%@",
    imageURL: "https://productionapi.soldaitswap.finance/",
    baseUrl: "https://soldaitswap.finance/",
    adminpanel: "https://controls.soldaitswap.finance/",
    frontUrl: "",
    emailGateway: {
      SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
      fromMail: "contact@soldaitswap.com",
      nodemailer: {
        host: "mail.soldaitswap.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'contact@soldaitswap.com', // generated ethereal user   | WeAlwin___MA1L___niwlAeW
          pass: 'Argusbits1983@', // generated ethereal password
        },
      }
    },
    Router: "0x5fE4cdF5c6aC6A19eF2EA83b82D457976C1BeAC5",
    Factory: "0x48De093056e94db1394b790B1b1f8a34338817fa",
    rpcUrl: "https://bsc-dataseed1.ninicoin.io/"
  };
} else if (process.env.NODE_ENV === "demo") {
  keyEnvBased = {
    mongoURI: "mongodb://soldaitdb:8LYIydpk7vFGOLXKPayA38765456789654NIBfCcICXIJ6b1wXhdVFh9gcBy@127.0.0.1:27000/soldaitdb",
    Auth_key: "soldait^&#*2931E#",
    port: 3550,
    jwtname: "SOLDAIT",
    secretKey: "SOLDAIT*26@7#$%@",
    imageURL: "https://soldaitapi.wealwin.com/",
    baseUrl: "https://soldait-frontend-2023.pages.dev/",
    adminpanel: " https://soldait-admin-panel-frontend-2023.pages.dev/",
    frontUrl: "",
    emailGateway: {
      SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
      fromMail: "devtest@dev.wealwin.com",
      nodemailer: {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'devtest@dev.wealwin.com', // generated ethereal user   | WeAlwin___MA1L___niwlAeW
          pass: 'WeAlwin___MA1L___niwlAeW', // generated ethereal password
        },
      }
    },
    Router: "0x5fE4cdF5c6aC6A19eF2EA83b82D457976C1BeAC5",
    Factory: "0x48De093056e94db1394b790B1b1f8a34338817fa",
    rpcUrl: "https://bsc-dataseed1.binance.org/"
  };
} else {
  keyEnvBased = {
    //mongoURI: "mongodb://soldaitdb:8LYIydpk7vFGOLXKPayA38765456789654NIBfCcICXIJ6b1wXhdVFh9gcBy@127.0.0.1:27000/soldaitdb",
    mongoURI: "mongodb://localhost:27017/soldaitdb",
    Auth_key: "soldait^&#*2931E#",
    port: 3533,
    jwtname: "SOLDAIT",
    secretKey: "SOLDAIT*26@7#$%@",
    imageURL: "https://productionapi.soldaitswap.finance/",
    baseUrl: "https://productionapi.soldaitswap.finance/",
    // baseUrl: "http://localhost:3000/",

    // baseUrl: "http://localhost:3533/",

    adminpanel: "https://controls.soldaitswap.finance/",
    frontUrl: "",
    emailGateway: {
      SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
      fromMail: "contact@soldaitswap.com",
      nodemailer: {
        host: "mail.soldaitswap.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'contact@soldaitswap.com', // generated ethereal user   | WeAlwin___MA1L___niwlAeW
          pass: 'Argusbits1983@', // generated ethereal password
        },
      }
    },
    Router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    Factory: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    rpcUrl: "https://bsc-dataseed1.ninicoin.io/"
  };
}

let key = { ...keyEnvBased };

export default key;
