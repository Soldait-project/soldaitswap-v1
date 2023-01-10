var keyEnvBased = {};
// prod
var NODE_ENV = "delocalmo";
if (NODE_ENV === "prod") {
  keyEnvBased = {
    mongoURI: "mongodb://soldaitdb:8LYIydpk7vFGOLXKPayA38765456789654NIBfCcICXIJ6b1wXhdVFh9gcBy@127.0.0.1:10590/soldaitdb",
    Auth_key: "soldait^&#*2931E#",
    port: 3550,
    jwtname: "SOLDAIT",
    secretKey: "SOLDAIT*26@7#$%@",
    baseUrl: "https://soldait-frontend-2023.pages.dev/",
    adminpanel: "https://soldait-admin-panel-frontend-2023.pages.dev/",
    frontUrl: "",
    emailGateway: {
      SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
      fromMail: "techupdate@dev.wealwin.com",
      nodemailer: {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'techupdate@dev.wealwin.com', // generated ethereal user
          pass: 'WeAlwin___MA1L___niwlAeW', // generated ethereal password
        },
      }
    },
  };
} else if (NODE_ENV === "demo") {
  keyEnvBased = {
    mongoURI: "mongodb://soldaitdb:8LYIydpk7vFGOLXKPayA38765456789654NIBfCcICXIJ6b1wXhdVFh9gcBy@127.0.0.1:10590/soldaitdb",
    Auth_key: "soldait^&#*2931E#",
    port: 3533,
    jwtname: "SOLDAIT",
    secretKey: "SOLDAIT*26@7#$%@",
    baseUrl: "https://soldait-frontend-2023.pages.dev/",
    adminpanel: "https://soldait-admin-panel-frontend-2023.pages.dev/",
    frontUrl: "",
    emailGateway: {
      SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
      fromMail: "techupdate@dev.wealwin.com",
      nodemailer: {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'techupdate@dev.wealwin.com', // generated ethereal user
          pass: 'WeAlwin___MA1L___niwlAeW', // generated ethereal password
        },
      }
    },
  };
} else {
  keyEnvBased = {
    // mongoURI: "mongodb://soldaitdb:8LYIydpk7vFGOLXKPayA38765456789654NIBfCcICXIJ6b1wXhdVFh9gcBy@127.0.0.1:10590/soldaitdb",
    mongoURI: "mongodb://localhost:27017/soldait",
    Auth_key: "soldait^&#*2931E#",
    port: 3533,
    jwtname: "SOLDAIT",
    secretKey: "SOLDAIT*26@7#$%@",
    baseUrl: "https://soldait-frontend-2023.pages.dev/",
    adminpanel: "https://soldait-admin-panel-frontend-2023.pages.dev/",
    frontUrl: "",
    emailGateway: {
      SENDGRID_API_KEY: 'G2_6DHfmSaWcrRQ1RxTHrQ',
      fromMail: "techupdate@dev.wealwin.com",
      nodemailer: {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'techupdate@dev.wealwin.com', // generated ethereal user   | WeAlwin___MA1L___niwlAeW
          pass: 'WeAlwin___MA1L___niwlAeW', // generated ethereal password
        },
      }
    },
  };
}

let key = { ...keyEnvBased };

export default key;
