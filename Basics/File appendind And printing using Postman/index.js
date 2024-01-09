// Please do not change the prewritten code

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  //  Write your code here
  if (req.method == 'POST') {
    // console.log(req.body)
    // expecting data from client
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString()
    })
    req.on('end', () => {
      // console.log(body)
      res.end('Data is received')

      //append data from the postman to data.txt
      fs.appendFileSync('data.txt',body);
      //read data and print in console
      const buffer = fs.readFileSync('data.txt',{encoding:'utf8'});
      console.log(buffer);

    })
  }else{
    res.end("data received");
  }  
});

server.listen(3000)
console.log('server is listening at 3000');

export default server;
