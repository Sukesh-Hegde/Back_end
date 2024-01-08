import http from "http";
import fs from "fs";
import EventEmitter from "events";
import nodemailer from "nodemailer";

class CustomEvent extends EventEmitter {
  mailSent(email) {
    this.emit("mailSent", email);
  }
}

const customEvent = new CustomEvent();

const server = http.createServer((req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codingninjas2k16@gmail.com",
      pass: "slwvvlczduktvhdj",
    },
  });

  if (req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const { name, email, message } = JSON.parse(data);

      // Write user query to "query.txt"
      const queryString = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

      // Append user query in "queries.txt"
      fs.appendFile("queries.txt", queryString, (err) => {
        if (err) throw err;
        console.log(
          `\nQuery saved!\n\nUser name: ${name}\nQuery: ${message}\n`
        );
      });

      //  Using Nodemailer to send confirmation email
      const mailOptions = {
        from: "codingninjas2k16@gmail.com",
        to: email,
        subject: "Query received",
        text: "We have received your query and will get back to you soon.",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          // Emit "mailSent" event
          customEvent.mailSent(email);
        }
      });

      res.end("Query received");
    });
  } else {
    res.end("Welcome to Coding Ninjas!");
  }
});

const Solution = () => {
  customEvent.addListener("mailSent", (email) => {
    console.log("custom event 'mailSent' emitted");
    console.log(
      `confirming that the email has been sent successfully to ${email}`
    );
  });
};

export default server;
export { server, CustomEvent, Solution };