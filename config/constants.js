const axios = require("axios");
const { path } = require("express/lib/application");
var fs = require("fs");
var nodemailer = require("nodemailer");
module.exports = constant = {
  appName: "NoorwaBookshop",
  appMail: "muhdgazzali01@gmail.com",
  appUrl: "http://localhost:3000",
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
  generatePayment: async (email = "no-reply@mail.com", amount) => {
    let result = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: `${email}`,
        amount: `${amount}00`,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      }
    );
    console.log(result.data);
    return result.data;
  },

  verifyPayment: async (ref) => {
    let result = {};
    await axios
      .get("https://api.paystack.co/transaction/verify/" + ref, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        result = response.data;
      })
      .catch((error) => {
        console.log(error);
        // return "Error ";
        result = error;
      });
    // console.log(result);
    return result;
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
      from: "jabbama@gmail.com",
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

  uploadImage: ({
    data,
    filename = "no_name.jpg",
    path = "uploads/pictures/",
  }) => {
    fs.writeFile(
      path + filename,
      data
        .replace("data:image/png;base64,", "")
        .replace("data:image/jpeg;base64,", ""),
      { encoding: "base64" },
      function (err) {
        console.log("File created");
      }
    );
  },
  getBase64: (src) => {
    let bitm = fs.readFileSync(src);
    let base64Image = Buffer.from(bitm).toString("base64");
    return base64Image;
  },
};
