const axios = require("axios");
const { path } = require("express/lib/application");
var fs = require("fs");
require("dotenv").config();
var nodemailer = require("nodemailer");
module.exports = constant = {
  appName: "NoorwaBookshop",
  appMail: "muhdgazzali01@gmail.com",
  appUrl: "http://localhost:8000",
  appHost: "localhost:8000", //node mailer uses this backend host
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

  // Date in range
  dateInRange: (start, end, currentDate = new Date()) => {
    // var currentDate = new Date();
    start = start.toString();
    end = end.toString();
    let start_date =
      start.split("-")[1] +
      "/" +
      start.split("-")[2] +
      "/" +
      start.split("-")[0];
    let end_date =
      end.split("-")[1] + "/" + end.split("-")[2] + "/" + end.split("-")[0];

    var minDate = new Date(start_date); //Date("05/12/2022"); //M/D/Y
    var maxDate = new Date(end_date); //Date("05/13/2022"); //M/D/Y

    if (currentDate >= minDate && currentDate <= maxDate) {
      console.log("Correct Date ");
      return true;
    } else {
      console.log("Out Side range !!");
      return false;
    }
  },
  // Sending mail
  sendEMail: (
    email = "Muhdgazzali01@gmail.com",
    subject = `${constants.appName} Mail Subject`,
    message = "Welcome '<h1>1233121</h1>"
  ) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
        // pass: 'tzevoiyckzujovwr'abdl
      },
    });

    // Defineing the mail
    var mailOptions = {
      from: "muhdhgazzali01@gmail.com",
      to: email,
      subject: subject,
      // text: 'That was easy!'
      html: message,
    };

    try {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (e) {
      console.log("FAILD TO SEND MAIL");
    }

    console.log(message);
    return true;
  },
  generatePayment: async (data) => {
    const resp = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: data.tx_ref,
        amount: data.amount,
        currency: "NGN",
        redirect_url: `${process.env.FLUTTERWAVE_REDIRECT}`, //"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
        // meta: {
        //   consumer_id: 23,
        //   consumer_mac: "92a3-912ba-1192a",
        // },
        customer: {
          email: data.email,
          phonenumber: data.phonenumber,
          name: data.name,
        },
        customizations: {
          title: constant.appName,
          // logo: Config.appLogo,
        },
      },
      {
        headers: {
          authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          //   "Content-Type": "application/json",
        },
      }
    );

    // console.log(resp);
    return resp;
  },
  verifyPayment: async (data) => {
    const resp = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${trxRef}/verify`,
      {
        headers: {
          authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(resp);
    return resp;
  },
};
