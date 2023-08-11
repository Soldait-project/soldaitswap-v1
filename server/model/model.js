const mongoose = require('mongoose');

const swapusers = require("../schema/user-model");
const tokens = require("../schema/tokens-model");
const forms = require("../schema/forms-model");
const liqutity = require("../schema/liqutity-model");
const swapping = require("../schema/swapping-model");
const settings = require("../schema/settings-model");
const admin = require("../schema/admin-model");
const siteurl = require("../schema/site-setting");
const subscribe = require("../schema/subscribe-model");
const template = require("../schema/template");
const faq = require("../schema/faq-schema");
const pairs = require("../schema/pairs-model");

module.exports = {
  swapusers: swapusers,
  tokens: tokens,
  forms: forms,
  liqutity: liqutity,
  swapping: swapping,
  settings: settings,
  admin: admin,
  siteurl: siteurl,
  subscribe: subscribe,
  template: template,
  faq: faq,
  pairs: pairs

};
