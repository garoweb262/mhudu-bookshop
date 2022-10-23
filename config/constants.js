const { constants } = require("buffer");
const { path } = require("express/lib/application");
require("dotenv").config();

module.exports = constant = {
  endPoint: "/api/v1",
  appName: "Pos-service",
  appCode: "DSC",
  companyName: "Dannene Global services",
  appMail: "dannenegaro@gmail.com",
  appUrl: "http://localhost:3000",
  appHost: "localhost:7000", //node mailer uses this backend host
  paginate: (totalCount, limit, page) => {
    let pages = totalCount / limit;
    let paginate = { pages: pages };
    if (page > 1) {
      paginate["prev"] = parseInt(page) - 1;
    }
    if (page < pages) {
      paginate["next"] = parseInt(page) + 1;
    }
    return paginate;
  },
  randomPin: (length = 15) => {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
  },
  randomCode(len = 6, bits = 16) {
    bits = bits || 32;
    var outStr = "",
      newStr;
    while (outStr.length < len) {
      newStr = Math.random().toString(bits).slice(2);
      outStr += newStr.slice(0, Math.min(newStr.length, len - outStr.length));
    }
    return outStr.toUpperCase();
  },
  currentDate: () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    return dateTime;
  },
  currentYear: () => {
    var today = new Date();
    var year = today.getFullYear();
    var dateTime = year;
    return dateTime;
  },
  currentTime: () => {
    var today = new Date();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time;
    return dateTime;
  },
  currentDay: () => {
    var today = new Date();
    var day = today.getDate();
    var dateTime = day;
    return dateTime;
  },
  currentMonth: () => {
    var today = new Date();
    var month = today.getMonth() + 1;

    var dateTime = month;
    return dateTime;
  },
};
